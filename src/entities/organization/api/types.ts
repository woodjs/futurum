import { IOrganization } from "../model"

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