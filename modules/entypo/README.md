# @icon/entypo

[![npm version](https://img.shields.io/npm/v/@icon/entypo.svg)](https://www.npmjs.org/package/@icon/entypo)
[![Build Status](https://travis-ci.org/icon/icon.svg?branch=master)](https://travis-ci.org/icon/icon)

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/entypo` with this command.

```bash
npm install --save @icon/entypo
```

## Usage

There are many ways/formats of how to use entypo. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons -- when you need just a few icons in your project

  1. If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
  <img height="32" width="32" src="@icon/entypo/icons/note.svg" />
```

  2. Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/entypo` npm package in the URL like the following:

```
  <img height="32" width="32" src="https://unpkg.com/@icon/entypo/icons/note.svg" />
```

### Icons font -- ideal when you want to include all icons at once

  1. Install `@icon/entypo` with this command. In the `<head>` of your html, reference the location to your `entypo.css`.

```
  <head>
  ...
  <link rel="stylesheet" href="@icon/entypo/entypo.css">
  ...
  </head>
```

  2. Use [unpkg.com][Unpkg] to load directly entypo without installing anything:

```
  <head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/@icon/entypo/entypo.css">
  ...
  </head>
```

> Place entypo with `<i>` tag in your html like this. Icon class names are to be used with the `entypo` class prefix.

```
  <i class="entypo entypo-note"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Entypo is copyright by Daniel Buce.

- All icons are distributed under [CC BY-SA](http://creativecommons.org/licenses/by-sa/3.0/) licence.

- Font is distributed under [SIL](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL) licence.

[icon]: https://github.com/thecreation/icons
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/icons/issues
[Unpkg]: https://unpkg.com