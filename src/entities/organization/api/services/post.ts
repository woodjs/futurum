import axios from 'axios';
import { OrganizationEndpoints } from "../config";
import { IOrganization, IOrganizationFormData } from '../../model';
import { protectedAPI } from '@/shared/api';
import { ICreateOrganizationResponse } from '../types';

export const createOrganization = async (data: IOrganizationFormData): Promise<IOrganization> => {
    try {
        const response = await protectedAPI.post(`${OrganizationEndpoints.ORGANIZATIONS}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
