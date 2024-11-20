import { useQuery } from "@tanstack/react-query";
import { ActivesKeys } from "../config";
import { IActivesListGetFilters } from "../types";
import { getActivesList } from "../services/get";

export const useGetActivesList = (filters: IActivesListGetFilters) => useQuery({
    queryKey: [ActivesKeys.ACTIVES, filters],
    queryFn: () => getActivesList(filters),
    enabled: true
})