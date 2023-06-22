---
layout: post
title: backend accessibility
category: reference
image: 
    name: camelCase-print.jpg
    alt: "A carved stamp next to its print. The print reads '#camelCase' in a slightly formal-looking italic font."
---

> These notes are from a talk I gave at work. If you think something is missing or incorrect, please let me know!

Backend developers still have users: other developers. We're all human, with human limitations and differences. Design for those limitations and you'll find you improve the end result for everyone.

## Documentation

The first thing you can do: document. By this I don't just mean standalone text documentation; I also include code comments, clear variable and file naming (more on this later), and pipeline or script outputs that report success or failure *and give details*.

## Rely on standards

Rely on existing standards where possible. Style guides, spell checkers, linters, and formatters are all great. Make standards easy to follow with linter, editor, etc. config files in your repo, or add a devcontainer so others can easily get started with the project. When there's no standard, create one; for example, set up github issue and PR templates. And whenever you can, automate tests *and fixes*.

## User stories

### I want to understand new terms as they're introduced

- Abbreviations/initialisms: can stall anyone unfamiliar with them. Spell them out when they're first introduced, and add the abbreviation in parentheses.
- Jargon: avoid it as much as possible. Keep a friendly tone.
- Neologisms: tech loves em! Often compound words or portmanteaus. For compound words (or, at times, hashtags), use camelCase or another style that distinguishes between words. This helps visually as well as improving screen reader pronunciation.

### I want to quickly scan a page for the information I need

Sighted users may take for granted the ability to skim a page by glancing at headers or highlights. Users with screen readers rely on several features for the same functionality.

For example, screen readers can summarize the headers on a page. To leverage this, break up content with headers and avoid using other formatting to achieve similar effects visually. Stick to one h1 per page, and don't skip levels (e.g. go from an h1 to an h3).

Screen readers can also summarize a page's links. In order for this to be effective, links need descriptive text attached to them (and always avoid bare links!). Compare these examples:

> Read [more](https://www.w3.org/WAI/ARIA/apg/patterns/) about accessibility patterns on the web

vs

> Read more about [accessibility patterns on the web](https://www.w3.org/WAI/ARIA/apg/patterns/)

The second example has text directly attached to the link that describes its content. This is a vast improvement over the first example, where the link would just be read out as "more". Since links are visually highlighted, good link text also improves readability for everyone.

A table of contents can be helpful for a broad set of users, from the power user who knows exactly what she needs from the page to the newbie who just wants to see what the major topics are.

### I want to be aware of and able to understand all content on the page

Alt text/image descriptions for image and transcription/audio descriptions for videos are essential (and not just for screen readers - they're really useful if you've got poor internet connection). The references section of this document will link to  more information on writing good alt text, but in general, focus on why the image/video is there and what it is conveying.

I find this comes up the most in backend as *diagrams*. We love diagrams in place of words! Unfortunately, you'll want those words for some users eventually. Avoid alt text like "diagram of components" or "flow chart showing pipeline" - either write out a more direct explanation that mentions all entities contained in the diagram, or direct the reader to a section of text that covers the same content (e.g. "flow chart of the pipeline described below"). If you're writing a direct explanation, don't feel the need to describe each shape or arrow - focus on describing the relationships and entities those shapes and arrows represent.

## todo notes

These are bits of feedback or further thoughts that have yet to be integrated into this.

- tabs vs spaces (prefer tabs - allows each developer to customize based on eyesight and personal preference)
- don't use color alone to convey meaning
- no images of text!!!
- autocorrects and confirmation prompts

## References

- [Accessibility guidelines and requirements - Microsoft style guide](https://learn.microsoft.com/en-us/style-guide/accessibility/accessibility-guidelines-requirements)
- [Write accessible documentation - Google docs style guide](https://developers.google.com/style/accessibility)
- [How to write an image description](https://uxdesign.cc/how-to-write-an-image-description-2f30d3bf5546)


