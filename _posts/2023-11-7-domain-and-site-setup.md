---
layout: post
title: domain and site setup
category: reference
image: 
    name: 
    alt: ""
---

In this writeup, I will walk through one (of many!) ways to set up and utilize a custom domain and website.

## Audience

This is aimed at a non-technical audience, but my own perspective is technical and some of the articles I link to will get technical. Because of this, it's possible that I will miss things that you have questions on - please reach out to me and ask questions!

## Outcome

After following this writeup, you should have:

- a **domain name**: domain names identify internet locations with an easier-to-remember string than an IP (Internet Protocol) address.
- a **static website**: *static* means that the site has fixed, pre-built assets that remain the same regardless of who is viewing them (or the time of day, or the weather, or...). A static site can still vary widely in complexity! I created my static site using [GitHub Pages](https://pages.github.com/), a free offering that requires some technical skill to configure, but I'll mention some alternate routes that require less technical know-how, including simply letting your domain name point to an existing site you don't control - like your [Artisans Cooperative](https://artisans.coop/) storefront.

This writeup will *not* cover every possible route to getting your own home on the web - there's far too many options out there. It's just meant to give you a starting point and a few ideas.

## Domain name

### Top-level domains (TLDs)

I started planning my domain name by reviewing the list of TLDs - things like ".org" or ".com". ICANN (the Internet Corporation for Assigned Names and Numbers) maintains a [list of all TLDs](https://www.icann.org/resources/pages/tlds-2012-02-25-en) - it's long! Reviewing this list can help you think of potential domain names. You can also look at a list like [this one Wikipedia maintains](https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains) - it has more detail and can tell you if a specific TLD is for a given country, reserved for specific uses, or (what you probably want) for general use.

Personally, I narrowed it down to two - ".art" or ".gay". From there, it's off to the domain registrars! These are companies that offer domain names for sale. Here's [an article from Forbes Advisor reviewing some of the major names in the space](https://www.forbes.com/advisor/business/software/best-domain-registrar/). I use Namecheap, but don't let that bias you. Look around at pricing (pay attention to the rate for year 2 onward - domain registrars often offer super low year 1 rates to hook customers) and consider other features, like support availability.

### Decide on a full domain name

Narrowing down a TLD isn't the only choice - you also need to decide what goes in front of that! Some things to think about:

- **memorable:** Shorter domain names and domain names with clearly recognizable words are helpful for both you and your audience. If you're anything like me, your site might end up as a repository for all sorts of knowledge and references, and being able to quickly type up or relay a URL is a plus.
- **distinct:** Is it unique? Avoid domains that are only a character off from more commonly visited websites or that sound particularly generic.
- **constant:** While you *can* change domains frequently if you wish (and might want to if you're tight on cash - again, year 1 offers are cheap!), reprinting all your marketing materials is no fun. Aim to pick something that has staying power, like your own or your business' name.

In my case, I went with [leecat.art](https://leecat.art). The ".art" TLD was cheaper than the ".gay" option long-term, and I shortened my full, somewhat hard to spell name to a quick two syllables, 3 characters each.

### Buy your domain

Pick a domain registrar that offers the domain name you want, and pay (usually for a year). Next, we'll talk about some uses for this domain name.

## Using your domain name

### Option 1: simple redirect

The easiest way to utilize a domain name is to have it redirect to another URL. I'm not going to go through how to set up a domain redirect with every possible provider, but if you search up "[your domain registrar] redirect" you should find useful documentation.

### Option 1, but better: redirect to a link tree

Link trees (popularized by [linktree](https://linktr.ee/)) are a single page with a collection of links maintained by an owner. You can use linktree or check out this [WIRED article with alternatives](https://www.wired.com/story/link-in-bio-linktree-alternatives/). Some are paid, usually small monthly fees, and some are free.

### Option 2: static site with GitHub Pages

#### Wait, what's GitHub?

[GitHub](https://github.com/) - wait, no.

First, let's talk about [git](https://git-scm.com/). Git is a *version control system*, a type of software that manages changes to a set of files. This allows the owner(s) of those files to do things like revert changes or compare current and historical versions of files. It also allows for multiple people to work on the same shared file repository without creating conflicts.

GitHub is a centralized source for many, many git repositories. It essentially allows you to back up both your code and the log of all changes to the cloud. It also supports [GitHub Pages](https://pages.github.com/), a free way to host a static site of your own.

To get started with GitHub, you'll first need to [create an account](https://github.com/signup) if you don't have one. If you want to learn some GitHub basics, the GitHub team has created this handy [introduction to GitHub](https://github.com/skills/introduction-to-github) that walks you through some basic git and GitHub concepts.

### Now that we know what GitHub is...

The GitHub documentation is pretty thorough, so let's point to some articles over there.

- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) walks you through getting a repository set up and automatically publishing to a URL like "your-github-username.github.io" (don't worry, we'll get that custom domain name attached soon!)
    - there's also this handy [GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart)
- [Adding a theme to your GitHub Pages site using Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll) will show you how to use pre-created website themes to customize your site.
    - I suggest using one of the [supported themes](https://pages.github.com/themes/) as they will be the easiest to work with.
- [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) will allow you to use that domain name you bought earlier for your new website!
- GitHub Pages is powered by [Jekyll](https://jekyllrb.com/), a tool for generating static sites from Markdown (.md) files. [Learn more about a Jekyll project's file directory structure](https://jekyllrb.com/docs/structure/)