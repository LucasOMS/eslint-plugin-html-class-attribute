import { RuleTester } from 'eslint';
import { RuleOptionsForDocumentation, rulePageDoc } from './templates/rule-page-doc';
import * as fs from 'node:fs';
import ValidTestCase = RuleTester.ValidTestCase;
import InvalidTestCase = RuleTester.InvalidTestCase;

export function generateDocForRule(
    ruleName: string,
    ruleDescription: string,
    options: RuleOptionsForDocumentation,
    invalidExamples: InvalidTestCase[],
    validExamples: ValidTestCase[],
) {
    const pathToGenerate = `./docs/${ruleName}-rule.doc.md`;

    const content = rulePageDoc(ruleName, ruleDescription, options, invalidExamples, validExamples);

    // Write the content to the file
    fs.writeFileSync(pathToGenerate, content);
}
