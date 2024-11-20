import axios from 'axios';
import { OrganizationEndpoints } from "../config";
import { protectedAPI } from '@/shared/api';

export const deleteOrganization = async (id: string): Promise<void> => {
    try {
        await protectedAPI.delete(`${OrganizationEndpoints.ORGANIZATIONS}/${id}`);
    } catch (error) {
        throw new Error('Failed to delete organization');
    }
}
