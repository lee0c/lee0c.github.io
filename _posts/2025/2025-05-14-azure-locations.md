---
layout: post
title: azure locations and file crawling
category: reference
image:
    name: 2025/azure-locations.jpg
    alt: "A Linux terminal. There is a fun rainbow flag in ascii art at the top, and then the user has called a command asking Azure for a list of resources applicable to a specific resource type"
tags:
    - software
    - highlight
---

## context

Azure is Microsoft's cloud offering. Each possible resource that can be deployed in Azure has a location it's deployed in, such as "East US" or "Italy." While some resources can be deployed in all locations, other resources have location constraints.

It's common, when deploying, to have a whole ecosystem of resources that will work together. However, this introduces a problem: which locations work for all resources in a deployment?

Let's dig in. (Want just the outcome? Check the [summary](#summary).)

### bicep

[Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview?tabs=bicep) is a language for describing Azure resources. A Bicep file sets out a series of resources with preset or parameterized properties in order to deploy said resources.

A minimal Bicep file that creates a resource group might look like this:

```bicep
param resourceGroupName string = 'myResourceGroup'
param location string = "westus2"

resource resourceGroup 'Microsoft.Resources/resourceGroups@2022-09-01' = {
  name: resourceGroupName
  location: location
}
```

This is easy to start parsing - I can use `grep` to find that `Microsoft.Resources/resourceGroups@2022-09-01` string and go from there.

#### nesting

However, minimal is uncommon. As stated above, deployments of multiple resources are much more common.

When working with large deployments, certain resources may be needed more than once. You can repeat your earlier storage account declaration, or, instead, you can template out how to deploy a storage account with given parameters, then reuse that template. This is called a `module`, and it's fundamental to organizing Bicep files.

Let's say this is our file structure. Ignore the lack of parameter files or READMEs, this is just an example.

```txt
.
|--infra
   |--env
   |  |--dev
   |  |  |--main.bicep
   |  |--prod
   |     |--main.bicep
   |--modules
      |--rg
      |  |--main.bicep
      |--vm
      |  |--modules
      |  |  |--network.bicep
      |  |  |--virtual-machine.bicep
      |  |--main.bicep
      |--kv
         |--modules
         |  |--role-assignment.bicep
         |  |--key-vault.bicep
         |--main.bicep
```

Bicep files use relative references for local modules, so `infra/env/dev/main.bicep` references `../../modules/vm/main.bicep`, which references `./modules/network.bicep`. While the directory structure in this example *could* be flattened, my point is: modules can nest, and each module refers relatively to the module(s) it relies on.

## finding all resources

Okay, let's backtrack. From a given Bicep file, we want:

1. All referenced resource types
1. All referenced modules

### grep

Resources and modules both have patterns in how they are declared. Thankfully, they're pretty simple regexes. `grep` will spit out lines in a file that match a given regex.

```sh
# this gets us strings like 
# resource resourceGroup 'Microsoft.Resources/resourceGroups@2022-09-01' = {
grep -E "^resource " "$file"

# this gets us strings like
# module vm '../../modules/vm/main.bicep' = {
grep -E "^module " "$file"
```

### cut

From there, let's use `cut` to strip off the parts we don't want.

```sh
# this gets us strings like 
# Microsoft.Resources/resourceGroups
grep -E "^resource " "$file" \
   | cut -d "'" -f 2 - \
   | cut -d "@" -f 1 -

# this gets us strings like
# ../../modules/vm/main.bicep
grep -E "^module " "$file" \
   | cut -d "'" -f 2 -
```

These calls are a little opaque. `-d` sets a **delimiter** (what to split on). `-f` picks a **field** to return, numbered from 1.

### mapfile

We'll save these values to variables. `mapfile` reads a file, putting each line into a new array element. `-t` **trims** newline characters. The `<`s do some redirection, and yes, the space between them *matters*.

```sh
mapfile -t resources < <(grep -E "^resource " "$file" \
   | cut -d "'" -f 2 - \
   | cut -d "@" -f 1 -)
mapfile -t modules < <(grep -E "^module " "$file" \
   | cut -d "'" -f 2 -)
```

### dirname (& more)

We can't just stop there. We need to search each module in turn. Using `dirname`, we can get the directory of the file we're searching, then append the relative module path.

```sh
get_resources () {
  # ... grep, cut, etc ...
  
  directory=$(dirname "$file")

  for module in "${modules[@]}"
  do
    mapfile -t -O "${#resources[@]}" resources < <(get_resources "$directory/$module")
  done
}
```

A lot just happened there besides `dirname`. `{modules[@]}` is all the array elements (as opposed to just `$modules`, which evaluates to the first element). `${#modules[@]}`, on the other hand - note the pound sign - is the number of elements in the array.

Additionally, `mapfile` usually writes from index 0 onwards. But with the `-O` argument, we can specify an **origin**. By setting the starting point to the length of the array, we append to the array rather than writing over existing data.

Finally, we got some recursion going! `get_resources` calls `get_resources` for every module found.

### the get_resources function

So far, our code looks like this:

```sh
get_resources () {
  mapfile -t resources < <(grep -E "^resource " "$file" \
    | cut -d "'" -f 2 - \
    | cut -d "@" -f 1 -)
  mapfile -t modules < <(grep -E "^module " "$file" \
    | cut -d "'" -f 2 -)

  directory=$(dirname "$file")

  for module in "${modules[@]}"
  do
    mapfile -t -O "${#resources[@]}" resources < <(get_resources "$directory/$module")
  done
  
  for resource in "${resources[@]}"; do; echo "$resource"; done 
}
```

That last one-liner just returns our results. Note that we don't just `echo "${resources[@]}"` - this results in a space-delimited string and it'll be helpful later to have a newline-delimited string.

## finding locations

Now we need to use these resource types to get available locations. First, actually call our function from above. We'll assume we're in a directory with a top-level `main.bicep` file.

```sh
mapfile -t resources < <(get_resources "main.bicep")
```

### sort

Does sorting matter? Not really, but `sort` has a useful feature, `-u`, which returns **u**nique items (aka, it deduplicates). Looking up the same resource type twice slows us down.

```sh
mapfile -t resources < <(get_resources "main.bicep" | sort -u)
```

`sort` is one reason it helps to have newlines as delimiters - it expects that.

### az

We'll use `az` to list *all* the locations - just to give ourselves a starting point. You could also use the locations for the first resource type.

```sh
mapfile -t locations < <(az account list-locations --query "[].displayName" \
  --out tsv)
```

We can then use an `az` command to find available locations for a given resource type:

```sh
mapfile -t newLocations < <(az provider show --namespace "$namespace" \
  --query "resourceTypes[?resourceType=='$resourceType'].locations | [0]" \
  --out tsv)
```

`--out tsv` means we will get a list with no decoration whatsoever - it's vital for programmatic handling of `az` command output.

### cut (again)

We'll need to get those `$namespace` and `$resourceType` variables. `cut` comes back in handy:

```sh
# remember, $resource is something like Microsoft.Resources/resourceGroups

# this gets us strings like
# Microsoft.Resources
namespace=$(echo "$resource" | cut -d "/" -f 1 -)

# this gets us strings like
# resourceGroups
resourceType=$(echo "$resource" | cut -d "/" -f 2 -)
```

### comm

Okay, we can get locations. How do we handle finding their intersection?

`comm` to the rescue. It finds **common** lines between two *sorted* files. Its default output is three columns - lines only in file 1, lines only in file 2, and lines common to both. We can suppress the first two columns with `-12`.

`comm` expects files, so we'll reuse our redirection `<(someCommand)` from earlier.

```sh
mapfile -t locations < <(comm -12 \
  <(for location in "${locations[@]}"; do echo "$location"; done) \
  <(for location in "${newLocations[@]}"; do echo "$location"; done) ) 
```

`comm` also likes newline-delimited input, so we're again looping through the array rather than echoing all values at once.

### catching errors

With functionality as it is, many deployments will come back with 0 locations available. Turns out some basic resource types, like role assignments, don't have locations. So let's filter those.

```sh
if [[ ${#newLocations[@]} -eq 0 ]]
then
   # handle
fi
```

### tee

We'll print the locations to the shell. We can even use `tee` to print them to a file for good measure:

```sh
for location in "${locations[@]}"; do echo "$location"; done | tee locations.txt
```

### the location code

Here's our code for this section:

```sh
mapfile -t resources < <(get_resources "main.bicep" | sort -u)

mapfile -t locations < <(az account list-locations --query "[].displayName" \
  --out tsv)

for resource in "${resources[@]}" 
do
  namespace=$(echo "$resource" | cut -d "/" -f 1 -)
  resourceType=$(echo "$resource" | cut -d "/" -f 2 -)

  mapfile -t newLocations < <(az provider show --namespace "$namespace" \
    --query "resourceTypes[?resourceType=='$resourceType'].locations | [0]" \
    --out tsv)

  if [[ ${#newLocations[@]} -eq 0 ]]
  then
    continue
  fi
  
  mapfile -t locations < <(comm -12 \
    <(for location in "${locations[@]}"; do echo "$location"; done) \
    <(for location in "${newLocations[@]}"; do echo "$location"; done) )
done

for location in "${locations[@]}"; do echo "$location"; done | tee locations.txt
```

---

## summary

Here's our final script:

```sh
# Recursively crawls bicep files to find all referenced resources
get_resources () {
  mapfile -t resources < <(grep -E "^resource " "$file" \
    | cut -d "'" -f 2 - \
    | cut -d "@" -f 1 -)
  mapfile -t modules < <(grep -E "^module " "$file" \
    | cut -d "'" -f 2 -)

  directory=$(dirname "$file")

  for module in "${modules[@]}"
  do
    mapfile -t -O "${#resources[@]}" resources < <(get_resources "$directory/module")
  done
  
  for resource in "${resources[@]}"; do echo "$resource"; done 
}

# Execution starts here
mapfile -t resources < <(get_resources "main.bicep" | sort -u)

mapfile -t locations < <(az account list-locations --query "[].displayName" \
  --out tsv)

for resource in "${resources[@]}" 
do
  namespace=$(echo "$resource" | cut -d "/" -f 1 -)
  resourceType=$(echo "$resource" | cut -d "/" -f 2 -)

  mapfile -t newLocations < <(az provider show --namespace "$namespace" \
    --query "resourceTypes[?resourceType=='$resourceType'].locations | [0]" \
    --out tsv)

  if [[ ${#newLocations[@]} -eq 0 ]]
  then
    continue
  fi
  
  mapfile -t locations < <(comm -12 \
    <(for location in "${locations[@]}"; do echo "$location"; done) \
    <(for location in "${newLocations[@]}"; do echo "$location"; done) )
done

for location in "${locations[@]}"; do echo "$location"; done | tee locations.txt
```
