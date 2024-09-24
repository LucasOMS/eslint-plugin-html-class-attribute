import { Rule } from 'eslint';
import RuleContext = Rule.RuleContext;

export function preferRuleEslintHtmlParser(context: RuleContext): Rule.RuleListener {
    return {
        'Tag Attribute:has(AttributeKey[value="class"]) AttributeValue': (classAttributeValue: any) => {
        },
    };
}
