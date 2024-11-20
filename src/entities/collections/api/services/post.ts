import axios from 'axios';
import { CollectionsEndpoints } from "../config";
import { protectedAPI } from '@/shared/api';
import { CollectionsSchemaType } from '../../model/form-types';

export const createCollection = async (data: CollectionsSchemaType) => {
    try {
        const response = await protectedAPI.post(`${CollectionsEndpoints.COLLECTIONS}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}