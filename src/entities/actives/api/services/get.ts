import axios from 'axios';
import { ActivesEndpoints } from "../config";
import { protectedAPI } from '@/shared/api';
import { IActivesListGetFilters } from '../types';
import { IActiveByIdResponse, IActiveListResponse, IActiveResponse2, IActiveResponseById2, IActiveResponseDN2 } from '../../model/types';

export const getActivesList = async (filters: IActivesListGetFilters): Promise<IActiveResponseDN2> => {
    try {
        const response = await protectedAPI.get<IActiveResponseDN2>(ActivesEndpoints.ACTIVES, {
            params: filters,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization list');
    }
}

export const getActiveById = async (id: string) => {
    try {
        const response = await protectedAPI.get<IActiveResponseById2>(`${ActivesEndpoints.ACTIVES}/${id}`)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization');
    }
}