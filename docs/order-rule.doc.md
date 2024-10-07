# `html-class-attribute/forbidden`

Sort classes in class attribute for better readability

<br>

## Rule options

```ts
type Options = {
    alphabetical: boolean;
    order: (OrderRuleNamedRegex | string)[];
    groups: OrderRuleNamedRegex[];
}

interface OrderRuleNamedRegex {
    name: string;
    regex: string;
}
```

- `groups`: define a set of regex patterns that should be sorted together.
- `order`: An array of regex patterns that define the order of classes. The rule will enforce that classes are sorted in
  the order defined by the patterns. Strings are passed as is in a Javascript RegExp object, you should escape special
  characters if needed.
- `alphabetical`: Does same regex patterns should be sorted alphabetically? The default value is `false`.

<details>
<summary>❌ - Toggle examples of <strong>incorrect</strong> code for this rule</summary>

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/order": [
            "error",
            { "alphabetical": true }
        ]
    }
}
```

#### ❌ Invalid Code

```html
<h1 class="a d b c">Foo</h1>
           ~~~~~~~
```

#### :wrench: Fixed code

```html
<h1 class="a b c d">Foo</h1>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/order": [
            "error",
            {
                "order": [
                    "^first"
                ],
                "alphabetical": false
            }
        ]
    }
}
```

#### ❌ Invalid Code

```html
<h1 class="a first-b first-a b d c">Foo</h1>
           ~~~~~~~~~~~~~~~~~~~~~~~
```

#### :wrench: Fixed code

```html
<h1 class="first-b first-a a b d c">Foo</h1>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/order": [
            "error",
            {
                "order": [
                    {
                        "regex": "^first",
                        "name": "First class"
                    }
                ],
                "alphabetical": false
            }
        ]
    }
}
```

#### ❌ Invalid Code

```html
<h1 class="aa-a first aa-b aaa">Foo</h1>
           ~~~~~~~~~~~~~~~~~~~
```

#### :wrench: Fixed code

```html
<h1 class="first aa-a aa-b aaa">Foo</h1>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/order": [
            "error",
            {
                "groups": [{ "name": "Classes for javascript purpose", "regex": "^.*-js" }],
                "order": ["^first"],
                "alphabetical": true,
            },
        ]
    }
}
```

#### ❌ Invalid Code

```html
<h1 class="aa-js first-js first-aa first-aaa first-ab">Groups should follow regex order</h1>
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

#### :wrench: Fixed code

```html
<h1 class="first-js aa-js first-aa first-aaa first-ab">Groups should follow regex order</h1>
```

<br>

</details>

<br>

<details>
<summary>✅ - Toggle examples of <strong>correct</strong> code for this rule</summary>

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            { "alphabetical": false }
        ]
    }
}
```

#### ✅ Valid Code

```html
<div class="a z b"></div>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            { "alphabetical": true }
        ]
    }
}
```

#### ✅ Valid Code

```html
<div class="a b z"></div>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            {
                "order": [
                    "^first"
                ],
                "alphabetical": false
            }
        ]
    }
}
```

#### ✅ Valid Code

```html
<h1 class="first-b first-a a z b">Foo</h1>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            {
                "order": [
                    "^first"
                ],
                "alphabetical": true
            }
        ]
    }
}
```

#### ✅ Valid Code

```html
<h1 class="first-b first-a a b z">Foo</h1>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            {
                "groups": [
                    {
                        "name": "Classes for javascript purpose",
                        "regex": "^.*-js"
                    }
                ],
                "order": [
                    "^first"
                ],
                "alphabetical": true,
            }
        ]
    }
}
```

#### ✅ Valid Code

```html
<h1 class="first-js aa-js first-aa first-aaa first-ab">Foo bar</h1>
```

<br>

</details>
