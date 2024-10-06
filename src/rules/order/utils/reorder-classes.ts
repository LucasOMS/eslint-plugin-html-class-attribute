import { OrderRuleOptions } from '../types/order-rule-options';
import { ClassWithMetadata } from '../types/class-with-metadata';
import { getRegexOrderRank } from './get-regex-order-rank';

export function reorderClasses(classes: ClassWithMetadata[], ruleOptions: OrderRuleOptions): string {
    return [...classes]
        .sort((classA, classB) => {
            const aRanks = getRegexOrderRank(classA.name, ruleOptions);
            const bRanks = getRegexOrderRank(classB.name, ruleOptions);


            if (ruleOptions.alphabetical && aRanks.group === bRanks.group && aRanks.order === bRanks.order) {
                return classA.name.localeCompare(classB.name);
            }

            if (aRanks.group !== bRanks.group) {
                return aRanks.group - bRanks.group;
            }

            return aRanks.order - bRanks.order;
        })
        .map((className: ClassWithMetadata) => {
            return className.name;
        })
        .join(' ');


}
