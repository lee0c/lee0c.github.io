---
layout: page
title: style
permalink: /style
---

Adaped from an introduction to Markdown in order to test and display styling of basic components of the site.

## Heading level 2

Since your title (defined in the front matter) is your heading level 1, you should never use another heading level 1 in your body.

### Heading level 3

The number of pound signs determines the heading level.

#### Heading level 4

It's also important not to skip heading levels. Don't jump from a 2 to a 4 or similar.

## Paragraphs

You'll notice that I am putting blank lines between headings and plain text. This is necessary, or they won't render correctly.

It's also important to put a blank line in between each paragraph. See what happens without it:
This is supposed to be a new paragraph, but it isn't.

### Inline styles

We can, of course, create **bold** and *italicized* text, or `inline monospace text`.

We can also create links, like this [link to the home page](/).

## Horizontal lines

Sometimes you want to insert a visual break in your text that isn't just a new paragraph. You can use three dashes to create a horizontal line:

---

This text will be below the line.

## Lists

### Unordered lists

Unordered lists can be created with dashes or asterisks. With dashes:

- this is an item
- this is another item

With asterisks:

* this is an item
* this is another item

### Ordered lists

Ordered (numbered) lists can be created with (surprise!) numbers. You can write numbers as you would normally, *or* you can just write the number 1 over and over, like so:

1. this is item 1
1. despite being written with a 1, this is item 2

This allows you to insert more information into lists in the future without having to renumber every following item.

### Nested lists

Both unordered and ordered lists can be nested. Just tab the nested section inwards:

- this is an item
  - this is nested below it
  - this is also nested
- this is another item

You can mix unordered and ordered lists when you nest.

## Quotes

You can always just use quotation marks, of course, but if you are quoting a larger chunk of text it can be nice to use a blockquote.

You format a blockquote by starting the line with a caret:

> This is a quote, and it will render differently than a paragraph.

If you want a quote to have multiple separate paragraphs, and still contiguously display as one quote, make sure to put a caret on the empty line between the paragraphs.

> This is a multi-paragraph quote.
>
> Here's the second paragraph.

## Tables

Tables in Markdown are kind of annoying to format. You use the pipe (`|`) character as well as dashes.

```
| Header 1 | Header 2 |
|---|---|
| data 1a | data 1b |
| data 2a | data 2b |
| data 3a | data 3b |
```

When I remove the monospace block, you can see how this formats:

| Header 1 | Header 2 |
|---|---|
| data 1a | data 1b |
| data 2a | data 2b |
| data 3a | data 3b |
