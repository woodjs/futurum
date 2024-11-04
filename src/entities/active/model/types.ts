
interface IActiveBaseData {
    id: number;
    cathegory: string;
    organizationId: string;
    activeName: string;
    headline: string;
    description: string;
    tags: string[] | any;
    minContribution: number;
    purposeCollection: number;
    endingDate: string;
    documentIds: string[] | any;
    nftId: string;
    galeryImagesIds: string[] | any;
}

interface ICollectBaseData {
    id: number;
    name: string;
    color: string;
}

interface ICollectCreate {
    name: string;
    color: string;
}

interface ActiveResponseType {
    data: ICollectBaseData[];
    hasNextPage: boolean;
}

interface ICollectListFilters {
    data: ICollectBaseData[];
}
export type {
    IActiveBaseData,
    ActiveResponseType,
    ICollectBaseData,
    ICollectListFilters,
    ICollectCreate
}