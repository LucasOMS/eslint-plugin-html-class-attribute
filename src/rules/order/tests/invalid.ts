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

    // With named regex
    createInvalidOrderRuleTestCase(
        { order: [{ regex: '^first', name: 'First class' }], alphabetical: false },
        `<h1 class="aa-a first aa-b aaa">Foo</h1>`,
        `<h1 class="first aa-a aa-b aaa">Foo</h1>`,
        {
            type: 'order',
            classInError: 'first',
            classInErrorRegexMatch: '^first',
            shouldComeBeforeClass: 'aa-a',
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

    // region With groups
    createInvalidOrderRuleTestCase(
        { groups: [{ name: 'First', regex: '^first' }, { name: 'Second', regex: '^second' }], alphabetical: false },
        `<h1 class="second-a first-a a b d c">Groups are in wrong order</h1>`,
        `<h1 class="first-a second-a a b d c">Groups are in wrong order</h1>`,
        {
            type: 'order-group',
            classInError: 'first-a',
            groupName: 'First',
            shouldComeBeforeClass: 'second-a',
            shouldComeBeforeGroupName: 'Second',
        },
    ),

    createInvalidOrderRuleTestCase(
        { groups: [{ name: 'First', regex: '^first' }], alphabetical: true },
        `<h1 class="first-b first-a a b c">Same group but in wrong alphabetical order</h1>`,
        `<h1 class="first-a first-b a b c">Same group but in wrong alphabetical order</h1>`,
        {
            type: 'alphabetical',
            classInError: 'first-a',
            shouldComeBeforeClass: 'first-b',
            matchedRegex: '^first',
        },
    ),

    createInvalidOrderRuleTestCase(
        {
            groups: [{ name: 'Classes for javascript purpose', regex: '^.*-js' }],
            order: ['^first'],
            alphabetical: true,
        },
        // All classes with -js are before because of group
        // In the group, ^first will come first
        // In default group, only ^first is applied then alphabetical order
        `<h1 class="aa-js first-js first-aa first-aaa first-ab">Groups should follow regex order</h1>`,
        `<h1 class="first-js aa-js first-aa first-aaa first-ab">Groups should follow regex order</h1>`,
        {
            type: 'order',
            classInError: 'first-js',
            classInErrorRegexMatch: '^first',
            shouldComeBeforeClass: 'aa-js',
        },
    ),

    createInvalidOrderRuleTestCase(
        {
            groups: [{ name: 'Classes for javascript purpose', regex: '^.*-js' }],
            order: ['^first'],
            alphabetical: true,
        },
        // All classes with -js are before because of group
        // In the group, ^first will come first
        // In default group, only ^first is applied then alphabetical order
        `<h1 class="first-b-js first-a-js first-aa first-aaa first-ab">Same group and regex should follow alphabetical order</h1>`,
        `<h1 class="first-a-js first-b-js first-aa first-aaa first-ab">Same group and regex should follow alphabetical order</h1>`,
        {
            type: 'alphabetical',
            classInError: 'first-a-js',
            shouldComeBeforeClass: 'first-b-js',
            matchedRegex: '^.*-js',
        },
    ),
    // endregion
];
