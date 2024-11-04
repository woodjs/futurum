import { IActiveBaseData } from "../model"

export interface IActiveListFilters {
    my?: boolean
}

export interface IActiveListResponse {
    data: IActiveBaseData[];
    hasNextPage: boolean;
}

export interface ICreatActiveResponse {
    id: string;
}