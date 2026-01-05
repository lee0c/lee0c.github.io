---
layout: post
title: moving images
category: reference
image:
    name: 2026/cormorant.jpg
    alt: "Image unrelated to post. A cormorant, a type of black waterfowl, poses with wings spread on a buoy in Puget Sound. Off to the left, another bird floats."
tags:
    - software
---

## problem statement

today I decided to finally clean up the `assets/img` directory for this site. Since 2022, when I started this project, I've just been adding images directly to that directory with no further segmentation - messy of me, I know! It's gotten unwieldy and I'm starting to get worried about generic names leading to duplicates at some point, particularly for the non-gallery images where I have a tendency to [use](/stationery-exchange) [lots](/favorite-git-flag) [of](/trans-networks) [mushroom](/no-politics) [images](/domain-and-site-setup).

so it's time to move them into year-based folders. Let's talk about how I did that. `bash` away!

(want to [skip right to the completed script?](#result))

## find

let's start with the basics: a list of posts. `find` gets us everything under a specific directory - in this case, the `_posts` directory. We can filter out the directories a few different ways, but I piped the `find` output through a basic `grep` looking for `.md` in the filename.

```sh
for FILE in $(find _posts | grep .md)
do
    # TBD
done
```

## grep

`grep` can also help us get image names with the regex `"name:.+jpg|png"`. I add `name:` to the regex because there are *very occasionally* images that aren't the featured image for the post, and those don't fit the pattern of `name: <img>`. Since there's so few of those, I ended up handling them manually.

to make `grep` work with regex, it needs the `-E` flag.

```sh
# gives us
#     name: <img>
# note the 4 spaces at the beginning of the line
IMAGE_LINE=$(cat $FILE | grep -E "name:.+jpg|png$")
```

## cut

that output gets us the full line of text that includes the image filename. Let's trim out what we actually want.

below, `-d` sets a delimiter, and `-f` chooses what field we want to return. Because there's 4 spaces before `name` (my next task: converting spaces to tabs in all my files), our field index is actually pretty high - `cut` is creating 4 empty strings.

```sh
IMAGE=$(echo $IMAGE_LINE | cut -d ' ' -f 6 -)
```

or, for brevity:

```sh
IMAGE=$(cat $FILE | grep -E "name:.+jpg|png$" | cut -d ' ' -f 6 -)
```

with `cut`, we can also get the year of the post:

```sh
YEAR=$(echo $FILE | cut -d '/' -f 2 -)
```

## sed

there's two major things we need to do with the information we've gathered:

1. replace the image filename in-place in the post's markdown file
1. move the image file from its original location into a new directory

we can do replacement with `sed`, where our pattern should be something like this: `s/$IMAGE/$YEAR\/&\` (the `&` subs in the found string - in this case `$IMAGE`). We could also use comma separators if we don't want to escape the slash, like `s,$IMAGE,$YEAR/&,` - I did this for ease of reading.

by default, `sed` prints to standard output, so we'll tell it to edit in-place instead with `-i`. Here's our full `sed` command:

```sh
sed "s,$IMAGE,$YEAR/&," -i $FILE
```

## mving and shaking

(my mom thinks I'm funny.)

now we'll handle moving the image file from its original location into a new directory. let's create our image paths, source and destination:

```sh
IMG_DIR=assets/img
NEW_IMAGE=$IMG_DIR/$YEAR/$IMAGE
IMAGE=$IMG_DIR/$IMAGE
```

trying to `mv` the images will immediately cause problems, because the year directories don't exist yet. A simple check gets us past that:

```sh
if [ ! -d $IMG_DIR/$YEAR ]
then
    mkdir $IMG_DIR/$YEAR
fi
```

finally, we can `mv` the image:

```sh
mv $IMAGE $NEW_IMAGE
```

## result

here's our final script:

```sh
for FILE in $(find _posts | grep .md)
do
    # parse image and year info
    IMAGE=$(cat $FILE | grep -E "name:.+jpg|png$" | cut -d ' ' -f 6 -)
    YEAR=$(echo $FILE | cut -d '/' -f 2 -)

    # replace in-place in file
    sed "s,$IMAGE,$YEAR/&," -i $FILE

    # path creation
    IMG_DIR=assets/img
    NEW_IMAGE=$IMG_DIR/$YEAR/$IMAGE
    IMAGE=$IMG_DIR/$IMAGE

    # create dir for year if it doesn't exist
    if [ ! -d $IMG_DIR/$YEAR ]
    then
        mkdir $IMG_DIR/$YEAR
    fi

    # move image
    mv $IMAGE $NEW_IMAGE
done
```

questions? errors? [ping me!](/contact)
