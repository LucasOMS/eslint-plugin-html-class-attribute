import { generateDocForRule } from './generate-doc-page';
import { invalid as orderInvalid } from '../rules/order/tests/invalid';
import { valid as orderValid } from '../rules/order/tests/valid';
import { invalid as forbiddenInvalid } from '../rules/forbidden/tests/invalid';
import { valid as forbiddenValid } from '../rules/forbidden/tests/valid';
import { invalid as preferInvalid } from '../rules/prefer/tests/invalid';
import { valid as preferValid } from '../rules/prefer/tests/valid';

generateDocForRule(
    'order',
    'Sort classes in class attribute for better readability',
    {
        code:
            `type Options = {
    alphabetical: boolean;
    order: (OrderRuleNamedRegex | string)[];
    groups: OrderRuleNamedRegex[];
}

interface OrderRuleNamedRegex {
    name: string;
    regex: string;
}`,
        description:
            `- \`groups\`: define a set of regex patterns that should be sorted together.
- \`order\`: An array of regex patterns that define the order of classes. The rule will enforce that classes are sorted in
  the order defined by the patterns. Strings are passed as is in a Javascript RegExp object, you should escape special
  characters if needed.
- \`alphabetical\`: Does same regex patterns should be sorted alphabetically? The default value is \`false\`.`,
    },
    orderInvalid,
    orderValid,
);

generateDocForRule(
    'forbidden',
    'Prevent usage of classes in class attribute',
    {
        code: `type Options = string[];`,
    },
    forbiddenInvalid,
    forbiddenValid,
);

generateDocForRule(
    'prefer',
    `Prefer classes instead of others. This rule can be used as migration helper or to enforce using easier helper in your code.`,
    {
        code:
            `type Options = {
    classList: string[];
    prefer: string;
}[];`,
        description:
            `## With capture groups

You can use capture group to perform advanced search and replace. Please see example below.
If you use capture groups with same name, the rule will only apply if the value of the capture group is the same in all classes.

### Example with capture groups

Given the following configuration:

\`\`\`json
{
    "rules": {
        "html-class-attribute/prefer": [
            "error",
            {
                "classList": [
                    "^d-flex$",
                    "^flex-column$",
                    "^gap-(?<gap>\\\\d+(\\\\.\\\\d+)?)$", // Gap is a capture group bound by parenthesis
                ],
                "prefer": "flex-space-y-$<gap>" // $<gap> will use capture group to replace the value
            }
        ]
    }
}
\`\`\`
`,
    },
    preferInvalid,
    preferValid,
);
