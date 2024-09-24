import { ClassWithMetadataAndMatches } from '../types/class-with-metadata-and-matches';

export function getCaptureGroupsValueByName(
    matchedClasses: ClassWithMetadataAndMatches[],
): Record<string, string> {
    const res: Record<string, string> = {};
    matchedClasses.forEach((matchedClass) => {
        Object.keys(matchedClass.matchMetadata).forEach((regex) => {
            const captureGroups = matchedClass.matchMetadata[regex].captureGroups;
            if (captureGroups) {
                Object.keys(captureGroups).forEach((captureGroupName) => {
                    res[captureGroupName] = captureGroups[captureGroupName];
                });
            }
        });
    });
    return res;
}
