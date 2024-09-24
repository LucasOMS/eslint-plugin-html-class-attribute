import {
    ClassMatchesListWithCaptureGroups,
    IsMatchWithCaptureGroup,
} from '../types/class-matches-list-with-capture-groups';

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
