export function applyCaptureGroups(preferClasses: string, allCaptureGroups: {
    [captureGroupName: string]: string
}): string {
    let res = preferClasses;
    for (const [captureGroupName, captureGroupValue] of Object.entries(allCaptureGroups)) {
        // First regex part is for named capture group, second is for unnamed capture group (eg $1)
        res = res.replace(new RegExp(`(\\$<${captureGroupName}>|\\$${captureGroupName})`, 'g'), captureGroupValue);
    }
    return res;
}
