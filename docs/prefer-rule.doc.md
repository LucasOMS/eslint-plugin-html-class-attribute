# `html-class-attribute/forbidden`

Prefer classes instead of others. This rule can be used as migration helper or to enforce using easier helper in your
code.

<br>

## Rule options

```ts
type Options = {
    classList: string[];
    prefer: string;
}[];
```

## With capture groups

You can use capture group to perform advanced search and replace. Please see example below

### Example with capture groups

Given the following configuration:

```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            {
                "classList": [
                    "^d-flex$",
                    "^flex-column$",
                    "^gap-(?<gap>\\d+(\\.\\d+)?)$", // Gap is a capture group bound by parenthesis
                ],
                "prefer": "flex-space-y-$<gap>" // $<gap> will use capture group to replace the value
            }
        ]
    }
}
```

<details>
<summary>❌ - Toggle examples of <strong>incorrect</strong> code for this rule</summary>

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            {
                "classList": [
                    "^classA$",
                ],
                "prefer": "classB"
            }
        ]
    }
}
```

#### ❌ Invalid Code

```html
<div class="classA otherClass"></div>
            ~~~~~~~~~~~~~~~~~
```

#### :wrench: Fixed code

```html
<div class="classB otherClass"></div>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            {
                "classList": [
                    "^classA$",
                    "^classB$",
                ],
                "prefer": "classA-B"
            }
        ]
    }
}
```

#### ❌ Invalid Code

```html
<div class="classA otherClass classB"></div>
            ~~~~~~~~~~~~~~~~~~~~~~~~
```

#### :wrench: Fixed code

```html
<div class="classA-B otherClass"></div>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            {
                "classList": [
                    "^mt-(?<marginTop>\\d+)$",
                    "^mr-(?<marginRight>\\d+)$",
                    "^mb-(?<marginBottom>\\d+)$",
                    "^ml-(?<marginLeft>\\d+)$",
                ],
                "prefer": "m-$<marginTop>-$<marginRight>-$<marginBottom>-$<marginLeft>"
            }
        ]
    }
}
```

#### ❌ Invalid Code

```html
<div class="mt-1 mr-2 mb-3 ml-4"></div>
            ~~~~~~~~~~~~~~~~~~~~
```

#### :wrench: Fixed code

```html
<div class="m-1-2-3-4"></div>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            {
                "classList": [
                    "^flex-y$",
                ],
                "prefer": "d-flex flex-column"
            }
        ]
    }
}
```

#### ❌ Invalid Code

```html
<div class="flex-y align-items-center"></div>
            ~~~~~~~~~~~~~~~~~~~~~~~~~
```

#### :wrench: Fixed code

```html
<div class="d-flex flex-column align-items-center"></div>
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
            {
                "classList": [
                    "^flex-y$",
                ],
                "prefer": "d-flex flex-column"
            }
        ]
    }
}
```

#### ✅ Valid Code

```html
<div class="d-flex flex-column align-items-center"></div>
```

<br>

#### Config
```json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            {
                "classList": [
                    "^mt-(?<marginY>\\d+)$",
                    "^mb-(?<marginY>\\d+)$",
                ],
                "prefer": "my-$<marginY>"
            }
        ]
    }
}
```

#### ✅ Valid Code

```html
<div class="mt-1 ml-2"></div>
```

<br>

</details>
