import { Rule } from 'eslint';
import { getImplementationByParser } from '../../utils/get-implementation-by-parser';
import { preferRuleAngularTemplateParser } from './prefer.rule.angular-template-parser';
import { preferRuleEslintHtmlParser } from './prefer.rule.eslint-html-parser';
import RuleContext = Rule.RuleContext;

const rule: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Use class instead of other class or class group, handful to prefer shorter utility class and avoid repetition',
            category: 'Best Practices',
            recommended: false,
        },
        schema: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                properties: {
                    classList: {
                        type: 'array',
                        minItems: 1,
                        items: {
                            type: 'string',
                        },
                    },
                    prefer: {
                        type: 'string',
                    },
                },
            },
        },
    },
    create: (context: RuleContext): Rule.RuleListener => {
        return getImplementationByParser(
            context,
            preferRuleAngularTemplateParser,
            preferRuleEslintHtmlParser,
        );
    },
};

export = rule;
