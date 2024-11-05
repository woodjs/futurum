import axios from 'axios';
import { ActiveResponseType, IActiveBaseData, ICollectBaseData } from '../../model';
import { protectedAPI } from '@/shared/api';
import { ActivesEndpoints, CollectEndpoints } from '../config';
import { IActiveListFilters, IActiveListResponse, ICollectListFilters } from "../types";


export const getActivesListFilter = async (filters: IActiveListFilters): Promise<IActiveListResponse> => {
    try {
        const response = await protectedAPI.get<IActiveListResponse>(ActivesEndpoints.ACTIVES, {
            params: filters,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization list');
    }
}
export const getActivesList = async (): Promise<IActiveListResponse> => {
    try {
        const response = await protectedAPI.get<IActiveListResponse>(ActivesEndpoints.ACTIVES, {

        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization list');
    }
}

export const getActives = async (id: string) => {
    try {
        const response = await protectedAPI.get<IActiveBaseData>(`${ActivesEndpoints.ACTIVES}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization');
    }
}

export const getCollect = async () => {
    try {
        const response = await protectedAPI.get<ActiveResponseType>(`${CollectEndpoints.COLLECT}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization');
    }
}

export const getActiveById = async (id: string) => {
    try {
        console.log("ДОЛГОЖДАННЫЙ ЗАПРОС")

        const response = await protectedAPI.get<IActiveBaseData>(`${ActivesEndpoints.ACTIVES}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization');
    }
}