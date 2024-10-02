import { Rule } from 'eslint';
import { getPreferRuleOptions } from './utils/get-prefer-rule-options';
import { GetClassesWithMetadata } from '../../utils/get-classes-with-metadata';
import { getPreferRuleErrorMessage } from './utils/prefer-rule-error-message';
import { getCaptureGroupsValueByName } from './utils/get-capture-groups-value-by-name';
import { enrichClassesWithRegexMatchMetadata } from './utils/enrich-classes-with-regex-match-metadata';
import RuleContext = Rule.RuleContext;

export function preferRuleEslintHtmlParser(context: RuleContext): Rule.RuleListener {
    return {
        'Tag Attribute:has(AttributeKey[value="class"]) AttributeValue': (classAttributeValue: any) => {

            const options = getPreferRuleOptions(context);

            const classes = GetClassesWithMetadata.fromEslintHtmlParser(classAttributeValue);

            for (const preferGroup of options) {
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

                context.report({
                    node: classAttributeValue,
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
