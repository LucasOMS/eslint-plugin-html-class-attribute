import { RuleTester } from 'eslint';

import rule from './order.rule';
import { valid } from './tests/valid';
import { invalid } from './tests/invalid';

describe('@angular-eslint/template-parser', () => {
    const testWithAngularTemplateParser = new RuleTester({
        parser: require.resolve('@angular-eslint/template-parser'),
    });

    testWithAngularTemplateParser.run('html-class-attribute/order with LF', rule, {
        valid,
        invalid,
    });
});

describe('@html-eslint/parser', () => {
    const testWithHtmlParser = new RuleTester({
        parser: require.resolve('@html-eslint/parser'),
    });

    testWithHtmlParser.run('html-attributes-order/order with LF', rule, {
        valid,
        invalid,
    });
});
