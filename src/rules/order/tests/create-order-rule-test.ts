import { RuleTester } from 'eslint';
import {
    alphabeticalErrorMessage,
    groupOrderErrorMessage,
    regexOrderErrorMessage,
} from '../utils/order-rule-error-messages';
import { regexOrNamedRegexToOrderRuleRegex } from '../utils/get-order-rule-options';
import { OrderRuleNamedRegex } from '../types/order-rule-options';
import ValidTestCase = RuleTester.ValidTestCase;
import InvalidTestCase = RuleTester.InvalidTestCase;

type TestCaseOptions = {
    alphabetical?: boolean;
    order?: (string | OrderRuleNamedRegex)[];
    groups?: OrderRuleNamedRegex[];
}

export function createValidOrderRuleTestCase(options: TestCaseOptions, code: string): ValidTestCase {
    return {
        options: [{
            order: options.order ?? [],
            groups: options.groups ?? [],
            alphabetical: options.alphabetical ?? false,
        }],
        code: code,
    };
}

type InvalidOrderRuleErrorSpecs = OrderRuleRegexErrorSpecs | OrderRuleAlphabeticalErrorSpecs | OrderRuleGroupErrorSpecs;

interface OrderRuleRegexErrorSpecs {
    type: 'order';
    classInError: string;
    shouldComeBeforeClass: string;
    classInErrorRegexMatch?: string;
    shouldComeBeforeClassRegexMatch?: string;
}

interface OrderRuleGroupErrorSpecs {
    type: 'order-group';
    classInError: string;
    shouldComeBeforeClass: string;
    groupName: string;
    shouldComeBeforeGroupName?: string;
}

interface OrderRuleAlphabeticalErrorSpecs {
    type: 'alphabetical';
    classInError: string;
    shouldComeBeforeClass: string;
    matchedRegex?: string;
}

export function createInvalidOrderRuleTestCase(
    options: TestCaseOptions,
    code: string,
    output: string,
    errorSpec: InvalidOrderRuleErrorSpecs,
): InvalidTestCase {
    const order = options.order ?? [];
    let message: string;

    switch (errorSpec.type) {
        case 'order':
            message = regexOrderErrorMessage(
                errorSpec.classInError,
                getOrderRuleRegex(errorSpec.classInErrorRegexMatch),
                errorSpec.shouldComeBeforeClass,
                getOrderRuleRegex(errorSpec.shouldComeBeforeClassRegexMatch),
            );
            break;
        case 'order-group':
            message = groupOrderErrorMessage(
                errorSpec.classInError,
                getOrderRuleGroupByName(errorSpec.groupName),
                errorSpec.shouldComeBeforeClass,
                getOrderRuleGroupByName(errorSpec.shouldComeBeforeGroupName),
            );
            break;
        case 'alphabetical':
            message = alphabeticalErrorMessage(
                errorSpec.shouldComeBeforeClass,
                errorSpec.classInError,
                order.length > 0,
                getOrderRuleRegex(errorSpec.matchedRegex),
            );
            break;
    }

    const codeLines = code.split('\n');
    const classInErrorLine = codeLines.findIndex((line) => line.includes(errorSpec.classInError)) + 1;
    if (classInErrorLine === 0) {
        throw new Error(`Class ${ errorSpec.classInError } not found in code`);
    }
    const classInErrorColumn = codeLines[classInErrorLine - 1].indexOf(errorSpec.classInError) + 1;

    return {
        options: [{
            order,
            groups: options.groups ?? [],
            alphabetical: options.alphabetical ?? false,
        }],
        code: code,
        output: output,
        errors: [
            {
                message,
                column: classInErrorColumn,
                line: classInErrorLine,
                endColumn: classInErrorColumn + errorSpec.classInError.length,
                endLine: classInErrorLine,
            },
        ],
    };

    function getOrderRuleRegex(regex: string | undefined): OrderRuleNamedRegex | undefined {
        if (!regex) {
            return undefined;
        }
        return {
            name: options?.order?.map(regexOrNamedRegexToOrderRuleRegex)?.find(o => {
                if (typeof o === 'string') {
                    return o === regex;
                }
                return o.regex === regex;
            })?.name ?? regex,
            regex: regex,
        };
    }

    function getOrderRuleGroupByName(name: string | undefined): OrderRuleNamedRegex | undefined {
        if (!name) {
            return undefined;
        }
        return options?.groups?.find(o => o.name === name);
    }
}
