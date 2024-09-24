import { ForbiddenRuleOptions } from '../types/forbidden-rule-options';

export function getForbiddenRuleOptions(context: any): ForbiddenRuleOptions {
    return context.options ?? [];
}
