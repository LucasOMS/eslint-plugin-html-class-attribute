import { createValidPreferRuleTestCase } from './create-prefer-rule-test';

export const valid = [
    createValidPreferRuleTestCase(
        [
            { classList: ['a', 'b', 'c'], prefer: 'test' },
        ],
        `<h1 class="a b"></h1>`,
    ),
];
