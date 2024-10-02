import classesOrder from './rules/order/order.rule';
import forbiddenClasses from './rules/order/order.rule';
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
// - [5] Implement prefer rule fixer for both parsers
// - [1] consider adding rule for NO match (prefer X if there is A and B class but not C)
//
// === Forbidden rule
// - [3] Add suggested fix for forbidden rule (define in eslintrc, only for message, not for actual fix)
//
// === Order rule
// - [4] Create "group" notion that will order classes before using regex (e.g. group "small device" that matches "*-sm-*" and then will consider base regex order)
//       Groups should be defined in order rule options
//       Groups should be optional
//       Groups can be named for better error message and easier understanding

// Note : when all [5] priority are done, consider releasing 1.0.0 version
