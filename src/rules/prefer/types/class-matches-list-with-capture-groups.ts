export interface IsMatchWithCaptureGroup {
    matches: boolean;
    captureGroups?: {
        [captureGroupName: string]: string;
    };
}

export interface ClassMatchesListWithCaptureGroups {
    [regex: string]: IsMatchWithCaptureGroup;
}
