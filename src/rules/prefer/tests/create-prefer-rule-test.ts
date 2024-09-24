import { RuleTester } from 'eslint';
import { PreferRuleOptions } from '../types/prefer-rule-options';
import { getPreferRuleErrorMessage } from '../utils/prefer-rule-error-message';
import ValidTestCase = RuleTester.ValidTestCase;

export function createValidPreferRuleTestCase(preferList: PreferRuleOptions, code: string): ValidTestCase {
    return {
        options: preferList ?? [],
        code: code,
    };
}

export function createInvalidPreferRuleTestCase(
    preferList: PreferRuleOptions,
    code: string,
    classToReplace: string,
    replaceBy: string,
): RuleTester.InvalidTestCase {
    return {
        options: preferList ?? [],
        code: code,
        errors: [{
            message: getPreferRuleErrorMessage(classToReplace.split(' '), replaceBy),
        }],
    };
}
