import { Rule } from 'eslint';
import { getOrderRuleOptions } from './utils/get-order-rule-options';
import { ClassWithMetadata } from './types/class-with-metadata';
import { getRegexOrderRank } from './utils/get-regex-order-rank';
import { alphabeticalErrorMessage, regexOrderErrorMessage } from './utils/order-rule-error-messages';
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

export function orderRuleAngularTemplateParser(context: RuleContext): Rule.RuleListener {
    return {
        'Element$1 > TextAttribute[name="class"]': (classTextAttribute: any) => {
            const classes = GetClassesWithMetadata.fromAngularTemplateParser(classTextAttribute);
            const options = getOrderRuleOptions(context);

            if (classes.length < 2) {
                return;
            }

            const classValueRange: [number, number] = [
                classTextAttribute.valueSpan.start.offset,
                classTextAttribute.valueSpan.end.offset,
            ];

            let previousClass = classes[0];
            let previousClassName = classes[0].name;
            let previousClassRegexRank: number = getRegexOrderRank(previousClass.name, options.order);

            for (const klass of classes.slice(1)) {
                const currentClassName = klass.name;

                // Compute rank for each attribute based on the order option
                let classRegexRank = getRegexOrderRank(currentClassName, options.order);

                if (previousClassRegexRank > classRegexRank) {
                    context.report({
                        message: regexOrderErrorMessage(
                            currentClassName,
                            options.order[classRegexRank],
                            previousClassName,
                            options.order[previousClassRegexRank],
                        ),
                        node: classTextAttribute,
                        fix: fixClassesOrder(classValueRange, options, classes),
                        loc: klass.loc,
                    });
                    return;
                }

                if (options.alphabetical && previousClassRegexRank === classRegexRank) {
                    // Compare current attribute with previous attribute
                    if (previousClassName.localeCompare(currentClassName) === 1) {
                        context.report({
                            message: alphabeticalErrorMessage(
                                previousClassName,
                                currentClassName,
                                options.order.length > 0,
                                options.order[classRegexRank],
                            ),
                            node: classTextAttribute,
                            fix: fixClassesOrder(classValueRange, options, classes),
                            loc: klass.loc,
                        });
                        return;
                    }
                }

                previousClass = klass;
                previousClassName = currentClassName;
                previousClassRegexRank = classRegexRank;
            }
        },
    };
}
