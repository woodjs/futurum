export interface ICollection{
    id: string;
    name: string;
    color: string;
}
export interface ICollectionListResponse{
    data: ICollection[];
    hasNextPage: boolean;
}