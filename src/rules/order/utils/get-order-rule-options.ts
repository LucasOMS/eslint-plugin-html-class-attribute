import { OrderRuleOptions, OrderRuleNamedRegex } from '../types/order-rule-options';

export function getOrderRuleOptions(context: any): OrderRuleOptions {
    const res = {
        alphabetical: false,
        order: [],
        groups: [],
        ...(context.options[0] ?? {}),
    };

    return {
        ...res,
        order: res.order.map(regexOrNamedRegexToOrderRuleRegex),
    };
}

export function regexOrNamedRegexToOrderRuleRegex(item: string | OrderRuleNamedRegex): OrderRuleNamedRegex {
    if (typeof item === 'string') {
        return {
            name: item,
            regex: item,
        };
    }
    return item;
}
