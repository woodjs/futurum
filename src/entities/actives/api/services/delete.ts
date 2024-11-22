import { ActivesEndpoints } from "../config";
import { protectedAPI } from '@/shared/api';

export const DeleteActive = async (uuid: string) => {
    try {
        const response = await protectedAPI.delete(`${ActivesEndpoints.ACTIVES}/${uuid}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}