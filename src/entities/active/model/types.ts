
interface IActiveBaseData {
    id: number;
    cathegory: string;
    organizationId: string;
    activeName: string;
    headline: string;
    description: string;
    tags: string[];
    minContribution: number;
    purposeCollection: number;
    endingDate: string;
    documentIds: string[];
    nftId: string;
    galeryImagesIds: string;
}



interface ActiveResponseType {
    data: IActiveBaseData[];
    hasNextPage: boolean;
}
export type {
    IActiveBaseData,
    ActiveResponseType
}