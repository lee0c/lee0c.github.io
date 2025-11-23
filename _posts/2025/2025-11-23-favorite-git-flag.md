---
layout: post
title: my favorite git flag
category: reference
image:
    name: shelf-mushrooms.jpg
    alt: "Picture unrelated to post. Creamy beige shelf mushrooms on a mossy tree trunk."
tags:
    - software
---

do you have a favorite git flag? I do. let's talk about `git add -p`.

## the p stands for partial

okay, it totally doesn't. it's short for `--patch`. but 'partial' is my mental trick because it makes a little more sense to me, and it might help you remember it too.

also, [TIL](https://xkcd.com/1053/){:target="_blank"}: this command is a shortcut to the `patch` subcommand of the `--interactive` flag - a flag I have never in my life used. wild the things you learn when you read the documentation.

## the primary purpose

a classic scenario: you've realized your uncommitted work doesn't just encapsulate one change, and it's not so easily split as to be separable per-file. `git add -p` instead lets you choose to stage changes chunk-by-chunk, or, as `git` terms it, hunk-by-hunk.

### hunks

...are not perfect. you can split hunks, but only so much, and there's going to be cases where your changes are *so* mixed in as to be inseparable.

## a secondary purpose

I use `-p` almost every time I use `git add`, not because I know I will need to split up my work, but to review what changes I made.

## a tertiary purpose

the output from `git add -p` highlights extraneous trailing spaces!

## how it works

every hunk `-p` shows you comes with the following single-character choices:

### y and n

**y**es and **n**o respectively. either add the hunk, or don't.

### q

**q**uit. exit the whole `-p` process.

### a and d

I rarely use these two. that said, I try to remember these two as **a**ll and **d**one. stage all of the hunks in the current file, or be done with the current file.

### s

only shows up sometimes, because it lets you **s**plit the current hunk. if unsplittable, you won't see this option.

### e

**e**dit. [read the documentation for manually editing](https://git-scm.com/docs/git-add#_editing_patches){:target="_blank"} if curious because I don't use this and can't advise on it.
