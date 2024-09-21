import { PurchaseQueryKeys } from "../config";
import { getPurchaseItem } from "../services/get";
import { IPurchaseItem } from "../types";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useGetPurchaseItem = <TData = IPurchaseItem>(
    id: string,
    props?: UseQueryOptions<IPurchaseItem, unknown, TData>
): UseQueryResult<TData, unknown> =>
    useQuery({
        queryKey: [PurchaseQueryKeys.PURCHASE, id],
        queryFn: () => getPurchaseItem(id),
        ...props
    });
