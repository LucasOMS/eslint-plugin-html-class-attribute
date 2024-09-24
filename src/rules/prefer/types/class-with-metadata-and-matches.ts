import { ClassWithMetadata } from '../../order/types/class-with-metadata';
import { ClassMatchesListWithCaptureGroups } from './class-matches-list-with-capture-groups';

export type ClassWithMetadataAndMatches = ClassWithMetadata & {
    matchMetadata: ClassMatchesListWithCaptureGroups
}
