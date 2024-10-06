import { OrderRuleOptions } from '../types/order-rule-options';

export type RegexRanks = {
    group: number,
    order: number
}

/**
 * Get the rank of the regex in the order array, max rank if not found
 * @param {string} klass to check
 * @param {OrderRuleOptions} groupsAndOrder to check against
 * @returns {group: number, order: number} rank of the regex for group and order
 */
export function getRegexOrderRank(klass: string, groupsAndOrder: Pick<OrderRuleOptions, 'groups' | 'order'>): RegexRanks {
    const groupRank = groupsAndOrder.groups.findIndex((groupNamedRegex) => new RegExp(groupNamedRegex.regex).test(klass));
    const orderRank = groupsAndOrder.order.findIndex((orderNamedRegex) => new RegExp(orderNamedRegex.regex).test(klass));
    return {
        group: groupRank === -1 ? groupsAndOrder.groups.length : groupRank,
        order: orderRank === -1 ? groupsAndOrder.order.length : orderRank,
    };
}
