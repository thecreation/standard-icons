# @icon/linea-weather

[![npm version](https://img.shields.io/npm/v/@icon/linea-weather.svg)](https://www.npmjs.org/package/@icon/linea-weather)
[![Build Status](https://travis-ci.org/icon/icon.svg?branch=master)](https://travis-ci.org/icon/icon)

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/linea-weather` with this command.

```bash
npm install --save @icon/linea-weather
```

## Usage

There are many ways/formats of how to use linea-weather. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons -- when you need just a few icons in your project

  1. If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
  <img height="32" width="32" src="@icon/linea-weather/icons/weather-aquarius.svg" />
```

  2. Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/linea-weather` npm package in the URL like the following:

```
  <img height="32" width="32" src="https://unpkg.com/@icon/linea-weather/icons/weather-aquarius.svg" />
```

### Icons font -- ideal when you want to include all icons at once

  1. Install `@icon/linea-weather` with this command. In the `<head>` of your html, reference the location to your `linea-weather.css`.

```
  <head>
  ...
  <link rel="stylesheet" href="@icon/linea-weather/linea-weather.css">
  ...
  </head>
```

  2. Use [unpkg.com][Unpkg] to load directly linea-weather without installing anything:

```
  <head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/@icon/linea-weather/linea-weather.css">
  ...
  </head>
```

> Place linea-weather with `<i>` tag in your html like this. Icon class names are to be used with the `lwe` class prefix.

```
  <i class="lwe lwe-weather-aquarius"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Linea-weather is copyright by Dario Ferrando.

- Linea Weather is licensed under the [CC0-1.0][license].

[license]: https://github.com/thecreation/icons/blob/master/modules/linea-weather/LICENSE
[icon]: https://github.com/thecreation/icons
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/icons/issues
[Unpkg]: https://unpkg.com