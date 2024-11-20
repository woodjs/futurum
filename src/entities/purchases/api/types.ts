import { INft } from "@/shared/api/types"

export enum PurchaseStatusFilter {
    ALL = 'ALL',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
}

export interface IPurchaseParams {
    category?: string
    fromDate?: string
    toDate?: string
    fromPrice?: number
    toPrice?: number
}

export interface IPurchaseItem extends INft {
    purchaseDate: Date;
}
