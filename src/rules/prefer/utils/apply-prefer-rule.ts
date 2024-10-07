import { PreferClass } from '../types/prefer-rule-options';
import { applyCaptureGroups } from './apply-capture-group';

export function applyPreferRule(
    allClasses: string[],
    preferGroups: PreferClass[],
): string {
    let res = allClasses.join(' ');

    for (const preferGroup of preferGroups) {
        res = applyOnePreferClass(res.split(' '), preferGroup);
    }

    return res;
}

function applyOnePreferClass(
    allClasses: string[],
    preferGroup: PreferClass,
): string {
    // If not all classes are matched, do nothing
    if (!preferGroup.classList.every((classRegex) => allClasses.some(klass => new RegExp(classRegex).test(klass)))) {
        return allClasses.join(' ');
    }

    const classesInClassList = allClasses
        .filter((klass) => preferGroup.classList.some(classRegex => new RegExp(classRegex).test(klass)));

    // Foreach class in the classList, apply regex to keep capture groups
    let allCaptureGroups: { [captureGroupName: string]: string } = {};
    for (const klass of classesInClassList) {
        for (const classRegex of preferGroup.classList) {
            const matches = klass.match(new RegExp(classRegex));
            if (matches?.groups) {
                Object.assign(allCaptureGroups, matches.groups);
            }
        }
    }

    // Keep classes that are not in the classList
    const classesToKeep = allClasses
        // Filter out classes that are in the classList
        .filter((klass) => preferGroup.classList
            // And that matched at least one class in the classList
            .every((classRegex) => !new RegExp(classRegex).test(klass)));

    // On all class list, apply capture groups for complex replacement
    const newClasses = applyCaptureGroups(preferGroup.prefer, allCaptureGroups);

    return [
        newClasses,
        ...classesToKeep,
    ]
        .filter((klass) => klass.trim() !== '')
        .join(' ');
}
