import { ClassWithMetadata } from '../rules/order/types/class-with-metadata';

export class GetClassesWithMetadata {
    static fromAngularTemplateParser(textAttribute: any): ClassWithMetadata[] {
        const classes = textAttribute.value.split(' ');
        const classStartPosition = textAttribute.valueSpan.start.offset;
        const classStartSourceLocation = textAttribute.valueSpan.start;

        return classes.map((className: string) => {
            const positionInClassList = textAttribute.value.indexOf(className);
            return {
                name: className,
                range: [
                    classStartPosition + positionInClassList,
                    classStartPosition + positionInClassList + className.length,
                ],
                // FIXME This assume class is in one line, consider multi-line class
                loc: {
                    start: {
                        line: classStartSourceLocation.line + 1, // Lines are 0-based
                        column: classStartSourceLocation.col + positionInClassList,
                    },
                    end: {
                        line: classStartSourceLocation.line + 1, // Lines are 0-based
                        column: classStartSourceLocation.col + positionInClassList + className.length,
                    },
                },
            };
        });
    }

    static fromEslintHtmlParser(classAttributeValue: any): ClassWithMetadata[] {
        const classes = classAttributeValue.value.split(' ');
        const classStartPosition = classAttributeValue.range[0];
        const classStartSourceLocation = classAttributeValue.loc.start;

        return classes.map((className: string) => {
            const positionInClassList = classAttributeValue.value.indexOf(className);
            return {
                name: className,
                range: [
                    classStartPosition + positionInClassList,
                    classStartPosition + positionInClassList + className.length,
                ],
                // FIXME This assume class is in one line, consider multi-line class
                loc: {
                    start: {
                        line: classStartSourceLocation.line, // Lines are 1-based
                        column: classStartSourceLocation.column + positionInClassList,
                    },
                    end: {
                        line: classStartSourceLocation.line, // Lines are 1-based
                        column: classStartSourceLocation.column + positionInClassList + className.length,
                    },
                },
            };
        });
    }
}
