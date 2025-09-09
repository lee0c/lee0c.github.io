---
layout: post
title: determinism, or, ai in software
category: reference
image:
    name: oscar-bird-king.jpg
    alt: "Picture unrelated to post. The face of a giant wooden troll sculpture. He has a bushy twig beard; wild, unnerving eyes that look right through you, and a crown of birdhouses."
tags:
    - software
---

(Photo is of Oscar the Bird King, our local troll. Sculpture artist is [Thomas Dambo](https://www.thomasdambo.com){:target="_blank"})

---

Determinism, in computer science, is a property of a system such that any execution of the system with the equal input(s) produces equal output(s). It's vital in any field where safety, reliability, and data cleanliness and retention (among other things) matter - that is, basically any field.

As we've built further layers of abstraction on abstraction, we've created deterministic systems such that a higher layer of abstraction is accurately transliterated to a lower layer and so on down. The lower layers still exist, but not a lot of people work directly with them anymore.

It's been told to me that generative AI is a new layer of abstraction on top of prior layers. As we once wrote machine code before moving to FORTRAN, we now move to this new paradigm.

If this is the case, where's our determinism?

Generative AI is probabilistic in nature. It doesn't produce a factual, static answer, but rather creates something that *sounds* like an answer - and that soundbite (soundbyte?) is different every time. It'll have patterns, of course, but it's not a 1:1 mapping of input → output. Randomness is inherent in the system.

---

Until we can prove that probabilistic behavior can grant us the deterministic outcomes we need for reliability and safety, I'd proceed with caution.