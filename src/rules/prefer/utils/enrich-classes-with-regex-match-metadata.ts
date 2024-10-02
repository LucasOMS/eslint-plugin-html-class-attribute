import { ClassWithMetadata } from '../../order/types/class-with-metadata';
import { ClassWithMetadataAndMatches } from '../types/class-with-metadata-and-matches';
import { classMatchesListAndCaptureGroupByRegex } from './class-matches-list-and-capture-group';

export function enrichClassesWithRegexMatchMetadata(classes: ClassWithMetadata[], regexs: string[]): ClassWithMetadataAndMatches[] {
    return classes.map((classWithMetadata) => {
        const classMatchesList = classMatchesListAndCaptureGroupByRegex(classWithMetadata.name, regexs);
        return {
            ...classWithMetadata,
            matchMetadata: classMatchesList,
        };
    });
}
