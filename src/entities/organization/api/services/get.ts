import axios from 'axios';
import { CathegoryEndpoints, OrganizationEndpoints } from "../config";
import { ICathegoryListResponse, IOrganizationListFilters, IOrganizationListResponse } from "../types";
import { ICathegory, IOrganization } from '../../model';
import { protectedAPI } from '@/shared/api';

export const getOrganizationList = async (filters: IOrganizationListFilters): Promise<IOrganizationListResponse> => {
    try {
        const response = await protectedAPI.get<IOrganizationListResponse>(OrganizationEndpoints.ORGANIZATIONS, {
            params: filters,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization list');
    }
}

export const getOrganizationById = async (id: string) => {
    try {
        const response = await protectedAPI.get<IOrganization>(`${OrganizationEndpoints.ORGANIZATIONS}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization');
    }
}

export const getCathegorieId = async (id: string): Promise<ICathegory> => {
    try {
        const response = await protectedAPI.get<ICathegory>(`${CathegoryEndpoints.CATHEGORIES}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization list');
    }
}