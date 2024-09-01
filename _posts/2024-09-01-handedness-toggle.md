---
layout: post
title: handedness toggle
category: reference
image: 
    name: handedness-toggle.png
    alt: "A screenshot of the rescue trans rescue navbar centered on a button that shows a hand pointing left."
tags:
    - software
---

Recently, I got an iPad for art and immediately fell down the rabbit hole of [Glitch](https://glitch.com){:target="_blank"} and web development.

When creating the [rescue Trans rescue site](https://rescue-trans-rescue.glitch.com){:target="_blank"}, I started with a right-aligned navbar. While developing and testing on my iPad, I got in the habit of hovering my hand over the top-right corner of the tablet, always ready to try the light/dark toggle or switch pages.

And then I thought about left-handed people - left handed tablet or touchscreen users in particular. Reaching across the screen repeatedly would start to be a real drag, wouldn't it?

Ok, let's make a toggle!

## the button

First we'll need some HTML for our button. I added this to my menu, which is a `<ul>`:

```html
<li><button id="alignment" title="toggle left/right navbar alignment" aria-label="toggle left/right navbar alignment" class="menu-link">
	<!-- autopopulated by nav.js -->
</button></li>
```

It's important to note here that I added it to the *beginning* of the menu list. I want it to be the first item in the list so that it points over the left side of the screen with nothing obstructing it.

## nav.js

Now let's move to `nav.js` and define some consts for ease of use. We're going to use [Font Awesome icons](https://fontawesome.com/icons){:target="_blank"} for this button, so we'll go grab their HTML for the left and right pointing hands.

```js
const ALIGN = "alignment"
const LEFT = "left"
const RIGHT = "right"

const LEFT_ICON = '<i class="fa-regular fa-hand-point-left" aria-hidden="true"></i>';
const RIGHT_ICON = '<i class="fa-regular fa-hand-point-right" aria-hidden="true"></i>';
```

We'll use `localStorage` to store and retrieve alignment preferences:

```js
let align = localStorage.getItem(ALIGN);
```

and we'll grab the button we defined in HTML:

```js
let alignToggle = document.getElementById(ALIGN);
```

### setting icons

Next, let's structure out some functions. We'll fill them in more as we figure out what we need.

```js
function setAlignRight() {
	// If we're aligned on the right, the toggle should point to the left
	alignToggle.innerHTML = LEFT_ICON;
}

function setAlignLeft() {
	// If we're aligned on the left, the toggle should point to the right
	alignToggle.innerHTML = RIGHT_ICON;
}

// This function changes the alignment to the given value
// It also runs at startup to set alignment
function changeAlign(align) {
	switch (align) {
		case LEFT:
			setAlignLeft();
			break;
		case null:
			// If nothing is set, default to right alignment
			align = RIGHT;
		case RIGHT:
			setAlignRight();
			break;
	}
	// Set localStorage for next time
	localStorage.setItem(ALIGN, align);
}

// Run at startup
changeAlign();

// This function handles the actual flip-flopping of the alignment value
function toggleAlign() {
	if (align === LEFT) align = RIGHT;
	else align = LEFT;

	changeAlign(align);
}

// Attach the toggle function to the alignToggle as a click listener
alignToggle.addEventListener("click", toggleAlign);
```

So that gets us the basic functionality of changing the icon when the toggle is clicked. However, it does nothing for the navbar alignment. What do we need for that?

### alignment

Well, that depends on your navbar CSS. For this, let's run through the simplest possible version: your navbar is a flexbox and all items are treated equally. Maybe your CSS looks sorta like this:

```css
#navbar {
	position: sticky;
	top: 0 px;
	width: 100%;
	/* This is the line that matters to us */
	/* we'll want to swap between flex-start and flex-end */
	justify-content: flex-end;
}
```

Let's add that `justify-content` setting to our JS (as well as a line to fetch the navbar by id):

```js
let navbar = document.getElementById("navbar");

function setAlignRight() {
	alignToggle.innerHTML = LEFT_ICON;
	navbar.style.justifyContent = "flex-end";
	// If you have other necessary style changes, add them here
}

function setAlignLeft() {
	alignToggle.innerHTML = RIGHT_ICON;
	navbar.style.justifyContent = "flex-start";
	// If you have other necessary style changes, add them here
}
```

Now, the menu should re-orient itself when we interact with the toggle. However, you'll notice that the left-aligned menu shows up in the same order as the right aligned menu: handedness toggle first, then the rest of the menu.

### moving the button

I don't want that; I want the handedness toggle to always point, unobstructed, to the side of the screen it moves things to. So let's move it around when we set alignment. It'll need to be the first item in the menu list for right-handed alignment, and the last item for left-handed. We can do that with `prepend()` and `append()`.

```js
function setAlignRight() {
	alignToggle.innerHTML = LEFT_ICON;
	navbar.style.justifyContent = "flex-end";
	navbar.prepend(alignToggle);
}

function setAlignLeft() {
	alignToggle.innerHTML = RIGHT_ICON;
	navbar.style.justifyContent = "flex-start";
	navbar.append(alignToggle); 
}
```

Cool! Now we have a menu that re-aligns itself *and* repositions the alignment button.

### keyboard navigation

Oooh, but wait: keyboard navigation is broken.

When I tab over to the alignment button and hit `Enter`/`space`, it does what we expect, but it *also* loses keyboard focus. Because of that little `prepend()`/`append()` move, the element is removed from the DOM and re-added in a new location -  now without focus. We'll need to add focus back to the `alignToggle` manually, so it's not lost.

We can do that with the `.focus()` function:

```js
function toggleAlign() {
	if (align === LEFT) align = RIGHT;
	else align = LEFT;

	changeAlign(align);

	// Replace focus on the toggle that's been moved
	alignToggle.focus();
}
```

Ok, now focus is maintained... but it also shows up after a mouse click, not just a keyboard interaction. That's a little irritating. How do we fix that?

### managing focus

`toggleAlign()` is an event handler, which means it can optionally take an `event` var. For "click" events, that `event` var includes a field `detail` which provides the *click count*. This can be used to disambiguate single vs double clicks, *or* it can be used to test for keyboard interaction, which creates *zero clicks*.

Let's add that in:

```js
function toggleAlign(event) {
	if (align === LEFT) align = RIGHT;
	else align = LEFT;

	changeAlign(align);

	// Zero clicks means this was a keyboard interaction
	// Replace focus on the toggle that's been moved
	if (event.detail === 0) alignToggle.focus();
}
```

Now we should only replace visible focus for keyboard interactions.

## thanks for reading

Want to see further changes? Found a bug with this implementation? [Contact me](/contact)!
