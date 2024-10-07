# `html-class-attribute/forbidden`

Prevent usage of classes in class attribute

<br>

## Rule options

```ts
type Options = string[];
```

## Usage example

Given the following configuration:

```json
{
    "rules": {
        "html-class-attribute/forbidden": [
            "error",
            [
                "^forbidden-class$",
                "^ng-.*$"
            ]
        ]
    }
}
```

<details>
<summary>❌ - Toggle examples of <strong>incorrect</strong> code for this rule</summary>

<br>

#### ❌ Invalid Code

```html
<div class="forbidden-class"></div>
            ~~~~~~~~~~~~~~~
```

<br>

#### ❌ Invalid Code

```html
<div class="ng-star-inserted"></div>
            ~~~~~~~~~~~~~~~~
```

</details>

<br>

<details>
<summary>✅ - Toggle examples of <strong>correct</strong> code for this rule</summary>

<br>

#### ✅ Valid Code

```html
<div class="other-class"></div>
```

</details>
