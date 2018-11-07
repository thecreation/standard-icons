# @icon/module-generator

[![npm version](https://img.shields.io/npm/v/@icon/module-generator.svg)](https://www.npmjs.org/package/@icon/module-generator)
[![Build Status](https://travis-ci.org/icon/icon.svg?branch=master)](https://travis-ci.org/icon/icon)

This is a [Yeoman] generator that we use to scaffold new Icon modules.

## Usage

1. `cd` to the top level directory of the `icon` repository
1. Run:

    ```sh
    npm run new-module
    ```

    You can also pass the module name as a positional argument like this:

    ```sh
    npm run new-module -- @icon/module-name
    ```

1. Answer the interactive prompts.

    > If you don't know some of the answers (aside from the module name, which
    > is required), it's okay to press <kbd>enter</kbd> or <kbd>return</kbd>.

1. If all goes well, the new module will be bootstrapped and ready to use. You
   should see a directory with this structure:

    ```
    modules/module-name/
    ├── LICENSE
    ├── README.md
    ├── index.scss
    ├── index.js
    ├── scss
    │   └── module-name.scss
    ├── js
    │   └── module-name.js
    └── package.json
    ```

1. If you have any TODOs left from unanswered prompts, fill them out! You can
   list them again with:

   ```sh
   ack TODO modules/module-name
   ```

   (Note: you can use `grep` if you don't have `ack` installed.)


## License

[MIT](./LICENSE) &copy; [Creation Studio Limited](https://creationstudio.com/)
