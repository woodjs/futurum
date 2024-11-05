import { useQuery } from "@tanstack/react-query";
import { ActivesKeys, CollectKeys } from "../config";
import { IActiveListFilters, ICollectListFilters } from "../types";
import { getActives, getActivesList, getCollect } from "../services/get";

export const useGetActivesListFilterId = (filters: IActiveListFilters) => useQuery({
    queryKey: [ActivesKeys.ACTIVES, filters],
    queryFn: () => getActivesList(),
    enabled: true
});

export const useGetActivesList = () => useQuery({
    queryKey: [ActivesKeys.ACTIVES],
    queryFn: () => getActivesList(),
    enabled: true
});

export const useGetCollectList = () => useQuery({
    queryKey: [CollectKeys.COLLECT ],
    queryFn: () => getCollect(),
    enabled: true
});