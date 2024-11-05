import { IOrganization, ICathegory } from "../model"

export interface IOrganizationListFilters {
    my?: boolean
}

export interface IOrganizationListResponse {
    data: IOrganization[];
    hasNextPage: boolean;
}

export interface ICreateOrganizationResponse {
    id: string;
}

export interface ICathegoryListResponse {
    data: ICathegory[] | any;
}