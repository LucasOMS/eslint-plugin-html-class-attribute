import { Rule } from 'eslint';
import { GetClassesWithMetadata } from '../../utils/get-classes-with-metadata';
import { getForbiddenRuleOptions } from './utils/get-forbidden-rule-options';
import { getForbiddenRuleErrorMessage } from './utils/forbidden-rule-error-message';
import RuleContext = Rule.RuleContext;

export function forbiddenRuleEslintHtmlParser(context: RuleContext): Rule.RuleListener {
    return {
        'Tag Attribute:has(AttributeKey[value="class"]) AttributeValue': (classAttributeValue: any) => {
            const classes = GetClassesWithMetadata.fromEslintHtmlParser(classAttributeValue);
            const forbiddenClasses = getForbiddenRuleOptions(context);

            const forbiddenClassesRegexes = forbiddenClasses.map((forbiddenClass) => new RegExp(forbiddenClass));

            for (const klass of classes) {
                const className = klass.name;
                if (forbiddenClassesRegexes.some(regex => regex.test(className))) {
                    context.report({
                        message: getForbiddenRuleErrorMessage(className),
                        loc: klass.loc,
                    });
                }
            }
        },
    };
}
