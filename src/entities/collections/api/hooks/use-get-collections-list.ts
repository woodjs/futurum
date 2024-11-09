import { useQuery } from "@tanstack/react-query";
import { CollectionsKeys } from "../config";
import { ICollectionsListGetFilters } from "../types";
import { getCollectionsList } from "../services/get";

export const useGetCollectionList = (filters: ICollectionsListGetFilters ) => useQuery({
    queryKey: [CollectionsKeys.COLLECTIONS, filters],
    queryFn: () => getCollectionsList(filters),
    enabled: true
})