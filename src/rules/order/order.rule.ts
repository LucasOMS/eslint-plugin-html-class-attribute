import { Rule } from 'eslint';
import { getImplementationByParser } from '../../utils/get-implementation-by-parser';
import { orderRuleAngularTemplateParser } from './order.rule.angular-template-parser';
import { orderRuleEslintHtmlParser } from './order.rule.eslint-html-parser';
import RuleContext = Rule.RuleContext;

const rule: Rule.RuleModule = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Force classes to be in a certain order based on regex and/or alphabetical order',
            category: 'Best Practices',
            recommended: true,
        },
        fixable: 'code',
        schema: [
            {
                'type': 'object',
                'properties': {
                    'alphabetical': {
                        'type': 'boolean',
                        'default': false,
                    },
                    'order': {
                        'type': 'array',
                        'items': {
                            'type': 'string',
                        },
                        'default': [],
                    },
                },
                'additionalProperties': false,
            },
        ],
    },
    create: (context: RuleContext): Rule.RuleListener => {
        return getImplementationByParser(
            context,
            orderRuleAngularTemplateParser,
            orderRuleEslintHtmlParser,
        );
    },
};

export = rule;
