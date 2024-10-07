# eslint-plugin-html-class-attribute

[![NPM version](https://img.shields.io/npm/v/eslint-plugin-html-class-attribute.svg)](https://www.npmjs.com/package/eslint-plugin-html-class-attribute)
[![Build Status](https://github.com/LucasOMS/eslint-plugin-html-class-attribute/actions/workflows/test.yml/badge.svg)](https://github.com/LucasOMS/eslint-plugin-html-class-attribute/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An ESLint plugin that help enforce best practices or use project specific shorthands for
class attributes in HTML.

## Requirements

This plugins needs `@angular-eslint/template-parser` or `@html-eslint/parser` to work.
By default, none is configured, you might need to define it manually in your eslint configuration.

```json
{
    "parser": "@html-eslint/parser"
}
```

## Installation

You can install the plugin using npm:

```sh
npm install eslint-plugin-html-class-attribute --save-dev
```

Or using yarn:

```sh
yarn add eslint-plugin-html-class-attribute --dev
```

## Rules

<!-- begin problems rule list -->

**Key**

- :white_check_mark: = recommended
- :wrench: = fixable
- :bulb: = has suggestions

| Rule                                      | Description                                 | :white_check_mark: | :wrench: | :bulb: |
|-------------------------------------------|---------------------------------------------|--------------------|----------|--------|
| [order](./docs/order-rule.doc.md)         | Enforce classes order                       | :white_check_mark: | :wrench: |        |
| [prefer](./docs/prefer-rule.doc.md)       | Use class instead of others                 |                    | :wrench: |        |
| [forbidden](./docs/forbidden-rule.doc.md) | Prevent usage of classes in class attribute |                    |          |        |

## Test your RegExp

All rules have configurations based on regex patterns. You can test your regexes using the following code snippet:
This is a simple test that you can run in your browser console or in a Node.js environment.

His only purpose is to test that your regex correctly escapes special characters and matches the expected strings.

```js
// Because configuration uses double quote, it is important to test with double quotes
let regex = new RegExp("your-regex-here");
let shouldMatch = 'classToMatch';
let shouldNotMatch = 'classNotToMatch';

let matchOk = regex.test(shouldMatch);
let notMatchOk = !regex.test(shouldNotMatch);

if (!matchOk) {
    console.error('Did not match expected');
}

if (!notMatchOk) {
    console.error('Matched unexpected');
}

if (matchOk && notMatchOk) {
    console.log('Your regex is working as expected');
}
```
