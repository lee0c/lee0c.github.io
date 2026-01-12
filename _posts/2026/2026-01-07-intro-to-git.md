---
layout: post
title: an intro to git
category: reference
image:
    name: 2026/goldeneye-tail.jpg
    alt: "Image unrelated to post. The tail of a diving duck pokes out from the water with a small splash."
tag: draft
---

> this post is a **draft**. if you're reading it, you're probably subscribed to my Atom/RSS feed. congrats u get a secret post!

alrighty, this one's a real doozy. Strap in.

---

<!-- TOC -->

- [versioning](#versioning)
- [problem statement](#problem-statement)
- [what is git?](#what-is-git)
	- [where can I use git?](#where-can-i-use-git)
        - [what is a CLI?](#what-is-a-cli)
	- [where can I use the git CLI?](#where-can-i-use-the-git-cli)
        - [git for Windows](#git-for-windows)
        - [WSL](#wsl)
		- [a few terminal operations](#a-few-terminal-operations)
        - [edit files](#edit-files)
- [git version](#git-version)
	- [a few handy settings](#a-few-handy-settings)
- [git going](#git-going)
	- [git init](#git-init)
	- [git clone](#git-clone)
- [git status](#git-status)
	- [branch main](#branch-main)
	- [no commits / nothing to commit](#no-commits--nothing-to-commit)
- [commits and history](#commits-and-history)
	- [git log](#git-log)
	- [creating a commit](#creating-a-commit)
- [the staging area](#the-staging-area)
	- [git add](#git-add)
- [git commit](#git-commit)
	- [checking our work](#checking-our-work)
- [changes to existing files](#changes-to-existing-files)
	- [git restore](#git-restore)
- [git revert](#git-revert)
- [git remote](#git-remote)
	- [git fetch and git pull](#git-fetch-and-git-pull)
	- [git push, take one](#git-push-take-one)
	- [authentication](#authentication)
	- [SSH keys](#ssh-keys)
		- [creation](#creation)
		- [an alias...](#an-alias)
		- [and a function](#and-a-function)
		- [SSH keys and the remote](#ssh-keys-and-the-remote)
	- [git push, take two](#git-push-take-two)
- [summary](#summary)

<!-- /TOC -->

---

## versioning

have you ever tried to revert to a previous version of a document in MS Office or Google Docs and found that your revision history is cluttered with small changes that by all rights should be grouped into one set of edits, but they aren't, and it's tedious to pick through all the versions?

or, more uniquely and/or uncommonly:

- you've been using Google's named versions, but you're [out of named versions (you can have 40 per doc, or 15 per spreadsheet)](https://support.google.com/docs/answer/190843#zippy=%2Ccreate-a-named-version){:target="_blank"}, so you'll have to start going back and deleting named versions, and isn't that just a pain?
- you're using MS Office, but [your file isn't in OneDrive, so there's no version history at all](https://support.microsoft.com/en-us/office/view-previous-versions-of-office-files-5c1e076f-a9c9-41b8-8ace-f77b9642e2c2){:target="_blank"}? Or maybe it *is* in OneDrive, but you were offline, so too many changes got jumbled into one big edit when you next went online?

or, websites. Maybe you're building something in Squarespace and find out that [in current versions of Squarespace, it doesn't support version history.](https://forum.squarespace.com/topic/239030-roll-site-back-to-previous-version-changes/){:target="_blank"}.

## problem statement

I started writing this to help a friend. She's getting started with a website, and we're using the static site generator [11ty](https://www.11ty.dev/){:target="_blank"} as she wants to have a lot of easy-to-write posts. She needs a single-user workflow that allows her to publish her website without hosting it herself, and that's the use case where this was born.

this walkthrough is best suited for people who want to use `git` in single-person projects, or perhaps with one or two other close collaborators. There's quite a few topics it doesn't cover that are vitally important in large collaborative projects, such as **branching** and **merging**.

this walkthrough also focuses on the "happy path," without much discussion of troubleshooting. I may write more on the topic in the future, but we're already over *4,500 words*, so we're calling it a day.

finally, I wrote this walkthrough primarily with knowledge from using **WSL** [more on this later] on **Windows** and with **Zed** as my text editor. While I've tried to cover my bases with other OSes and options, there's a solid chance I'm missing things!

that all said, let's get (git?) into it!

## what is git?

`git` is a *version control system*. We can use it to track changes we make to a set of files.

> tip: it's important to understand that despite the examples of MS Office and Google Docs above, `git` *isn't useful* with word documents. `git` shines with plain text files - .txt, .md, or basically any type of code.

### where can I use git?

many, many tools interact with `git`:

- a lot of modern text editors have graphical user interfaces (GUIs) that let you perform `git` operations, like [VSCode](https://code.visualstudio.com/docs/sourcecontrol/overview){:target="_blank"}, [Zed](https://zed.dev/docs/git){:target="_blank"}, or [Sublime Text](https://www.sublimetext.com/docs/git_integration.html){:target="_blank"}
- there are [standalone `git` GUIs](https://git-scm.com/tools/guis){:target="_blank"}
- and many `git` users use the `git` command line interface (CLI), which is fully text-based

today we're going to talk about the `git` CLI... technically. But **don't let that scare you** - we'll talk about *concepts* and *actions* that can be applied to other `git` interfaces as well.

#### what is a CLI?

a CLI a way to interact with your computer and with software in text-only form. Rather than using the mouse and clicking on things, you type in commands and see output.

### where can I use the git CLI?

if you want to use the `git` CLI, you'll need a terminal. You've got a couple options here:

- on Linux or Mac, you should have one built in! This is the easy path, congrats :) Even better, `git` generally ships with these systems, so there's no installation required. Search for an application called 'Terminal' or similar
    - note that I don't have a Mac and have never used one. I can't guarantee that everything operates the same over there - there may be discrepancies I don't know about
- on Windows, there's two options
	- [`git` for Windows](https://gitforwindows.org/){:target="_blank"} packages a Linux-like terminal with a `git` GUI. This may be slightly friendlier for people who aren't at all familiar with Linux. If choosing `git` for Windows, [see my installation instructions below](#git-for-windows)
	- I use [Windows Subsystem for Linux, or WSL](https://learn.microsoft.com/en-us/windows/wsl/install){:target="_blank"}, which gives you a Linux distribution within Windows. It's pretty smooth sailing at this point, but there's some idiosyncracies to conquer - like the fact that your *Windows* files and your *Linux* files are stored in different places. If choosing WSL, [see my usage notes below](#wsl)
- both of the Windows options listed work with [Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701){:target="_blank"} which offers a nicer-looking terminal experience than the basic command prompt. If you're going to keep working with what you set up today, I recommend it!

#### git for Windows

on the "Releases" page, scroll down to "Assets" and pick the `.exe` file.

during installation, you'll be asked to choose some things by the installer. Here's my recommendations:

1. if choosing to install Windows Terminal, check 'Add a Git Bash Profile to Windows Terminal' on the first options page
1. **default editor:** *don't use vim.* Pick something you have installed - it can just be Notepad - or you can use `nano,` an in-terminal editor
1. **initial branch name:** choose the "Override" option and leave it set to "main"
1. **everything else:** keep the recommended choices

you can open `git` for Windows via the start menu by searching for 'git bash.' If you chose to install Windows Terminal, one of the dropdown options will be for a new tab will be 'Git Bash.'

#### WSL

while *installing* WSL is a single command, here's a couple notes about getting started once *inside* WSL:

- don't be concerned that you can't see anything when you type or paste your password! Since it's sensitive information, this is intentional. You'll notice this pattern a couple of times while following this walkthrough
- `Ctrl+C` and `Ctrl+V` won't work like they do on Windows. If you want to copy/paste, right-click (there won't be a context menu, it'll just happen)
- if you're downloading a text editor like the ones mentioned above, you'll still follow the *Windows* instructions

you'll also need to be careful of a few things regarding text editors to make them work with WSL:

1. if you install VSCode, you'll need to add the [remote development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack){:target="_blank"}
1. if you install Zed, you'll need to check "Add to PATH (requires shell restart)" in the installer, then restart your terminal as noted
    - there's a single setting in Zed to disable all AI settings: **Settings > AI > General > Disable AI**
1. I don't recommend installing Sublime Text if using WSL, because summoning it from within WSL is a little more complicated than either of the two above, and I found when I [reviewed editors](/comparing-text-editors) that it struggled with some file operations in WSL

you *must* start your editor of choice *within WSL*. Don't use the Windows start menu! Instead, you'll type `code .` or `zed .` (note the `.`) while in WSL.

you can open WSL via the start menu by searching for 'WSL.' If you chose to install Windows Terminal, one of the dropdown options for a new tab will be your WSL distribution, usually 'Ubuntu.'

#### a few terminal operations

here's three vital terminal commands:

- `pwd` **prints the working (current) directory**. A lot of terminals will just *show* you what your current directory on every line, but if they don't, try `pwd`.

> tip: directory is just another word for folder

- `cd` lets us **change directories**. If we type *only* `cd`, we'll be brought back to the home directory; if we provide a directory path, we'll be taken to the provided directory
- `ls` **lists** files in the current directory (including other directories)

#### edit files

we'll want to edit files, right? How do we open our editor from the terminal?

there's usually a terminal command for the editor. For VSCode, it's `code`; for Zed, it's `zed`. If we want to open the *current directory* in our editor of choice (and we do!), we'll write `<editor command> .` (note the `.`), where `.` means "the current directory."

## git version

let's check that you have git installed with `git version`. You might see something like `git version 2.34.1` printed out in response. If you don't get a version number, but instead get an error saying you don't have `git`, [install `git`](https://git-scm.com/install){:target="_blank"}.

### a few handy settings

before we really start, we're going to set a few basics to make it easier for ourselves.

```sh
# skip this one if you installed git for windows
# this means that if git wants us to edit something,
# it'll open in the built-in terminal editor 'nano'
# the default is vim, which can be pretty unfriendly to newcomers
# nano, on the other hand, will tell you how to do basic
# operations at the bottom of the editor
git config --global core.editor nano

# this uses the autocorrect
# the value specifies how many *tenths* of a second
# so 10 => 1 second
git config --global help.autocorrect 10

# skip this one if you installed git for windows
# the default branch name is "master" due to older computer terminology
# older language used to explain some computing relationships as master/slave
# some people consider this outdated and harmful, so "main" is a more common these days
# also, I'll be using main, so this will help make your output look like mine
git config --global init.defaultbranch main

# this sets our information
# if we don't set this, git will prompt us to set it later
git config --global user.name <your-name>
git config --global user.email <your-email>
```

## git going

(no, that's not a real `git` command)

there's two main ways to start:

1. create a new project on our local machine, or
1. work with an existing project

> tip: `git` and associated tooling refer to projects as **repositories**. I'll be sticking with the word project here as I find it a bit friendlier, but you'll probably run across the word repository in the wider world of `git`

### git init

`git init <project>` will create a new directory named `project` ready to be used with git. We can then use `cd <project>` to enter the directory.

> tip: don't use spaces in your project name!

### git clone

`git clone <project URL>` will pull in an existing project. We're not going to talk about this right now; instead, we're going forward assuming with `git init`.

## git status

before we do anything, let's see what `git` will tell us about our project. Type `git status` and we might see the following:

```txt
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

let's dissect this.

### branch main

`git` has a concept of **branches**, which are different paths our file history has taken. While branches are *incredibly* powerful, we're going to stay away from branches during this walkthrough and focus on working on a single branch - in this case, `main`.

### no commits / nothing to commit

"no commits" means that the project has no history whatsoever. "Nothing to commit" means we've made no changes. But what is a commit?

## commits and history

a **commit** is one set of changes made to our work. We get to choose which changes are part of any given commit, and we write a message describing the commit so that future-us knows what we did if for some reason we need to undo something.

### git log

in an established project, we can use `git log` to look at our **commit history**. By default, one commit will output like this:

```txt
commit e2fd6c4772e61f9c074638a933eb92fc1ea885ef
Author: Lee Cattarin <lee.cattarin@gmail.com>
Date:   Sun Dec 28 18:47:00 2025 -0800

	fix syntax err in alt
```

In order there, we have:

1. a long string that identifies the commit
1. the author of the commit
1. the date it was created
1. the message written to describe the commit

### creating a commit

commits are made with the command `git commit`, but if we try to create a commit right now we'll be told "nothing to commit."

okay, what if we edit a file?

> tip: if you don't want to actually open your editor, just use `touch file.txt` to create a new empty file named `file.txt`

hmmm, there's still nothing to commit! What happens if we check `git status`? There's some new output!

```txt
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        file.txt
```

`git` tells us that we have "untracked" files - a.k.a. files that git hasn't got in its history yet. It also tells us to use `git add` if we want to be able to commit that file.

## the staging area

`git` has a concept called the **staging environment** or **staging area**. This captures the set of changes we're adding to a single commit. When we add something to the staging area, we say we are **staging** it or that it is **staged**. In order to stage changes, we'll use `git add`.

why a staging area? Why not just commit our changes?

well, imagine we're writing a blog post (easy for me to imagine right now). We start reviewing it, and notice that there's a bit of page styling we don't like - not something tied to the content of the post, but the styling of the overall site. We fix it, and want to save *that* change while continuing to work on our post draft. `git add` and the staging area allow that kind of choice.

### git add

`git add <filename>` lets us add *all* changes in the given file to the staging area. Sometimes this is really useful - if we just created a new file (by, say, using `touch file.txt`), we probably want to add the whole thing.

personally, I really like using `git add -p`, so much so that I [wrote an entire blog post about it](/favorite-git-flag). It lets us review changes piece-by-piece and pick only the pieces we want.

for now, we'll try `git add file.txt`. We'll notice there's no output by default, but we can run `git status` to see where things are at. `git` will now tell us:

```txt
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   file.txt
```

*now* we're ready to create a commit!

## git commit

if we just write `git commit`, it'll open an editor for us to edit the **commit message** - our description of the changes. This can be handy if we want to write a lengthy description, but if we want to just write a one-liner, we can use `git commit -m "<message>"`. It's quicker and doesn't involve opening an editor.

let's create a super basic commit:

```sh
git commit -m "baby's first commit"
```

> tip: as excited as you may be, don't use '!' in your commit messages

we'll see output like this:

```txt
[main (root-commit) 3dcf1ca] baby's first commit
 1 file changed, 1 insertion(+)
```

### checking our work

trying `git log` now will show us our single commit!

> tip: type `q` to exit the `git log` output

trying `git status` will tell us:

```txt
On branch main
nothing to commit, working tree clean
```

## changes to existing files

so, we've added a new file - that wasn't bad. Things get a little more interesting when we edit files `git` already knows about. Let's use `<editor-command> .` to open the current directory and write a sentence or two in `file.txt`.

after saving `file.txt`, try `git status` again.

> tip: Ctrl+S (or Cmd+S on Mac) is the shortcut for saving *basically everywhere*

```txt
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   file.txt
```

### git restore

`git restore` is new! That lets us get rid of our changes and go back to the last version of the file committed. Be careful with this - we should only do it if we *really* want to get rid of those changes.

let's not restore, and instead stage and commit our new changes:

```sh
git add file.txt
git commit -m "added a new sentence"
```

again, we can use `git status` or `git log` as needed.

## git revert

ooooh... I don't actually like that change. What if I want to undo something?

run `git log` again, and copy the first 6-8 characters in the commit string (we can copy more, including the whole string if we want, but it's not necessary):

```
commit 8b5dd7838f8c8423cfa445b6cddbed88e9c32511 (HEAD -> main)
Author: Lee Cattarin <lee.cattarin@gmail.com>
Date:   Wed Jan 7 15:18:45 2026 -0800

    added a new sentence
```

in this case, `8b5dd7`.

now we can try `git revert <commit-string>`. It'll open our editor to write a message about the change. It's important to know that `git revert` *doesn't delete the old commit* - it creates a **new** commit that undoes the previous work.

```txt
[main 9268d5c] Revert "added a new sentence"
 1 file changed, 1 deletion(-)
```

I didn't edit the message - we can tell because it just says "Revert" and then the old commit message. But we can edit and add lots of detail about why we're doing it.

## git remote

let's try a new command: `git remote`. Hmm, nothing happened... what's a "remote"?

remember how I said we could use `git clone` to work on an existing project? If we did that, we'd be getting that project from a *remote* server - not our *local* machine.

the world of git servers is vast - hell, you can run your own! - but we're going to just mention a few major hosts: GitHub, GitLab, and Codeberg. For this walkthrough, we're going to work with Codeberg, but you'll find that the UI is pretty similar across all three, so if you've got a GitHub or GitLab account feel free to use that.

let's head on over to [Codeberg](https://codeberg.org/){:target="_blank"} First off, we'll make an account.

now we'll make a new project using the `+` in the upper right. Choose 'New repository,' then pick a repository name. You can leave the other settings be.

with the project created, Codeberg will tell us three things we can do: clone the repository, create a new repository, or push an existing repository. We'll push an existing one.

```sh
git remote add origin https://codeberg.org/inherentlee/testing.git
git push -u origin main
```

first, we'll add a remote. Across from the project title, we should see a button that says `Code` with a dropdown indicator. It'll offer a few choices, the first two being SSH and HTTPS. I'll talk about SSH in a bit, but let's try HTTPS first. Copy that URL; we're about to use it in a command.

> tip: the remote can be named whatever you want! Traditionally, it's called `origin`, but if it's easier for you to remember, you might call it `codeberg` or maybe `remote`

```sh
git remote add <remote-name> <url>
```
for this walkthrough, we'll call our remote `codeberg`.

there's no feedback, but that's ok. Re-running `git remote` shows that we have a remote now: `codeberg`. That really doesn't tell us much, does it! Let's try a more talkative command: `git remote --verbose` or, more simply, `git remote -v`. Now it tells us the following:

```txt
codeberg  https://codeberg.org/inherentlee/git-intro.git (fetch)
codeberg  https://codeberg.org/inherentlee/git-intro.git (push)
```

cool! we have a remote set up. What does "fetch" and "push" mean?

### git fetch (and git pull)

`git fetch` brings **remote** changes to our local machine. So does a command called `git pull`. Why are there two?

`fetch` brings the remote changes down, but *doesn't combine them yet with our local work*. This gives us a chance to explore what those changes are before we actually integrate them into our work!

this may seem unhelpful if we're thinking about this project as something only we work on, but imagine there's a team of people all contributing to the project. What if we *and* another person both work on the same file? Our changes might overlap!

if we're working alone and *from one machine*, we'll pretty much never have to use `git fetch` or `git pull`! If we happen to do our work on multiple machines - for example, I do some work on my PC and some on my fruitpad (using an app called [Working Copy](https://workingcopy.app/){:target="_blank"}) - we'll probably update the remote from one machine, then need to pull that work down onto the other machine.

for our use case, we can pretty safely stick to `git pull` (if we ever even need to use it!), but if you're working in a larger collaborative project, `git fetch` is your friend!

### git push, take one

`git push` is the opposite of `git pull` - it takes your local changes and adds them to the remote.

the first time we use it on any given branch, we'll want to set what's called the **upstream** - the remote branch that our local branch is connected to by default. We can do this with the following command:

```sh
git push --set-upstream codeberg main
# or, for brevity
git push -u codeberg main
```

### authentication

when we call `git push`, we're prompted for our Codeberg username and password.

personally, I find constantly authenticating tremendously annoying! There's a couple of ways to handle this.

1. in the command line, we can use a few different credential management settings:
	- `git config --global credential.helper cache` will store our username and password in memory. You'll be re-prompted every 15 minutes. I work in long enough sessions that this is still a pain for me, but it may work for you
	- `git config --global credential.helper store` will save our username and password in a file on our machine, and only re-prompt if we change either value. **Importantly,** this method does *not* encrypt our password in any way! While it's convenient, it's not very secure
	- on Mac, `git config --global credential.helper osxkeychain` is a secure method for saving credentials
1. if we installed `git` for Windows, we should have Git Credential Manager (GCM)
1. in *any* terminal environment, we can use an SSH key. This is my preferred method! I find it's a good balance between *never* logging in and *constantly* logging in - I do it once after opening the terminal, and them I'm good for that work session

### SSH keys

while I'm not going to go into a lot of the technical concepts behind SSH keys, I will talk a bit about how my setup works. If you're happy with one of the other credential management setups above, feel free to [skip past this section](#git-push-take-two) cause it's a bit chunky.

the SSH (secure shell) protocol allows for secure communication on an insecure network.

when we generate an SSH key, we get a **public** and a **private** key. These are mathematically related, and if we *encrypt* something with the private key, it can be *decrypted* with the public key, and vice versa.

the important thing to know is *you should never share your private key*. Also, while you aren't *forced* to set a password when creating these keys, I strongly recommend doing so.

#### creation

running `ssh-keygen` will take us through a series of prompts. Assuming we don't already have an SSH key, the default file location is fine.

when you choose a passphrase, *write it down*. If you lose it, there is no recourse. You will have to generate a new SSH key.

after generation, we will have two files at the location specified by the tool (or the custom location we chose). Generally, that's the folder `.ssh` in our home directory. If we navigate to that directory (`cd $HOME/.ssh`) and look at the files (`ls`), we'll see files named `id_rsa` and `id_rsa.pub`. The one that ends with `.pub` is the *public* key.

#### an alias...

time for a little more terminal knowledge!

I have two handy pieces of tooling in my terminal that I use for SSH operations.

the first one is an *alias* - basically a simple shortcut for a command. I've written an alias for outputting my public key so that when I need it, I can get it without having to write out the path to the key. Laziness is a virtue, okay?

there's a file in the home directory called `.bashrc`. It sets a lot of terminal-wide functionality. We're going to add an alias to it!

the command to output a file's contents is `cat <filename>`. My alias name of choice to `cat` my public SSH key is `sshcat` - but feel free to name yours something else.

navigate to the home directory (`cd`) and open your `.bashrc` file in your editor (`<editor-command> .bashrc`). Add the following to the bottom before saving and exiting.

```txt
alias sshcat="cat $HOME/.ssh/id_rsa.pub"
```

> tip: don't be alarmed if you can't use this right away! Your `.bashrc` file takes effect when the terminal starts up. If you want to test it, either restart your terminal, or type `source $HOME/.bashrc`

#### and a function

the other piece of shortcut SSH key tooling I use is a *function* that I call `ssa`, short for `ssh-agent`. `ssh-agent` manages SSH keys and keeps us logged in during a session.

```sh
# SSH agent
ssa() {
	ssa_pid=$(pgrep ssh-agent)
	if [[ $ssa_pid ]]; then kill $ssa_pid; fi

    echo -n "$fg[green]"
	eval $(ssh-agent -s)
	ssh-add ~/.ssh/id_rsa
}
```

look, I'll be honest... we're not going to explain this one in detail. In short, though, it removes any existing instance of `ssh-agent`, then prompts us to put in our SSH key password so it can authenticate us.

open the `.bashrc` file again for editing, and add the above function to the bottom before saving and exiting. Again, either quit the terminal or type `source $HOME/.bashrc` to reload and use this new function by typing in `ssa`.

#### SSH keys and the remote

when we [added a remote](#git-remote), we used the HTTPS URL. Let's update to using the SSH URL - you can find this on the main project page under the dropdown button that reads `Code`.

```sh
git remote set-url codeberg <new-url>
```

we'll notice that the SSH URL starts with `git@`, whereas the HTTPS URL started with `https://`.

in order for all this to be useful, we need to tell Codeberg about our SSH key. In Codeberg, navigate to [settings, then find the left-hand tab for SSH keys](https://codeberg.org/user/settings/keys){:target="_blank"}. Choose 'Add key' and paste in the **public** key (if you set up that `sshcat` alias, use it now to output your key for ease of copying). Save and we'll now be set up to authenticate with SSH!

### git push, take two

we can now call `git push` again and again now without having to repeat our credentials every time. We can also call `git pull` for our private repositories.

## summary

let's talk about what we've done.

1. set up a terminal and learned a couple indispensable commands
1. created a new project with `git init`
1. checked in *constantly* using `git status`
1. learned what a commit is, and how to use `git log` to view our commit history
1. used `git add` to add new files or file changes to a commit
1. created commits with `git commit`
1. undid a commit using `git revert`
1. talked about remotes, making a new Codeberg project, and using `git remote` to link that project to our local work
1. talked about `git fetch` and `git pull`
1. added our local work to the remote project using `git push`
1. and finally, set up some kind of credential management so we don't have to log in for *every* `git push`!

congratulations, and welcome to `git`!
