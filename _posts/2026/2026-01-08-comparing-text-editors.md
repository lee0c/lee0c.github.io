---
layout: post
title: comparing text editors
category: reference
image:
    name: 2026/horsetail.jpg
    alt: "Image unrelated to post. Close up on a horsetail plant's stem, with many small needle-like leaves emerging from all sides of the circular stem at each segmented joint."
tags:
    - software
---

I'm fucking depressed. No, not like mental health depressed (okay, look, that too, but that's not relevant here). Looking to switch text editors, I reviewed 6 different options...and what I found didn't thrill me.

> this post contains comparison tables that are far more viewable on desktop/tablet

## the editors

the editors I reviewed, in no particular order, are:

- [VSCode](https://code.visualstudio.com/){:target="_blank"} (my current daily driver which I've been wanting to leave behind for a while now)
- [Zed](https://zed.dev/){:target="_blank"} (an editor I've been tentatively interested in)
- [Kate](https://kate-editor.org/){:target="_blank"} (recommended to me semi-recently on the fediverse, but one I quickly wrote off at the time because of clunkiness)
- [Lapce](https://lap.dev/lapce/){:target="_blank"} (recommended by this [no-AI OSS chart](https://codeberg.org/gen-ai-transparency/open-slopware){:target="_blank"})
- [Pulsar](https://pulsar-edit.dev/){:target="_blank"} (a fork of the discontinued Atom editor, recommended again by fedi, in the course of this review)
- and finally, [Sublime Text](https://www.sublimetext.com/){:target="_blank"} (my daily driver back in college)

## the qualities

I reviewed looking for 5 major **functional** qualities that I considered to be my most useful or heavily-used features:

- `.editorconfig` support
- find and replace with regex support
- WSL support (including, because apparently this is an issue, the ability to delete files from inside the editor) (this is the highest priority - I do *all* work in WSL)
- multi-edit (e.g. ability to select multiple instances of a word and edit them all) (this is the most discardable functionality, as it can be replaced with find-and-replace)
- markdown preview

3 less important, but preferred, **aesthetic** qualities:

- clean, modern UI
- file type icons
- ability to customize the color scheme (ideally per-color settings, but that's uncommon)

and finally, 3 **ethical and trustworthiness** qualities:

- no LLM features
- for products with LLM features: single setting to turn off LLM features
- trust that product longevity will not be affected by LLM-generated code

(in other words: no LLMs).

## the comparison charts

### functional qualities

| | `.editorconfig` | find-and-replace | WSL | multi-edit | `.md` preview |
|---|---|---|---|---|---|
| VSCode | **yes**[1] | **yes** | **yes**[1] | **yes** | **yes** |
| Zed | **yes[1]** | **yes** | **yes** | **yes** | **yes** |
| Kate | **yes** | **yes** | no[2] | **yes** | no |
| Lapce | no | **yes** | no[3] | **yes** | no |
| Pulsar | no | **yes** | no[3] | **yes** | **yes** |
| Sublime Text | **yes** | **yes** | no[3][4] | **yes** | no[5] |

[1] extension needed: [VSCode `.editorconfig`](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig){:target="_blank"}, [VSCode WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack){:target="_blank"}, [Zed `.editorconfig`](https://zed.dev/extensions/editorconfig){:target="_blank"}

[2] I could open a WSL directory in Kate, but couldn't see any files. I confirmed that opening a Windows directory worked as expected.

[3] opening the project worked fine, but I couldn't delete files. In Sublime Text's case, they were deleted but still shown in the file view.

[4] saving a new file opens the save menu in the Windows File Explorer, which frankly makes me a bit afraid. Touching your WSL files from Windows is generally a bad idea.

[5] I explored two different add-on packages for Markdown preview support. [Markdown Live Preview](https://packagecontrol.io/packages/MarkdownLivePreview){:target="_blank"} and [MarkdownPreview](https://packagecontrol.io/packages/MarkdownPreview){:target="_blank"}. Markdown Live Preview opened a whole new window scoped only to the specific `.md` file. MarkdownPreview previewed in browser. Neither of these match the behavior I am looking for.

### aesthetic qualities

| | UI | file icons | color scheme |
|---|---|---|---|
| VSCode | **yes** | **yes** | **yes**[1] |
| Zed | **yes** | **yes** | **yes**[2] |
| Kate | no | **yes** | **yes**[2] |
| Lapce | **yes** | no | **yes**[3] |
| Pulsar | **yes** | no | **yes**[1] |
| Sublime Text | **yes** | **yes** | **yes** |

[1] several color schemes available. Further extensions available.

[2] several color schemes available.

[3] only light and dark schemes available. Further plugins available.

### ethical qualities

this is my best guess based on searching online and reviewing the settings; it's kind of hard to really confirm these things. I am judging the last quality - whether or not the devs are using LLMs - based on the existence of `prompts` directories in the projects' repositories.

| | no LLM features | LLM kill switch | no LLM code |
|---|---|---|---|
| VSCode | no | no | no[1] |
| Zed | no | **yes** | no[2] |
| Kate | **yes** | n/a | **yes** |
| Lapce | **yes** | n/a | **yes** |
| Pulsar | **yes** | n/a | **yes**[3] |
| Sublime Text | **yes** | n/a | unknown[4] |

[1] [prompts directory](https://github.com/microsoft/vscode/tree/main/.github/prompts){:target="_blank"}

[2] looks like at current LLMs are only used for [documentation](https://github.com/zed-industries/zed/tree/main/.factory/prompts){:target="_blank"}

[3] it's been discussed and sounds currently up for debate: [Pulsar](https://github.com/pulsar-edit/pulsar/issues/792){:target="_blank"}, [Sublime Text](https://forum.sublimetext.com/t/implement-ai-into-sublime-text/68411){:target="_blank"}

[4] I couldn't find the source code for Sublime Text online; I assume it's not OSS. If you know where it is, point me in that direction.

## summary

I'll be honest, I just don't know. The functionality is not something I can easily compromise on. TBH, I figured I had pretty basic needs as a developer, but it seems that's not the case! The only editors that meet my functionality needs across the board are *also* the worst offenders on the LLM front.

at the end of the day, I might just have to keep looking... but regardless, I wanted to publish what I found to help anyone else with similar needs.

## corrections and edits

- Kate *does* have multi-edit
- Lapce has plugins for further color schemes
- VSCode WSL support requires an extension
- Zed `.editorconfig` support requires an extension

### WSL2 and Linux GUIs

I learned that [WSL2 can support GUI apps](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps){:target="_blank"} so I tried this for a few. Pulsar did not work; Sublime Text worked but the UI scale was *teensy* and was not affected by the `ui_scale` setting.
