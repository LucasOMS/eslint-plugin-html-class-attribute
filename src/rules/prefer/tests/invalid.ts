import { createInvalidPreferRuleTestCase } from './create-prefer-rule-test';

export const invalid = [
    // Matches one class
    createInvalidPreferRuleTestCase(
        [{ classList: ['a'], prefer: 'test' }],
        `<h1 class="a b"></h1>`,
        'a',
        'test',
    ),
    // Matches all classes
    createInvalidPreferRuleTestCase(
        [{ classList: ['a', 'b'], prefer: 'test' }],
        `<h1 class="a b"></h1>`,
        'a b',
        'test',
    ),
    // Matches multiple classes
    createInvalidPreferRuleTestCase(
        [{ classList: ['a', 'b'], prefer: 'test' }],
        `<h1 class="a b c"></h1>`,
        'a b',
        'test',
    ),
    // region Utility classes style
    createInvalidPreferRuleTestCase(
        [{
            classList: [
                '^d-flex$',
                '^flex-column$',
                '^gap-(?<gap>\\d+)',
            ],
            prefer: 'flex-space-y-$<gap>',
        }],
        `<h1 class="d-flex flex-column gap-4 mt-0"></h1>`,
        'd-flex flex-column gap-4',
        'flex-space-y-4',
    ),

    // endregion
];
