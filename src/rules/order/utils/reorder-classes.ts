import { OrderRuleOptions } from '../types/order-rule-options';
import { ClassWithMetadata } from '../types/class-with-metadata';
import { getRegexOrderRank } from './get-regex-order-rank';

export function reorderClasses(classes: ClassWithMetadata[], ruleOptions: OrderRuleOptions): string {
    return [...classes]
        .sort((classA, classB) => {
            const aRank = getRegexOrderRank(classA.name, ruleOptions.order);
            const bRank = getRegexOrderRank(classB.name, ruleOptions.order);


            if (ruleOptions.alphabetical && aRank === bRank) {
                return classA.name.localeCompare(classB.name);
            }

            return aRank - bRank;
        })
        .map((className: ClassWithMetadata) => {
            return className.name;
        })
        .join(' ');


}
