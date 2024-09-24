import { createInvalidForbiddenRuleTestCase } from './create-forbidden-rule-test';

export const invalid = [
    // Exact match
    createInvalidForbiddenRuleTestCase(
        ['invalid'],
        `<h1 class="invalid">Foo</h1>`,
        'invalid',
    ),

    // Exact match
    createInvalidForbiddenRuleTestCase(
        ['^invalid'],
        `<h1 class="invalid">Foo</h1>`,
        'invalid',
    ),

    // Partial match at word beginning
    createInvalidForbiddenRuleTestCase(
        ['^inval'],
        `<h1 class="invalid">Foo</h1>`,
        'invalid',
    ),
    // Partial match inside word
    createInvalidForbiddenRuleTestCase(
        ['val'],
        `<h1 class="invalid">Foo</h1>`,
        'invalid',
    ),
    // Partial match at word end
    createInvalidForbiddenRuleTestCase(
        ['lid$'],
        `<h1 class="invalid">Foo</h1>`,
        'invalid',
    ),

    // Match with number like bootstrap utility classes
    createInvalidForbiddenRuleTestCase(
        ['^col-\\d+'],
        `<h1 class="col col-test col-12">Foo</h1>`,
        'col-12',
    ),
];
