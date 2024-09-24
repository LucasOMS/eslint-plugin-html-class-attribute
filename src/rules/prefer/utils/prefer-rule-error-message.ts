export function getPreferRuleErrorMessage(
    classesToReplace: string[],
    replacement: string,
    captureGroupValueByName?: { [captureGroupName: string]: string },
): string {
    const replacePlural = classesToReplace.length > 1 ? 'es' : '';

    let replacementWithCaptureGroupsApplied = replacement;
    if (captureGroupValueByName) {
        for (const captureGroup of Object.keys(captureGroupValueByName)) {
            replacementWithCaptureGroupsApplied = replacementWithCaptureGroupsApplied.replace(`$<${captureGroup}>`, captureGroupValueByName[captureGroup]);
        }
    }
    return `Class${replacePlural} \`${classesToReplace.join('\`, \`')}\` should be replaced with \`${replacementWithCaptureGroupsApplied}\``;
}
