import { Rule } from 'eslint';
import { getPreferRuleOptions } from './utils/get-prefer-rule-options';
import { GetClassesWithMetadata } from '../../utils/get-classes-with-metadata';
import { ClassWithMetadata } from '../order/types/class-with-metadata';
import { classMatchesListAndCaptureGroupByRegex } from './utils/class-matches-list-and-capture-group';
import { ClassWithMetadataAndMatches } from './types/class-with-metadata-and-matches';
import { getPreferRuleErrorMessage } from './utils/prefer-rule-error-message';
import { getCaptureGroupsValueByName } from './utils/get-capture-groups-value-by-name';
import RuleContext = Rule.RuleContext;

function enrichClassesWithRegexMatchMetadata(classes: ClassWithMetadata[], regexs: string[]): ClassWithMetadataAndMatches[] {
    return classes.map((classWithMetadata) => {
        const classMatchesList = classMatchesListAndCaptureGroupByRegex(classWithMetadata.name, regexs);
        return {
            ...classWithMetadata,
            matchMetadata: classMatchesList,
        };
    });
}

export function preferRuleAngularTemplateParser(context: RuleContext): Rule.RuleListener {
    return {
        'Element$1 > TextAttribute[name="class"]': (classTextAttribute: any) => {
            const options = getPreferRuleOptions(context);

            const classes = GetClassesWithMetadata.fromAngularTemplateParser(classTextAttribute);

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
                    node: classTextAttribute,
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
