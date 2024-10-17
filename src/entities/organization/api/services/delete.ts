import axios from 'axios';
import { OrganizationEndpoints } from "../config";

export const deleteOrganization = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${OrganizationEndpoints.ORGANIZATIONS}/${id}`);
    } catch (error) {
        throw new Error('Failed to delete organization');
    }
}
