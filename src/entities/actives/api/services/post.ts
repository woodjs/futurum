import axios from 'axios';
import { ActivesEndpoints } from "../config";
import { protectedAPI } from '@/shared/api';
import { ActiveSchema, ActiveSchema2 } from '../../model/form-types';

export const createActive = async (data: ActiveSchema2) => {
    try {
        const response = await protectedAPI.post(`${ActivesEndpoints.ACTIVES}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}