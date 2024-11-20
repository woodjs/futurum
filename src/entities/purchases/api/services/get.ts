import { IPurchaseItem, IPurchaseParams } from "../types"

export const getPurchaseList = async (params?: IPurchaseParams): Promise<IPurchaseItem[]> => []

export const getPurchaseItem = async (id: string): Promise<IPurchaseItem> => ({} as IPurchaseItem)