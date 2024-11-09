import axios from 'axios';
import { protectedAPI } from '@/shared/api';
import { ICollectionsListGetFilters } from '../types';
import { ICollectionListResponse } from '../../model/types';
import { CollectionsEndpoints } from '../config';

export const getCollectionsList = async (filters: ICollectionsListGetFilters): Promise<ICollectionListResponse> => {
    try {
        const response = await protectedAPI.get<ICollectionListResponse>(CollectionsEndpoints.COLLECTIONS, {
            params: filters,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization list');
    }
}
