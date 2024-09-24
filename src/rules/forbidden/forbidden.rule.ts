import { Rule } from 'eslint';
import { getImplementationByParser } from '../../utils/get-implementation-by-parser';
import { forbiddenRuleAngularTemplateParser } from './forbidden.rule.angular-template-parser';
import { forbiddenRuleEslintHtmlParser } from './forbidden.rule.eslint-html-parser';
import RuleContext = Rule.RuleContext;

const rule: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Ensure that class is not used in class attribute',
            category: 'Best Practices',
            recommended: false,
        },
        schema: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'string',
            },
        },
    },
    create: (context: RuleContext): Rule.RuleListener => {
        return getImplementationByParser(
            context,
            forbiddenRuleAngularTemplateParser,
            forbiddenRuleEslintHtmlParser,
        );
    },
};

export = rule;
