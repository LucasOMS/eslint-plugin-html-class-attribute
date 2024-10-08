import { RuleTester } from 'eslint';
import InvalidTestCase = RuleTester.InvalidTestCase;

const regex = /<h1 class="([^"]*)">[^<]*<\/h1>/g;

function tildeUnderline(html: string): string {
    return html.replace(regex, (match, classContent) => {
        return ' '.repeat(11) + '~'.repeat(classContent.length);
    });
}

export function generateInvalidCaseDoc(ruleName: string, testCase: InvalidTestCase) {
    const configStringified =
        JSON.stringify(testCase.options, null, 4)
            .split('\n')
            // add indentation to each line
            .map(line => '            ' + line)
            .join('\n');

    const config =
        `#### Config
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

    const invalidCode =
        `#### ❌ Invalid Code

\`\`\`html
${testCase.code}
${tildeUnderline(testCase.code)}
\`\`\``;

    const fixedCode =
        testCase?.output ?
            `#### :wrench: Fixed code

\`\`\`html
${testCase.output}
\`\`\`` : null;

    return `${config}

${invalidCode}

${fixedCode ?? ''}`;
}
