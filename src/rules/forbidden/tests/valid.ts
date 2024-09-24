import { createValidOrderRuleTestCase } from './create-forbidden-rule-test';

export const valid = [
    createValidOrderRuleTestCase(
        ['invalid'],
        `<h1 class="valid">Foo</h1>`,
    ),
    createValidOrderRuleTestCase(
        ['^val$'],
        `<h1 class="valid">Foo</h1>`,
    ),
];
