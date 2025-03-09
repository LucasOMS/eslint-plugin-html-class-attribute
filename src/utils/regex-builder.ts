export class RegexBuilder {
    private start?: string;
    private end?: string;
    private content?: string;
    // Error flags
    private isEqual = false;

    static createVariable(variableName: string, value: 'integer' | 'decimal' | 'word' | 'words' | string[]): string {
        switch (value) {
            case 'integer':
                return `(?<${variableName}>\\d+)`;
            case 'decimal':
                return `(?<${variableName}>\\d+(\\.\\d+)?)`;
            case 'word':
                return `(?<${variableName}>\\w)`;
            case 'words':
                return `(?<${variableName}>\\w+)`;
            default:
                if (Array.isArray(value)) {
                    const equalsOneOf = `(${value.map(escapeRegexCharacters).join('|')})`;
                    return `(?<${variableName}>${equalsOneOf})`;
                }
                return `(?<${variableName}>${value})`;
        }
    }

    static useVariable(variableName: string): string {
        return `$<${variableName}>`;
    }

    /**
     * Regex will be built to match if the text is present at the start
     *
     * @param {string | string[]} text to start with
     * @returns {RegexBuilder} current instance with the new start
     */
    public startsWith(text: string | string[]): RegexBuilder {
        this.throwErrorIfInEqualMode();
        if (this.start) {
            throw new Error('Cannot set start multiple times');
        }
        if (Array.isArray(text)) {
            this.start = `^(${text.map(escapeRegexCharacters).join('|')})`;
            return this;
        }
        this.start = `^${escapeRegexCharacters(text)}`;
        return this;
    }

    /**
     * Regex will be built to match if the text is not present at the start
     *
     * @param {string | string[]} text to not start with
     * @param {boolean} useWordBoundary add \b after the text
     * @returns {RegexBuilder} current instance with the new start
     */
    public doesntStartWith(text: string | string[], useWordBoundary = true): RegexBuilder {
        this.throwErrorIfInEqualMode();
        if (this.start) {
            throw new Error('Cannot set start multiple times');
        }
        if (Array.isArray(text)) {
            this.start = `^(?!${text.map(escapeRegexCharacters).map(addWordBoundary(useWordBoundary, 'end')).join('|')})`;
            return this;
        }
        this.start = `^(?!${escapeRegexCharacters(text)})`;
        return this;
    }

    /**
     * Regex will be built to match if the text is present at the end
     *
     * @param {string | string[]} text to end with
     * @returns {RegexBuilder} current instance with the new end
     */
    public endsWith(text: string | string[]): RegexBuilder {
        this.throwErrorIfInEqualMode();
        if (this.end) {
            throw new Error('Cannot set end multiple times');
        }
        if (Array.isArray(text)) {
            this.end = `(${text.map(escapeRegexCharacters).join('|')})$`;
            return this;
        }
        this.end = `${escapeRegexCharacters(text)}$`;
        return this;
    }

    /**
     * Regex will be built to match if the text is not present at the end
     *
     * @param {string | string[]} text to not end with
     * @param {boolean} useWordBoundary add \b before the text
     * @returns {RegexBuilder} current instance with the new end
     */
    public doesntEndWith(text: string | string[], useWordBoundary = true): RegexBuilder {
        this.throwErrorIfInEqualMode();
        if (this.end) {
            throw new Error('Cannot set end multiple times');
        }
        if (Array.isArray(text)) {
            this.end = `(?<!${text.map(escapeRegexCharacters).map(addWordBoundary(useWordBoundary, 'start')).join('|')})$`;
            return this;
        }
        this.end = `(?<!${escapeRegexCharacters(text)})$`;
        return this;
    }

    /**
     * Regex will be built to match if the text is present
     *
     * @param {string | string[]} text to contain
     * @returns {RegexBuilder} current instance with the new content
     */
    public contains(text: string | string[]): RegexBuilder {
        this.throwErrorIfInEqualMode();
        if (this.content) {
            throw new Error('Cannot set content multiple times');
        }
        if (Array.isArray(text)) {
            this.content = `.*(${text.map(escapeRegexCharacters).join('|')}).*`;
            return this;
        }
        this.content = `.*${escapeRegexCharacters(text)}.*`;
        return this;
    }

    /**
     * Regex will be built to match if the text is not present
     *
     * @param {string | string[]} text to not contain
     * @returns {RegexBuilder} current instance with the new content
     */
    doesntContain(text: string | string[]): RegexBuilder {
        this.throwErrorIfInEqualMode();
        if (this.content) {
            throw new Error('Cannot set content multiple times');
        }
        if (Array.isArray(text)) {
            this.content = `^(?!.*${text.map(escapeRegexCharacters).join('|')}).*$`;
            return this;
        }
        this.content = `^(?!.*${escapeRegexCharacters(text)}).*$`;
        return this;
    }

    /**
     * Regex will be built to match exactly one of the texts provided
     *
     * /!\ This will set the builder in a state where you cannot change anything anymore
     *
     * @param {string | string[]} text to match
     * @returns {RegexBuilder} current instance with the new content
     */
    public equals(text: string | string[]): RegexBuilder {
        if (this.content) {
            throw new Error('Cannot set content multiple times');
        }
        this.isEqual = true;
        if (Array.isArray(text)) {
            this.content = `^(${text.map(escapeRegexCharacters).join('|')})$`;
            return this;
        }

        this.content = `^${escapeRegexCharacters(text)}$`;
        return this;
    }

    /**
     * Allows to set the content of the regex with another regex,
     * this can be useful when you want to have a start and end but the content is a complex regex
     *
     * @param {RegexBuilder} regexContent to set as content
     * @returns {RegexBuilder} current instance with the new content
     */
    public hasRegexContent(regexContent: RegexBuilder): RegexBuilder {
        this.throwErrorIfInEqualMode();
        if (this.content) {
            throw new Error('Cannot set content multiple times');
        }
        this.content = regexContent.build();
        return this;
    }

    /**
     * Allows to chain multiple regex because is might be easier to build two regex separately
     *
     * @param {RegexBuilder} regexBuilder to chain with
     * @returns {RegexBuilder} current instance with the new content
     */
    public or(regexBuilder: RegexBuilder): RegexBuilder {
        if (!this.start && !this.content && !this.end) {
            throw new Error('Cannot use or without any content');
        }
        this.content = `(${this.build()}|${regexBuilder.build()})`;
        // After building the or, we reset the other values
        this.start = undefined;
        this.end = undefined;
        this.isEqual = false;
        return this;
    }

    /**
     * Builds the regex string
     *
     * @param {{forceStartAndEnd: boolean}} opts
     * @returns {string}
     */
    public build(opts?: { forceStartAndEnd: boolean }): string {
        if (!this.start && !this.content && !this.end) {
            throw new Error('Cannot build regex without any content');
        }

        if (this.content) {
            if (this.start) {
                this.content = removeStart(this.content);
            }
            if (this.end) {
                this.content = removeEnd(this.content);
            }
        } else {
            this.content = '.*';
        }

        if (opts?.forceStartAndEnd) {
            if (!this.start) {
                this.start = '^';
            }
            if (!this.end) {
                this.end = '$';
            }
            this.content = removeStart(removeEnd(this.content ?? ''));
        }

        return [this.start, this.content, this.end].filter(Boolean).join('');
    }

    private throwErrorIfInEqualMode(): void {
        if (this.isEqual) {
            throw new Error('Cannot change anything after setting equals');
        }
    }
}

function removeStart(text: string): string {
    return text.replace(/^\^/, '');
}

function removeEnd(text: string): string {
    return text.replace(/\$$/, '');
}

/**
 * Create a mapper to add word boundary to a word if needed
 *
 * @param {boolean} useWordBoundary
 * @param {'start' | 'end' | 'both'} position to add the word boundary
 * @returns {(word: string) => string}
 */
function addWordBoundary(useWordBoundary: boolean, position: 'start' | 'end' | 'both'): (word: string) => string {
    if (!useWordBoundary) {
        return (word: string) => word;
    }

    return (word: string) => {
        if (position === 'start') {
            return `\\b${word}`;
        }
        if (position === 'end') {
            return `${word}\\b`;
        }
        return `\\b${word}\\b`;
    };
}

/**
 * Escape special characters in a regex
 * @param {string} text to escape
 * @returns {string} escaped text
 */
function escapeRegexCharacters(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
