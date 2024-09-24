import { Rule } from 'eslint';
import { GetClassesWithMetadata } from '../../utils/get-classes-with-metadata';
import { getForbiddenRuleOptions } from './utils/get-forbidden-rule-options';
import { getForbiddenRuleErrorMessage } from './utils/forbidden-rule-error-message';
import RuleContext = Rule.RuleContext;

export function forbiddenRuleAngularTemplateParser(context: RuleContext): Rule.RuleListener {
    return {
        'Element$1 > TextAttribute[name="class"]': (classTextAttribute: any) => {
            const classes = GetClassesWithMetadata.fromAngularTemplateParser(classTextAttribute);
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
