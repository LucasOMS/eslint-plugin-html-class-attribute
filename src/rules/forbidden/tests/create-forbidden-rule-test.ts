import { RuleTester } from 'eslint';
import { ForbiddenRuleOptions } from '../types/forbidden-rule-options';
import { getForbiddenRuleErrorMessage } from '../utils/forbidden-rule-error-message';
import ValidTestCase = RuleTester.ValidTestCase;
import InvalidTestCase = RuleTester.InvalidTestCase;

type TestCaseOptions = ForbiddenRuleOptions;

export function createValidOrderRuleTestCase(forbiddenClasses: TestCaseOptions, code: string): ValidTestCase {
    return {
        options: [forbiddenClasses ?? []],
        code: code,
    };
}

export function createInvalidForbiddenRuleTestCase(
    forbiddenClasses: TestCaseOptions,
    code: string,
    classInError: string,
): InvalidTestCase {
    const codeLines = code.split('\n');
    const classInErrorLine = codeLines.findIndex((line) => line.includes(classInError)) + 1;
    if (classInErrorLine === 0) {
        throw new Error(`Class ${classInError} not found in code`);
    }
    const classInErrorColumn = codeLines[classInErrorLine - 1].indexOf(classInError) + 1;

    const message = getForbiddenRuleErrorMessage(classInError);
    return {
        options: [forbiddenClasses ?? []],
        code: code,
        errors: [
            {
                message,
                column: classInErrorColumn,
                line: classInErrorLine,
                endColumn: classInErrorColumn + classInError.length,
                endLine: classInErrorLine,
            },
        ],
    };
}
