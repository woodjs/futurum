import axios from 'axios';
import { ActivesEndpoints, CollectEndpoints } from "../config";
import { IActiveBaseData, ICollectBaseData, ICollectCreate } from '../../model';
import { protectedAPI } from '@/shared/api';

export const createActive = async (data: IActiveBaseData): Promise<IActiveBaseData> => {
    try {
        const response = await protectedAPI.post(`${ActivesEndpoints.ACTIVES}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const createCollect = async (data: ICollectCreate): Promise<ICollectBaseData> => {
    try {
        const response = await protectedAPI.post(`${CollectEndpoints.COLLECT}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}