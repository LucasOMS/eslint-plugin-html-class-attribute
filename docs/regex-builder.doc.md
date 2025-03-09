# RegexBuilder

RegexBuilder is a simple tool to help you build regular expressions. It is designed to be easy to use and understand.

Since ESLint 9, the configuration file supports javascript so you can use code to build the plugin configuration.

## Get the RegexBuilder constructor

### Typescript import

```typescript
import htmlClassAttributePlugin from 'eslint-plugin-html-class-attribute';

const { RegexFactory } = htmlClassAttributePlugin;
```

### Javascript

```javascript
const htmlClassAttributePlugin = require('eslint-plugin-html-class-attribute');

const {RegexFactory} = htmlClassAttributePlugin;
```

## Create and use variables for prefer rule

The prefer rule can be used to enforce using shorthands, for example mt-1 and mb-1 can be replaced by my-1.

In order to do that, you have to define variable in the finding regex and use it in the replace regex.

You can use `RegexBuilder.createVariable` to create the variable and `RegexBuilder.useVariable` to use it.

### Example

#### Preset variable type

```javascript
export default [{
    // ...
    rules: {
        'html-class-attribute/prefer': [
            'error',
            [
                {
                    classList: [
                        `^ml-${RegexBuilder.createVariable('marginX', 'integer')}`,
                        `^mr-${RegexBuilder.createVariable('marginX', 'integer')}`,
                    ],
                    prefer: `mx-${RegexBuilder.useVariable('marginX')}`,
                }
            ]
        ]
    }
    // ...
}];
```

#### Specific values

If you want to target very specific case, you can define the variable with specific string. The generated regexp will
target one of the string you passed.

```javascript
const blueOrRed = `color-${RegexBuilder.createVariable('color', ['blue', 'red'])}`;
```

```javascript

##
Functions

###
Attribute
is

    ```javascript
// Will generate /^id$/
new RegexFactory().equals('id').build();
```

### Attribute starts with

```javascript
// Will generate /^data-.*/
new RegexFactory().startsWith('data-').build();
```

### Attribute doesn't start with

```javascript
// Will generate /^(?!data-\b|tracker-\b).*/ and negate it
new RegexFactory().doesntStartWith(['data-', 'tracker-']).build();
```

### Attribute contains

```javascript
// Will generate /.*data-.*/
new RegexFactory().contains('data-').build();
```

### Compose multiple regex

This example show how to create a regex that match an attribute starting with '[' but not followed by a list of specific
patterns such as style or class.

_This can be used to select an angular input that doesn't match another inner pattern._

```javascript
// Will generate /^\[(?!style\b|class\b).*\]$/
new RegexFactory()
    .startsWith('[')
    .hasRegexContent(
        new RegexFactory()
            .doesntStartWith([
                'style',
                'class'
            ])
    )
    .endsWith(']')
    .build();
```

### Force start and end boundaries

You can force the regex to start with `^` and end with `$` by using the `forceStartAndEnd` option in `build()` function.

```javascript
const regex = new RegexFactory().startsWith('start').contains('content');

// Will generate /^start.*content.*/
regex.build();

// Will generate /^start.*content.*$/
regex.build({forceStartAndEnd: true});
```
