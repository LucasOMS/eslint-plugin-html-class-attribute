import { RuleTester } from 'eslint';
import { generateInvalidCaseDoc } from './templates/invalid-case-doc';
import { generateValidCaseDoc } from './templates/valid-case-doc';
import ValidTestCase = RuleTester.ValidTestCase;
import InvalidTestCase = RuleTester.InvalidTestCase;

export function generateCases(
    ruleName: string,
    invalidExamples: InvalidTestCase[],
    validExamples: ValidTestCase[],
): string {
    return `
> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the last release from this commit. 

<details>
<summary>❌ - Toggle examples of <strong>incorrect</strong> code for this rule</summary>

<br>

${invalidExamples.map(example => generateInvalidCaseDoc(ruleName, example)).join('\n\n<br>\n\n')}

</details>


<details>
<summary>✅ - Toggle examples of <strong>correct</strong> code for this rule</summary>

<br>

${validExamples.map(example => generateValidCaseDoc(ruleName, example)).join('\n\n<br>\n\n')}

</details>
`;
}
