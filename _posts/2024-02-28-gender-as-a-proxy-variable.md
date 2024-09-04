---
layout: post
title: gender as a proxy variable
category: reference
image: 
    name: gender-zine-cover.png
    alt: "Part of a scan of the cover of my zine, Gender as a Proxy Variable. It shows the title and a bit of handsewn binding."
tags:
    - gender 
---

[Look through a scan of the zine.](assets/pdf/gender-as-a-proxy-variable.pdf) (Be aware that the PDF is not as up to date as the web version below.)

[Get print copies.](https://riverside-refuge.square.site/product/gender-as-a-proxy-variable-print-zine/113)

The below material is a web page reproduction of my zine **Gender as a Proxy Variable**.

---

Authored by Lee Cattarin

August - December 2023 -> February 2024

---

> I would argue that you almost never have to ask for gender…
>
> If you’re collecting gender identity data to personalize user-facing copy, try asking for preferred\* pronouns instead. If you’re asking because you want to make in-app content recommendations, try asking about the user’s content preferences. If you’re asking to generate a user avatar, let the user generate their own. **Gender identity is a poor proxy variable** — stick to asking for the information you actually want.

--	Nikki Stevens, quoted in “How to Make Your Software More Trans-Inclusive,” emphasis mine

\**pro tip: just say "pronouns" and drop the "preferred"*

---

So, what are you asking for when you ask for

## **Gender?**

- pronouns?
- title or prefix?
- health needs?
- clothing preferences?
- bathroom use?
- public profile data?
- demographic data?
- legal identification?
- medical information?

---

## Formatting note

(this section and its effects have been altered to be functional in this medium - in the print zine, checkboxes and radio buttons were used. But Markdown only has one type of list.)

Questions that require users pick a single answer will be followed with "(pick one)".

Questions that allow users to choose multiple answers will be followed with "(pick any)".

Write-in fields may have italicized suggestions in them.

---

## ...Pronouns

What pronouns should we use for you? (pick any)

- he/him/his
- she/her/hers
- they/them/theirs
- other *(write-in)*: *ze/hir/hirs*

Worried about parsing that free text field? Try:

- subjective: *she*
- objective: *her*
- possessive (adj): *her*
- possessive (prn): *hers*
- reflexive: *herself*

## ...Title or prefix

What title or prefix should we use for you? (pick one)

- Mr.
- Mrs.
- Ms.
- Mx.
- Rev.
- Dr.
- Hon.

(et cetera)

- no prefix
- other *(write-in)*:

## ...Health needs

Do you require private facilities for breastfeeding or other health and wellness needs? (pick one)

- yes
- no

*Provide a write-in space for specific needs, such as refrigeration or running water.*

## ...Clothing preferences

Which style of shirt would you prefer? (pick one)

- straight cut
- fitted *(edit: a reader has suggested "curvy" or "flared" as alternatives)*

## ...Bathroom use

Do you require any of the following restrooms? (pick any)

- all-gender
- single-occupancy
- wheelchair-accessible
- other *(write-in)*:

*All restrooms should be provided with menstrual products.*

## ...Public profile data

What is your gender? **This information will be viewable on your profile by all logged-in users.** (pick any)

- man
- woman
- nonbinary
- other *(write-in)*:

*Make sure to note the visibility level!*

## ...Demographic data

What is your gender? **This information is collected for demographic analysis only.** (pick one)

- man
- woman
- nonbinary
- other *(write-in)*:

## ...Legal

What is your legal sex as marked on government-issued identification? (pick one)

- M
- F
- X

*Explain where this information will be used. If you need something more specific than **any** legal identification, say so: "This is used for insurance purposes and must match your gender on insurance paperwork."*

## ...Medical

What is your gender? (pick any)

- man
- woman
- nonbinary
- other *(write-in)*:

What sex were you assigned at birth? (pick one)

- male
- female
- other *(write-in)*:

*An organ inventory and/or surgical history is a useful tool.*

---

But let’s talk more about that

## Gender question

Is:

- man
- woman
- nonbinary
- other *(write-in)*:

enough?

Maybe not! **Probably not, in fact!** But what are our other options?

- **Expansive lists** can be overwhelming to users, fall quickly out of date, and are prone to significant localization issues.
- **Free text entry** removes many of the downsides of expansive lists but introduces new problems with data storage and analysis.

Having **a few primary options and a write-in**, as shown above, is a good balance!

---

A little more on

## Anti-patterns

Consider the following options:

- man
- woman
- trans man
- trans woman

Aside from the lack of nonbinary gender choices, did you notice that?

These **exclusive choices** present “man” and “trans man” (and “woman” and “trans woman”) as separate genders, when what they’re most likely trying to convey is:

- cis man
- cis woman
- trans man
- trans woman

**Avoid treating “cis” as the unspoken default.**

Other anti-patterns include:

- automatic detection of gender (just don’t)
- immutable gender fields (make gender easily editable)
- grouping all nonbinary or nonstandard genders under “other” (add common gender terms for the relevant culture; include write-in fields)

## Patterns

Here’s some additional positive patterns that can be appended to many of the earlier examples:

- Make fields optional unless truly necessary, or include “decline to specify”
- When questions can’t accommodate a free text field, include “gender not listed here” for those who have an answer but don’t see it reflected in the form
- Allow for edits
- Allow for the removal of old data

## Sources

This zine draws from material I gathered for a longer blog post: [https://leecat.art/gender-in-data](gender-in-data)

Linked in that blog post are numerous sources; the most heavily relied on here was from Drupal’s documentation and is found under the section headed “Do you need gender data?”

## Author

Lee Cattarin is a transgender software developer and artist based out of Vashon, WA, USA. All hir creative work can be found at [https://leecat.art](/)

Get in touch with hir via any of the methods listed on [https://leecat.art/contact](contact)

![A small stamp depicting Lee's face next to a speech bubble in handwritten text that reads 'Thanks for reading!'. Below that, the word 'editors' in quotes, and stamps of a fluffy dog and 6 variously-patterned ducklings](assets/img/gender-zine-stamps.png)
