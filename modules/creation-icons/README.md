# @icon/creation-icons

[![npm version](https://img.shields.io/npm/v/@icon/creation-icons.svg)](https://www.npmjs.org/package/@icon/creation-icons)
[![Build Status](https://travis-ci.org/icon/icon.svg?branch=master)](https://travis-ci.org/icon/icon)

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/creation-icons` with this command.

```bash
npm install --save @icon/creation-icons
```

## Usage

There are many ways/formats of how to use creation-icons. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons -- when you need just a few icons in your project

1 . If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
<img height="32" width="32" src="@icon/creation-icons/icons/add.svg" />
```

2 . Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/creation-icons` npm package in the URL like the following:

```
<img height="32" width="32" src="https://unpkg.com/@icon/creation-icons/icons/add.svg" />
```

### Icons font -- ideal when you want to include all icons at once

1 . Install `@icon/creation-icons` with this command. In the `<head>` of your html, reference the location to your `creation-icons.css`.

```
<head>
...
<link rel="stylesheet" href="@icon/creation-icons/creation-icons.css">
...
</head>
```

2 . Use [unpkg.com][Unpkg] to load directly creation-icons without installing anything:

```
<head>
...
<link rel="stylesheet" href="https://unpkg.com/@icon/creation-icons/creation-icons.css">
...
</head>
```

> Place creation-icons with `<i>` tag in your html like this. Icon class names are to be used with the `ci` class prefix.

```
<i class="ci ci-add"></i>
```

## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

[GPL-v3](./LICENSE) &copy; [Creation Studio Limited](https://creationstudio.com/)

[icon]: https://github.com/thecreation/icons
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[github issues]: https://github.com/thecreation/icons/issues
[sass]: http://sass-lang.com/
[Unpkg]: https://unpkg.com