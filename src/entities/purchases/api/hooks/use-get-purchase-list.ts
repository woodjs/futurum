import { PurchaseQueryKeys } from "../config";
import { getPurchaseList } from "../services/get";
import { IPurchaseItem, IPurchaseParams } from "../types";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useGetPurchaseList = <TData = IPurchaseItem[]>(
    params?: IPurchaseParams,
    props?: UseQueryOptions<IPurchaseItem[], unknown, TData>
): UseQueryResult<TData, unknown> =>
    useQuery({
        queryKey: [PurchaseQueryKeys.PURCHASE],
        queryFn: () => getPurchaseList(params),
        ...props
    });
