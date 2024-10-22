import axios from 'axios';
import { OrganizationEndpoints } from "../config";
import { IOrganizationListFilters, IOrganizationListResponse } from "../types";
import { IOrganization } from '../../model';

export const getOrganizationList = async (filters: IOrganizationListFilters): Promise<IOrganizationListResponse> => {
    try {
        const response = await axios.get<IOrganizationListResponse>(OrganizationEndpoints.ORGANIZATIONS, {
            params: filters,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization list');
    }
}

export const getOrganizationById = async (id: string) => {
    try {
        const response = await axios.get<IOrganization>(`${OrganizationEndpoints.ORGANIZATIONS}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization');
    }
}