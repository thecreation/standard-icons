# @icon/weather-icons

[![npm version](https://img.shields.io/npm/v/@icon/weather-icons.svg)](https://www.npmjs.org/package/@icon/weather-icons)
[![Build Status](https://travis-ci.org/icon/icon.svg?branch=master)](https://travis-ci.org/icon/icon)

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/weather-icons` with this command.

```bash
npm install --save @icon/weather-icons
```

## Usage

There are many ways/formats of how to use weather-icons. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons -- when you need just a few icons in your project

  1. If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
  <img height="32" width="32" src="@icon/weather-icons/icons/day-sunny.svg" />
```

  2. Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/weather-icons` npm package in the URL like the following:

```
  <img height="32" width="32" src="https://unpkg.com/@icon/weather-icons/icons/day-sunny.svg" />
```

### Icons font -- ideal when you want to include all icons at once

  1. Install `@icon/weather-icons` with this command. In the `<head>` of your html, reference the location to your `weather-icons.css`.

```
  <head>
  ...
  <link rel="stylesheet" href="@icon/weather-icons/weather-icons.css">
  ...
  </head>
```

  2. Use [unpkg.com][Unpkg] to load directly weather-icons without installing anything:

```
  <head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/@icon/weather-icons/weather-icons.css">
  ...
  </head>
```

> Place weather-icons with `<i>` tag in your html like this. Icon class names are to be used with the `wi` class prefix.

```
  <i class="wi wi-day-sunny"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Weather-icons is copyright by Erik Flowers.

- Weather Icons is licensed under the [SIL OFL 1.1][SIL]

- Weather Icons code are licensed under the [MIT License][MIT]

- Weather Icons documentation is licensed under the [CC BY 3.0 License][CCBY3.0]

[CCBY3.0]: http://creativecommons.org/licenses/by/3.0/
[MIT]: https://opensource.org/licenses/mit-license.html
[SIL]: http://scripts.sil.org/OFL
[icon]: https://github.com/thecreation/icons
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/icons/issues
[Unpkg]: https://unpkg.com