import axios from 'axios';
import { OrganizationEndpoints } from "../config";
import { IOrganizationFormData } from '../../model';
import { protectedAPI } from '@/shared/api';

export const createOrganization = async (data: IOrganizationFormData) => {
    try {
        const response = await protectedAPI.post(`${OrganizationEndpoints.ORGANIZATIONS}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update organization');
    }
}
