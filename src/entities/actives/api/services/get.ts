import axios from 'axios';
import { ActivesEndpoints } from "../config";
import { protectedAPI } from '@/shared/api';
import { IActivesListGetFilters } from '../types';
import { IActiveByIdResponse, IActiveListResponse } from '../../model/types';

export const getActivesList = async (filters: IActivesListGetFilters): Promise<IActiveListResponse> => {
    try {
        const response = await protectedAPI.get<IActiveListResponse>(ActivesEndpoints.ACTIVES, {
            params: filters,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization list');
    }
}

export const getActiveById = async (id: string) => {
    try {
        const response = await protectedAPI.get<IActiveByIdResponse>(`${ActivesEndpoints.ACTIVES}/${id}`)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization');
    }
}