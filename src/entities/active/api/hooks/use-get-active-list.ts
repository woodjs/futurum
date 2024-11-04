import { useQuery } from "@tanstack/react-query";
import { ActivesKeys } from "../config";
import { IActiveListFilters, IActiveListResponse} from "../types";
import { getActivesList } from "../services/get";

export const useGetActivesList = (filters: IActiveListFilters) => useQuery<IActiveListResponse>({
    queryKey: [ActivesKeys.ACTIVES, filters],
    enabled: true
})