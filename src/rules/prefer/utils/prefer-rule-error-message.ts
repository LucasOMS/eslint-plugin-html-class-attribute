import { applyCaptureGroups } from './apply-capture-group';

export function getPreferRuleErrorMessage(
    classesToReplace: string[],
    replacement: string,
    captureGroupValueByName?: { [captureGroupName: string]: string },
): string {
    const replacePlural = classesToReplace.length > 1 ? 'es' : '';

    const replacementWithCaptureGroupsApplied = applyCaptureGroups(replacement, captureGroupValueByName ?? {});

    return `Class${replacePlural} \`${classesToReplace.join('\`, \`')}\` should be replaced with \`${replacementWithCaptureGroupsApplied}\``;
}
