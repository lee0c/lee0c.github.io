---
layout: post
title: redirections
category: reference
image:
    name: angle-brackets-uwu.jpg
    alt: "Ascii art of an emoticon with pinched eyes and a small mouth made with two angle brackets."
tags:
    - software
---

## baseline

```sh
cat tempest.md
```

```txt
You do look, my son, in a moved sort,
As if you were dismay'd: be cheerful, sir.
Our revels now are ended. These our actors,
As I foretold you, were all spirits and
Are melted into air, into thin air:
And, like the baseless fabric of this vision,
The cloud-capp'd towers, the gorgeous palaces,
The solemn temples, the great globe itself,
Ye all which it inherit, shall dissolve
And, like this insubstantial pageant faded,
Leave not a rack behind. We are such stuff
As dreams are made on, and our little life
Is rounded with a sleep.
```

## direct

`grep` takes a file or files as an argument.

```sh
grep "'d" tempest.md
```

```txt
As if you were dismay'd: be cheerful, sir.
The cloud-capp'd towers, the gorgeous palaces,
```

## redirect

If there's no files, or if `-` is passed as an argument, `grep` reads from standard input. `<` reads a file into standard input (this is shorthand for `0<`, `0` being the file descriptor of `stdin`).

```sh
grep "'d" < tempest.md
# or
grep "'d" - < tempest.md
```

```txt
As if you were dismay'd: be cheerful, sir.
The cloud-capp'd towers, the gorgeous palaces,
```

## re-redirect

`<(command)` creates a file descriptor for the output of `command`.

```sh
grep "'d" - < <(cat tempest.md)
```

```txt
As if you were dismay'd: be cheerful, sir.
The cloud-capp'd towers, the gorgeous palaces,
```

(In this case, you could substitute `cat tempest.md | grep "'d" -` but `<(command)` is handy for cases where commands don't take `stdin`, or need to take in multiple files (such as [`comm`](/azure-locations#comm)).

## re-re-redirect

`cat` can also take `stdin` when given `-` or no arguments.

```sh
grep "'d" < <(cat < tempest.md)
# or
grep "'d" < <(cat - < tempest.md)
```

```txt
As if you were dismay'd: be cheerful, sir.
The cloud-capp'd towers, the gorgeous palaces,
```

## conclusion

it's `<`s all the way down.

---

## postscript: heredoc

```sh
grep "'d" << tempest.md
heredoc> oh are we interactive now
heredoc> what am i 'doing' anyway
heredoc> tempest.md
```

```txt
what am i 'doing' anyway
```

(`<<` starts an ephemeral document or `heredoc`. The first argument given is the delimiter, and is more commonly `EOF` (**e**nd **o**f **f**ile).)
