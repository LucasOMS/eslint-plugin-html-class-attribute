import { AST } from 'eslint';
import SourceLocation = AST.SourceLocation;

export interface ClassWithMetadata {
    name: string;
    range: [number, number];
    loc: SourceLocation;
}
