const chalk = require("chalk")
const fse = require("fs-extra")

const capitalize = require("./lib/capitalize")
const stripPrefix = require("./lib/strip-prefix")

const META_PACKAGES = [
  "@icon/support"
]

/**
 * Icon module options
 *
 * Each key is the name of the option in the generator's
 * `this.options` hash, and should be an object with one or more
 * of the following keys:
 *
 * - "argument" indicates that this option is a positional
 *   argument to the `yo` CLI.
 *
 * - "option" indicates that this option an be passed via a
 *   `--name` flag to `yo`. For UNIX-y consistency, options
 *   containing "_" characters are aliased to the version with
 *   hyphens, so you can pass either "--module_type" or
 *   "--module-type".
 *
 * - "prompt" will trigger a prompt for this option if it was not
 *   already set via positional argument or CLI option.
 */
module.exports = {

  // the module name in npm
  "module": {
    argument: {
      desc: "The name of your module (on npm)",
      type: String,
      required: false,
    },
    prompt: {
      name: "module",
      message: "What should the module name be (on npm)?",
      type: "input",
      // the name must include @icon somewhere
      // FIXME: this should be validate in configuring()
      validate: (name) => name.includes("@icon")
    },
  },

  // the human-readable title of the module
  "title": {
    option: {
      desc: "The module's human-readable title",
      type: String,
      alias: "t",
    },
    prompt: {
      message: "What should the title be (for humans)?",
      type: "input",
      default: function({module}) {
        return capitalize(
          stripPrefix(module || this.options.module)
        )
      },
    },
  },

  "description": {
    option: {type: String},
    prompt: {
      message: [
        "Describe your module in a single sentence.",
        chalk.yellow("(This will go into the package.json and README.md.)"),
      ].join("\n"),
      type: "input",
      default: "TODO: fill in this description later",
    },
  },

  "dependents": {
    // This allows users (and our tests) to pass --no-dependents
    // to disable updating dependent packages. XXX Note that the
    // prompt will be skipped if --dependents is passed!
    option: {
      desc: "Update dependent package.json files (use --no-dependents to disable)",
      type: Boolean,
    },
    prompt: {
      message: "Which meta-package(s) should we add this to?",
      type: "checkbox",
      when: function() {
        return this.options.dependents !== false
      },
      choices: META_PACKAGES
    },
  },

  "todo": {
    option: {
      desc: "Output TODO reminders (use --no-todo to disable)",
      type: Boolean,
      default: true,
    },
  },

  "verbose": {
    option: {
      desc: "Ouput more useful debugging info",
      type: Boolean,
      alias: "v",
    },
  }

}
