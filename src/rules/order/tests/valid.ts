import { createValidOrderRuleTestCase } from './create-order-rule-test';

export const valid = [
    // Test only alphabetical order
    createValidOrderRuleTestCase(
        { alphabetical: false },
        `<h1 class="a b d c">Foo</h1>`,
    ),
    createValidOrderRuleTestCase(
        { alphabetical: true },
        `<h1 class="a b c d">Foo</h1>`,
    ),
    // Only alphabetical but with same word start
    createValidOrderRuleTestCase(
        { alphabetical: true },
        `<h1 class="aa aaa ab">Foo</h1>`,
    ),
    // Alphabetical order with dash
    createValidOrderRuleTestCase(
        { alphabetical: true },
        `<h1 class="aa-a aa-b aaa">Foo</h1>`,
    ),

    // Regex order without alphabetical
    createValidOrderRuleTestCase(
        { order: ['^first'], alphabetical: false },
        `<h1 class="first-b first-a a b d c">Foo</h1>`,
    ),
    createValidOrderRuleTestCase(
        { order: ['^first'], alphabetical: true },
        `<h1 class="first-a first-b a b c d">Foo</h1>`,
    ),
];
