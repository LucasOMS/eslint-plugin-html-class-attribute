import { OrderRuleOptions } from '../types/order-rule-options';

/**
 * Get the rank of the regex in the order array, max rank if not found
 * @param {string} klass to check
 * @param {OrderRuleOptions['order']} order of classes defined in the rule
 * @returns {number} rank of the regex in the order array, 0 has the highest priority in order
 */
export function getRegexOrderRank(klass: string, order: OrderRuleOptions['order']): number {
    const res = order.findIndex((regex) => new RegExp(regex).test(klass));
    return res === -1 ? order.length : res;
}
