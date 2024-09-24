import { createInvalidOrderRuleTestCase } from './create-order-rule-test';

export const invalid = [
    // region Only alphabetical order
    // Base scenario
    createInvalidOrderRuleTestCase(
        { alphabetical: true },
        `<h1 class="a d b c">Foo</h1>`,
        `<h1 class="a b c d">Foo</h1>`,
        {
            type: 'alphabetical',
            classInError: 'b',
            shouldComeBeforeClass: 'd',
        },
    ),
    // With same word start
    createInvalidOrderRuleTestCase(
        { alphabetical: true },
        `<h1 class="a ad ab c">Foo</h1>`,
        `<h1 class="a ab ad c">Foo</h1>`,
        {
            type: 'alphabetical',
            classInError: 'ab',
            shouldComeBeforeClass: 'ad',
        },
    ),
    // With dash
    createInvalidOrderRuleTestCase(
        { alphabetical: true },
        `<h1 class="aa-b aa-a aaa">Foo</h1>`,
        `<h1 class="aa-a aa-b aaa">Foo</h1>`,
        {
            type: 'alphabetical',
            classInError: 'aa-a',
            shouldComeBeforeClass: 'aa-b',
        },
    ),

    // endregion

    // region Regex order
    // region == Without alphabetical fallback ==

    createInvalidOrderRuleTestCase(
        { order: ['^first'], alphabetical: false },
        `<h1 class="a first-b first-a b d c">Foo</h1>`,
        `<h1 class="first-b first-a a b d c">Foo</h1>`,
        {
            type: 'order',
            classInError: 'first-b',
            classInErrorRegexMatch: '^first',
            shouldComeBeforeClass: 'a',
        },
    ),
    // With no match class before the class in error
    createInvalidOrderRuleTestCase(
        { order: ['^first', '^second'], alphabetical: false },
        `<h1 class="a second-a first-b first-a b d c">Foo</h1>`,
        `<h1 class="first-b first-a second-a a b d c">Foo</h1>`,
        {
            type: 'order',
            classInError: 'second-a',
            classInErrorRegexMatch: '^second',
            shouldComeBeforeClass: 'a',
        },
    ),
    // Without no match before the class in error
    createInvalidOrderRuleTestCase(
        { order: ['^first', '^second'], alphabetical: false },
        `<h1 class="second-a first-b first-a b d c">Foo</h1>`,
        `<h1 class="first-b first-a second-a b d c">Foo</h1>`,
        {
            type: 'order',
            classInError: 'first-b',
            classInErrorRegexMatch: '^first',
            shouldComeBeforeClass: 'second-a',
            shouldComeBeforeClassRegexMatch: '^second',
        },
    ),

    // endregion
    // region == With alphabetical fallback ==
    createInvalidOrderRuleTestCase(
        { order: ['^first'], alphabetical: true },
        `<h1 class="first-b first-a a">Foo</h1>`,
        `<h1 class="first-a first-b a">Foo</h1>`,
        {
            type: 'alphabetical',
            classInError: 'first-a',
            shouldComeBeforeClass: 'first-b',
            matchedRegex: '^first',
        },
    ),
    createInvalidOrderRuleTestCase(
        { order: ['^first'], alphabetical: true },
        `<h1 class="a first-b first-a b">Foo</h1>`,
        `<h1 class="first-a first-b a b">Foo</h1>`,
        {
            type: 'order',
            classInError: 'first-b',
            classInErrorRegexMatch: '^first',
            shouldComeBeforeClass: 'a',
        },
    ),
    // With no match class before the class in error
    createInvalidOrderRuleTestCase(
        { order: ['^first', '^second'], alphabetical: true },
        `<h1 class="a second-a first-b first-a b">Foo</h1>`,
        `<h1 class="first-a first-b second-a a b">Foo</h1>`,
        {
            type: 'order',
            classInError: 'second-a',
            classInErrorRegexMatch: '^second',
            shouldComeBeforeClass: 'a',
        },
    ),
    // Without no match before the class in error
    createInvalidOrderRuleTestCase(
        { order: ['^first', '^second'], alphabetical: true },
        `<h1 class="second-b first-b second-a first-a a">Foo</h1>`,
        `<h1 class="first-a first-b second-a second-b a">Foo</h1>`,
        {
            type: 'order',
            classInError: 'first-b',
            classInErrorRegexMatch: '^first',
            shouldComeBeforeClass: 'second-b',
            shouldComeBeforeClassRegexMatch: '^second',
        },
    ),
    // endregion
    // endregion
];
