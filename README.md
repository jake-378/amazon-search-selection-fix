<h1><img src="icons/search-128.png" width="48" height="48" alt=""> Amazon Search Selection Fix</h1>

Amazon Search Selection Fix is a small Chrome extension that keeps selected text in Amazon's search box from disappearing when the field loses focus during a drag selection.

## The problem

When replacing a search term, you may click and drag across the text in Amazon's search field. If you release the mouse outside the field, Amazon can blur the input and clear the selection. You then have to select the text again before typing.

A [MacRumors discussion about Amazon's search-field behavior](https://forums.macrumors.com/threads/strange-search-field-behavior-on-amazon-com.2340914/) describes the user-facing issue and provides additional context. The discussion is a reference only; this is an independent project and is not affiliated with or endorsed by its participants.

## What it does

The extension preserves the text selection when the search input is blurred while a non-empty selection remains. When there is no active selection, the input's original blur behavior is allowed.

## How it works

The Manifest V3 service worker listens for top-level page navigations on `amazon.com` and injects a function into the page's main JavaScript world. The function finds Amazon's search input by its `twotabsearchtextbox` ID and wraps that element's `blur()` method. Calls to `blur()` are ignored while `selectionStart` and `selectionEnd` differ; otherwise, the original method is called.

A `MutationObserver` watches the document for the search input if Amazon adds it after the initial injection. A data attribute prevents attaching the fix more than once to the same input.

## Install in Chrome

1. Download and extract this repository, or clone it.
2. Open `chrome://extensions`.
3. Turn on **Developer mode**.
4. Select **Load unpacked**.
5. Choose the `amazon-search-selection-fix` folder containing `manifest.json`.

## Compatibility

The extension is built for Chrome using Manifest V3 and Chrome's `webNavigation` and `scripting` APIs. Its manifest grants access to `amazon.com` pages. Other browsers are not verified.

The fix depends on Amazon continuing to use the `twotabsearchtextbox` element ID and the relevant blur behavior.

## Project structure

```text
amazon-search-selection-fix/
├── .gitattributes
├── background.js
├── icons/
│   ├── search-16.png
│   ├── search-32.png
│   ├── search-48.png
│   ├── search-128.png
│   └── icon.svg
├── LICENSE
├── manifest.json
└── README.md
```

There is no build step or dependency installation.

## License

The extension source is licensed under the MIT License. See [LICENSE](LICENSE).
