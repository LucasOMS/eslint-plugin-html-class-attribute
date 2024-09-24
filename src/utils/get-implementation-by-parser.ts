import { Rule } from 'eslint';
import RuleContext = Rule.RuleContext;

export function getImplementationByParser(context: RuleContext,
                                          angularTemplateParserImplem: (context: RuleContext) => any,
                                          htmlEslintImplem: (context: RuleContext) => any): Rule.RuleListener {

    const parser = context.parserPath ?? '';

    if (parser.includes('@angular-eslint')) {       // @angular-eslint/template-parser
        return angularTemplateParserImplem(context);
    } else if (parser.includes('@html-eslint')) {   // @html-eslint/parser
        return htmlEslintImplem(context);
    } else {
        // If the parser is not supported, return an empty object to avoid any errors, no rule will be applied
        return {};
    }
}
