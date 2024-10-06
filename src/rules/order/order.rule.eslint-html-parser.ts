import { Rule } from 'eslint';
import { getOrderRuleOptions } from './utils/get-order-rule-options';
import { getRegexOrderRank, RegexRanks } from './utils/get-regex-order-rank';
import {
    alphabeticalErrorMessage,
    groupOrderErrorMessage,
    regexOrderErrorMessage,
} from './utils/order-rule-error-messages';
import { ClassWithMetadata } from './types/class-with-metadata';
import { OrderRuleOptions } from './types/order-rule-options';
import { reorderClasses } from './utils/reorder-classes';
import { GetClassesWithMetadata } from '../../utils/get-classes-with-metadata';
import RuleContext = Rule.RuleContext;

function fixClassesOrder(
    rangeToReplace: [number, number],
    options: OrderRuleOptions,
    classes: ClassWithMetadata[],
) {
    return (fixer: Rule.RuleFixer): Rule.Fix => {
        const classesInOrder = reorderClasses(classes, options);

        return fixer.replaceTextRange(rangeToReplace, classesInOrder);
    };
}

export function orderRuleEslintHtmlParser(context: RuleContext): Rule.RuleListener {
    return {
        'Tag Attribute:has(AttributeKey[value="class"]) AttributeValue': (classAttributeValue: any) => {
            const classes = GetClassesWithMetadata.fromEslintHtmlParser(classAttributeValue);
            const options = getOrderRuleOptions(context);

            if (classes.length < 2) {
                return;
            }

            let previousClass = classes[0];
            let previousClassName = classes[0].name;
            let previousClassRegexRanks: RegexRanks = getRegexOrderRank(previousClass.name, options);

            for (const klass of classes.slice(1)) {
                const currentClassName = klass.name;

                // Compute rank for each attribute based on the order option
                let classRanks = getRegexOrderRank(currentClassName, options);

                // IF groups are in wrong order
                if (previousClassRegexRanks.group > classRanks.group) {
                    context.report({
                        message: groupOrderErrorMessage(
                            currentClassName,
                            options.groups[classRanks.group],
                            previousClassName,
                            options.groups[previousClassRegexRanks.group],
                        ),
                        node: classAttributeValue,
                        fix: fixClassesOrder(classAttributeValue.range, options, classes),
                        loc: klass.loc,
                    });
                    return;
                }

                // If groups are the same, we chack for the order from regexes
                if (previousClassRegexRanks.group === classRanks.group && previousClassRegexRanks.order > classRanks.order) {
                    context.report({
                        message: regexOrderErrorMessage(
                            currentClassName,
                            options.order[classRanks.order],
                            previousClassName,
                            options.order[previousClassRegexRanks.order],
                        ),
                        node: classAttributeValue,
                        fix: fixClassesOrder(classAttributeValue.range, options, classes),
                        loc: klass.loc,
                    });
                    return;
                }

                // If we have same group and order, we sort by alphabetical order if enabled
                if (options.alphabetical
                    && previousClassRegexRanks.group === classRanks.group
                    && previousClassRegexRanks.order === classRanks.order) {
                    // Compare current attribute with previous attribute
                    if (previousClassName.localeCompare(currentClassName) === 1) {
                        context.report({
                            message: alphabeticalErrorMessage(
                                previousClassName,
                                currentClassName,
                                options.order.length > 0,
                                options.order[classRanks.order],
                            ),
                            node: classAttributeValue,
                            fix: fixClassesOrder(classAttributeValue.range, options, classes),
                            loc: klass.loc,
                        });
                        return;
                    }
                }

                previousClass = klass;
                previousClassName = currentClassName;
                previousClassRegexRanks = classRanks;
            }
        },
    };
}
