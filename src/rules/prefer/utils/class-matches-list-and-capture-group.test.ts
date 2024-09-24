import { classMatchesListAndCaptureGroupByRegex } from './class-matches-list-and-capture-group';

describe('class matches regex list and capture group', () => {
    it('should return matches false when no regex matches', () => {
        const className = 'foo';
        const couldMatch = ['baz'];
        const result = classMatchesListAndCaptureGroupByRegex(className, couldMatch);
        expect(result).toEqual({ baz: { matches: false } });
    });
    it('should return object key foreach match to test', () => {
        const className = 'foo';
        const couldMatch = ['baz', 'bab'];
        const result = classMatchesListAndCaptureGroupByRegex(className, couldMatch);
        expect(result).toEqual({ baz: { matches: false }, bab: { matches: false } });
    });
    it('should return object key foreach match to test independent from each other', () => {
        const className = 'foo';
        const couldMatch = ['^fo', 'bab'];
        const result = classMatchesListAndCaptureGroupByRegex(className, couldMatch);
        expect(result).toEqual({ '^fo': { matches: true }, bab: { matches: false } });
    });
    it('should return matches true when regex matches', () => {
        const className = 'foo';
        const couldMatch = ['^foo$'];
        const result = classMatchesListAndCaptureGroupByRegex(className, couldMatch);
        expect(result).toEqual({ [couldMatch[0]]: { matches: true, captureGroups: undefined } });
    });
    it('should return matches true and capture group when regex matches with capture group', () => {
        const className = 'foo-10';
        const couldMatch = ['^foo-(?<foo>\\d+)'];
        const result = classMatchesListAndCaptureGroupByRegex(className, couldMatch);
        expect(result).toEqual({ [couldMatch[0]]: { matches: true, captureGroups: { foo: '10' } } });
    });
    it('should return matches true and capture group when regex matches with multiple capture groups', () => {
        const className = 'foo-5-8';
        const couldMatch = ['^foo-(?<foo>\\d+)-(?<bar>\\d+)'];
        const result = classMatchesListAndCaptureGroupByRegex(className, couldMatch);
        expect(result).toEqual({
            [couldMatch[0]]: {
                matches: true,
                captureGroups: { foo: '5', bar: '8' },
            },
        });
    });
});
