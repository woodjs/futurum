import { PurchaseStatusFilter } from '@/entities/purchases/api';
import { z } from 'zod';

const ZodStatusFilter = z.nativeEnum(PurchaseStatusFilter);

const PurchaseParamsSchema = z.object({
    category: z.string().optional(),
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
    fromPrice: z.number().optional(),
    toPrice: z.number().optional(),
    status: ZodStatusFilter.optional(),
});


export { PurchaseParamsSchema };