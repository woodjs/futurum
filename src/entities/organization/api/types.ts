import { IOrganization } from "../model"

export interface IOrganizationListFilters {
    my?: boolean
}

export interface IOrganizationListResponse {
    organizationList: IOrganization[]
}
