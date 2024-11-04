import axios from 'axios';
import { IActiveBaseData } from '../../model';
import { protectedAPI } from '@/shared/api';
import { ActivesEndpoints } from '../config';
import { IActiveListFilters, IActiveListResponse } from "../types";


export const getActivesList = async (filters: IActiveListResponse): Promise<IActiveListResponse> => {
    try {
        const response = await protectedAPI.get<IActiveListResponse>(ActivesEndpoints.ACTIVES, {
            params: filters,
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