import { IActiveBaseData } from "../model"

export interface IActiveListFilters {
    id: number;
}

export interface IActiveListResponse {
    data: IActiveBaseData[];
    hasNextPage: boolean;
}

export interface ICreatActiveResponse {
    id: string;
}

export interface ICollectListFilters {
    id: number;
}