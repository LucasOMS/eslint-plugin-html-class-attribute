import { Rule } from 'eslint';
import { getPreferRuleOptions } from './utils/get-prefer-rule-options';
import { GetClassesWithMetadata } from '../../utils/get-classes-with-metadata';
import { getPreferRuleErrorMessage } from './utils/prefer-rule-error-message';
import { getCaptureGroupsValueByName } from './utils/get-capture-groups-value-by-name';
import { enrichClassesWithRegexMatchMetadata } from './utils/enrich-classes-with-regex-match-metadata';
import { applyPreferRule } from './utils/apply-prefer-rule';
import { PreferClass } from './types/prefer-rule-options';
import RuleContext = Rule.RuleContext;

function fixPreferRule(
    rangeToReplace: [number, number],
    classes: string[],
    preferClasses: PreferClass[],
) {
    return (fixer: Rule.RuleFixer): Rule.Fix | null => {
        const newClasses = applyPreferRule(classes, preferClasses);
        return fixer.replaceTextRange(rangeToReplace, newClasses);
    };
}

export function preferRuleAngularTemplateParser(context: RuleContext): Rule.RuleListener {
    return {
        'Element$1 > TextAttribute[name="class"]': (classTextAttribute: any) => {
            const preferRuleOptions = getPreferRuleOptions(context);

            // Remove parent to avoid circular JSON when defining fixer
            delete classTextAttribute.parent;

            const classes = GetClassesWithMetadata.fromAngularTemplateParser(classTextAttribute);

            const classValueRange: [number, number] = [
                classTextAttribute.valueSpan.start.offset,
                classTextAttribute.valueSpan.end.offset,
            ];

            for (const preferGroup of preferRuleOptions) {
                const testAll = preferGroup.classList;

                const classesWithMatches = enrichClassesWithRegexMatchMetadata(classes, testAll);

                // For whole list
                const matchedAll = preferGroup.classList.every((searchClass) => {
                    // I want AT LEAST
                    return classesWithMatches.some((classWithMatches) => {
                        // that a class in HTML attribute matches
                        return classWithMatches.matchMetadata[searchClass].matches;
                    });
                });
                if (!matchedAll) {
                    continue;
                }

                // Keep regex that matched and keep capture groups
                const matchedClasses = classesWithMatches
                    .filter((classWithMatches) => {
                        return preferGroup.classList.some((searchClass) => {
                            return classWithMatches.matchMetadata[searchClass].matches;
                        });
                    });

                const classesToReplace = matchedClasses.map((c) => c.name);

                console.log(classTextAttribute);

                context.report({
                    node: classTextAttribute,
                    // Highlight class value instead of class attribute
                    loc: {
                        start: {
                            // Angular template parser has 0-based line
                            line: classTextAttribute.valueSpan.start.line + 1,
                            column: classTextAttribute.valueSpan.start.col,
                        },
                        end: {
                            // Angular template parser has 0-based line
                            line: classTextAttribute.valueSpan.end.line + 1,
                            column: classTextAttribute.valueSpan.end.col,
                        },
                    },
                    fix: fixPreferRule(
                        classValueRange,
                        classes.map((c) => c.name),
                        preferRuleOptions,
                    ),
                    message: getPreferRuleErrorMessage(
                        classesToReplace,
                        preferGroup.prefer,
                        getCaptureGroupsValueByName(matchedClasses),
                    ),
                });
                return;
            }
        },
    };
}
