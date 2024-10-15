import axios from 'axios';
import { OrganizationEndpoints } from "../config";
import { IOrganizationFormData } from '../../model/form-types';  // Общий тип для всех форм

export const updateOrganization = async (id: string, data: Partial<IOrganizationFormData>) => {
    try {
        const response = await axios.patch(`${OrganizationEndpoints.ORGANIZATIONS}/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update organization');
    }
}
