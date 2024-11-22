import axios from 'axios';
import { ActivesEndpoints } from "../config";
import { protectedAPI } from '@/shared/api';
import { ActiveSchema, ActiveSchema2 } from '../../model/form-types';

export const EditActive = async (data: ActiveSchema2, uuid: string) => {
    try {
        const response = await protectedAPI.patch(`${ActivesEndpoints.ACTIVES}/${uuid}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}