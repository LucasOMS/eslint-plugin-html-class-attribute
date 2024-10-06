export type OrderRuleOptions = {
    alphabetical: boolean;
    order: OrderRuleNamedRegex[];
    groups: OrderRuleNamedRegex[];
}

export interface OrderRuleNamedRegex {
    name: string;
    regex: string;
}
