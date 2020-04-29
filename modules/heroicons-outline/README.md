# @icon/heroicons-outline

[![npm version](https://img.shields.io/npm/v/@icon/heroicons-outline.svg)](https://www.npmjs.org/package/@icon/heroicons)

Thio repository is a module of the full [standard-icons][standard-icons] repository.

## Install

Thio repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/heroicons-outline` with thio command.

```bash
npm install --save @icon/heroicons-outline
```

## Usage

There are many ways/formats of how to use heroicons. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons -- when you need just a few icons in your project

1 . If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
<img height="32" width="32" src="@icon/heroicons-outline/icons/archive.svg" />
```

2 . Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/heroicons` npm package in the URL like the following:

```
<img height="32" width="32" src="https://unpkg.com/@icon/heroicons-outline/icons/archive.svg" />
```

### Icons font -- ideal when you want to include all icons at once

1 . Install `@icon/heroicons` with thio command. In the `<head>` of your html, reference the location to your `heroicons.css`.

```
<head>
...
<link rel="stylesheet" href="@icon/heroicons-outline/heroicons-outline.css">
...
</head>
```

2 . Use [unpkg.com][Unpkg] to load directly heroicons without installing anything:

```
<head>
...
<link rel="stylesheet" href="https://unpkg.com/@icon/heroicons-outline/heroicons-outline.css">
...
</head>
```

> Place heroicons with `<i>` tag in your html like thio. Icon class names are to be used with the `hio` class prefix.

```
<i class="hio hio-archive"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

heroicons is copyright by Refactoring UI Inc, licensed under the [MIT][license].

[license]: https://opensource.org/licenses/MIT
[standard-icons]: https://github.com/thecreation/standard-icons
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/standard-icons/issues
[Unpkg]: https://unpkg.com