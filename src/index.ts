import classesOrder from './rules/order/order.rule';
import forbiddenClasses from './rules/forbidden/forbidden.rule';
import preferClasses from './rules/prefer/prefer.rule';
import recommended from './configs/recommended';

// Export our ESLint rules
export = {
    rules: {
        'order': classesOrder,
        'forbidden': forbiddenClasses,
        'prefer': preferClasses,
    },
    configs: {
        recommended: recommended,
    },
};

// TODO list; high number is high priority from 1 to 5
// === Prefer rule
// - [2] consider adding rule for NO match (prefer X if there is A and B class but not C)
//
// === no-duplicate rule
// - [4] Implement no-duplicate rule
//       Rule should only throw error if there are duplicates in the same class attribute
//       One boolean to true/false to check exact duplication
//       List of regex that should not match more than once in the class list
// - [2] Consider having same mechanic than in prefer rule with capture group to match only if match, for example m-(?<screenSize)-\\d+ could appear multiple times but only if screenSize is NOT the same
//
//
//
// For eslint 9, create utilities to create configurations for common purposes (e.g. bootstrap utilities configuration for most common utilities)
