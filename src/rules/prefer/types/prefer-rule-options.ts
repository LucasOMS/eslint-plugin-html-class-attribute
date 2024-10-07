export interface PreferClass {
    /**
     * The class list to find as a regex, can have multiple classes split by space.
     * You can use NAMED capture group to be used in prefer property for substitution.
     */
    classList: string[];
    prefer: string;
}

export type PreferRuleOptions = PreferClass[];
