import { RuleTester } from 'eslint';
import ValidTestCase = RuleTester.ValidTestCase;

export function generateValidCaseDoc(ruleName: string, testCase: ValidTestCase) {
    const configStringified =
        JSON.stringify(testCase.options, null, 4)
            .split('\n')
            // add indentation to each line
            .map(line => '            ' + line)
            .join('\n');

    const config = `#### Config
\`\`\`json
{
    "rules": {
        "html-class-attribute/${ruleName}": [
            "error",
${configStringified}
        ]
    }
}
\`\`\``;

    const validCode = `#### ✅ Valid Code

\`\`\`html
${testCase.code}
\`\`\``;

    return `${config}

${validCode}`;
}
