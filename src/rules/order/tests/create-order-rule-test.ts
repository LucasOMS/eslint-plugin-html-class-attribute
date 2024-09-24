import { RuleTester } from 'eslint';
import { alphabeticalErrorMessage, regexOrderErrorMessage } from '../utils/order-rule-error-messages';
import ValidTestCase = RuleTester.ValidTestCase;
import InvalidTestCase = RuleTester.InvalidTestCase;

type TestCaseOptions = {
    alphabetical?: boolean;
    order?: string[];
}

export function createValidOrderRuleTestCase(options: TestCaseOptions, code: string): ValidTestCase {
    return {
        options: [{
            order: options.order ?? [],
            alphabetical: options.alphabetical ?? false,
        }],
        code: code,
    };
}

type InvalidOrderRuleErrorSpecs = OrderRuleRegexErrorSpecs | OrderRuleAlphabeticalErrorSpecs;

interface OrderRuleRegexErrorSpecs {
    type: 'order';
    classInError: string;
    shouldComeBeforeClass: string;
    classInErrorRegexMatch?: string;
    shouldComeBeforeClassRegexMatch?: string;

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
    if (errorSpec.type === 'order') {
        message = regexOrderErrorMessage(
            errorSpec.classInError,
            errorSpec.classInErrorRegexMatch,
            errorSpec.shouldComeBeforeClass,
            errorSpec.shouldComeBeforeClassRegexMatch,
        );
    } else {
        message = alphabeticalErrorMessage(
            errorSpec.shouldComeBeforeClass,
            errorSpec.classInError,
            order.length > 0,
            errorSpec.matchedRegex,
        );
    }
    const codeLines = code.split('\n');
    const classInErrorLine = codeLines.findIndex((line) => line.includes(errorSpec.classInError)) + 1;
    if (classInErrorLine === 0) {
        throw new Error(`Class ${errorSpec.classInError} not found in code`);
    }
    const classInErrorColumn = codeLines[classInErrorLine - 1].indexOf(errorSpec.classInError) + 1;

    return {
        options: [{
            order,
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
}
