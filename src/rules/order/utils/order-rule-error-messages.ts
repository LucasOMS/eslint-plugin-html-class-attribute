export function alphabeticalErrorMessage(
    firstClass: string,
    secondClass: string,
    orderIsActive: boolean,
    matchedRegex: string | undefined,
): string {
    if (!orderIsActive) {
        return `Classes should be in alphabetical order. \`${secondClass}\` should come before \`${firstClass}\`.`;
    }

    const messageStart = `Classes with same order rank should be in alphabetical order. The class \`${secondClass}\` should come before \`${firstClass}\`.`;
    if (matchedRegex) {
        `${messageStart}\n\`${firstClass}\` and \`${secondClass}\` both match \`${matchedRegex}\``;
    }
    return `${messageStart}\n\`${firstClass}\` and \`${secondClass}\` didn't match any regex.`;
}

export function regexOrderErrorMessage(
    firstClass: string,
    firstClassRegexMatch: string | undefined,
    secondClass: string,
    secondClassRegexMatch: string | undefined,
): string {
    const messageStart = 'Classes should follow given regex orders.';
    return `${messageStart}\n\`${firstClass}\` with regex match \`${firstClassRegexMatch ?? 'NONE'}\` should come before \`${secondClass}\` with regex match \`${secondClassRegexMatch ?? 'NONE'}\`.`;
}
