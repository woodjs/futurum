import { useQuery } from "@tanstack/react-query";
import { CollectionsKeys } from "../config";
import { ICollectionsListGetFilters } from "../types";
import { getCollectionsList } from "../services/get";

export const useGetCollectionList = (filters: ICollectionsListGetFilters ) => {
    const query =  useQuery({
        queryKey: [CollectionsKeys.COLLECTIONS, filters],
        queryFn: () => getCollectionsList(filters),
        enabled: true
    })

    return {
        ...query,
        refetch: query.refetch, 
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        isSuccess: query.isSuccess,
    };
}