import { createInvalidPreferRuleTestCase } from './create-prefer-rule-test';

export const invalid = [
    // Matches one class
    createInvalidPreferRuleTestCase(
        [{ classList: ['a'], prefer: 'test' }],
        `<h1 class="a b"></h1>`,
        `<h1 class="test b"></h1>`,
        'a',
        'test',
    ),
    // Matches all classes
    createInvalidPreferRuleTestCase(
        [{ classList: ['a', 'b'], prefer: 'test' }],
        `<h1 class="a b"></h1>`,
        `<h1 class="test"></h1>`,
        'a b',
        'test',
    ),
    // Matches multiple classes
    createInvalidPreferRuleTestCase(
        [{ classList: ['a', 'b'], prefer: 'test' }],
        `<h1 class="a b c"></h1>`,
        `<h1 class="test c"></h1>`,
        'a b',
        'test',
    ),
    // region Utility classes style

    // Test with named capture group
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
        `<h1 class="flex-space-y-4 mt-0"></h1>`,
        'd-flex flex-column gap-4',
        'flex-space-y-4',
    ),
    createInvalidPreferRuleTestCase(
        [
            {
                classList: [
                    '^d-flex$',
                    '^flex-column$',
                    '^gap-(?<gap>\\d+)',
                ],
                prefer: 'flex-space-y-$<gap>',
            },
            {
                classList: [
                    '^d-flex$',
                    '^gap-(?<gap>\\d+)',
                ],
                prefer: 'flex-space-x-$<gap>',
            },
        ],
        `<h1 class="d-flex flex-column gap-4 mt-0"></h1>`,
        `<h1 class="flex-space-y-4 mt-0"></h1>`,
        'd-flex flex-column gap-4',
        'flex-space-y-4',
    ),

    // endregion

    // TODO Implement these tests, it should only match if both margins are equals
    createInvalidPreferRuleTestCase(
        [{
            classList: [
                '^mb-(?<marginY>\\d+)',
                '^mt-(?<marginY>\\d+)',
            ],
            prefer: 'my-$<marginY>',
        }, {
            classList: [
                '^ml-(?<marginX>\\d+)',
                '^mr-(?<marginX>\\d+)',
            ],
            prefer: 'mx-$<marginX>',
        },
        ],
        `<h1 class="mt-1 mb-1 ml-1 mr-2"></h1>`,
        `<h1 class="my-1 ml-1 mr-2"></h1>`,
        'mt-1 mb-1',
        'my-1',
    ),
];
