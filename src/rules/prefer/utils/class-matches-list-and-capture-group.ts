import {
    ClassMatchesListWithCaptureGroups,
    IsMatchWithCaptureGroup,
} from '../types/class-matches-list-with-capture-groups';
import { ClassWithMetadataAndMatches } from '../types/class-with-metadata-and-matches';

function classMatchesListAndCaptureGroup(
    className: string,
    couldMatch: string,
): IsMatchWithCaptureGroup {
    const regex = new RegExp(couldMatch);
    const matches = className.match(regex);

    return {
        matches: !!matches,
        captureGroups: matches?.groups,
    };
}

export function classMatchesListAndCaptureGroupByRegex(
    className: string,
    couldMatch: string[],
): ClassMatchesListWithCaptureGroups {
    if (className.includes(' ')) {
        throw new Error('className should not contain spaces');
    }
    const res: ClassMatchesListWithCaptureGroups = {};
    for (const regex of couldMatch) {
        res[regex] = classMatchesListAndCaptureGroup(className, regex);
    }
    return res;
}

/**
 * @returns {boolean} true if there is capture groups with different values
 */
export function captureGroupsHaveValueConflict(
    classesWithMatches: ClassWithMetadataAndMatches[],
): boolean {
    const captureGroups: { [groupName: string]: any } = {};
    for (const classWithMatch of classesWithMatches) {
        for (const matchMetadata of Object.values(classWithMatch.matchMetadata)) {
            if (matchMetadata.captureGroups) {
                for (const [key, value] of Object.entries(matchMetadata.captureGroups)) {
                    if (key in captureGroups
                        && captureGroups[key] !== value) {
                        return true;
                    }
                    captureGroups[key] = value;
                }
            }
        }
    }
    return false;
}
