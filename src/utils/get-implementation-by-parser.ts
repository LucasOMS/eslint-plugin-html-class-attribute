import { Rule } from 'eslint';
import RuleContext = Rule.RuleContext;

export function getImplementationByParser(context: RuleContext,
                                          angularTemplateParserImplem: (context: RuleContext) => any,
                                          htmlEslintImplem: (context: RuleContext) => any): Rule.RuleListener {

    // Check which parser is being used
    const parser =
        context.parserPath // ESLint 8 way to get it
        ?? context.languageOptions?.parser?.meta?.name; // ESLint 9 way to get it

    if (!parser) {
        throw new Error('Parser is undefined');
    }

    if (parser.includes('angular-eslint')) {       // @angular-eslint/template-parser
        return angularTemplateParserImplem(context);
    } else if (parser.includes('html-eslint')) {   // @html-eslint/parser
        return htmlEslintImplem(context);
    } else {
        throw new Error(`Unsupported parser, please use @angular-eslint/template-parser or @html-eslint/parser, current is ${parser}`);
    }
}
