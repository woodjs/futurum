import { useQuery } from "@tanstack/react-query";
import { ActivesKeys } from "../config";
import { IActivesListGetFilters } from "../types";
import { getActivesList } from "../services/get";

export const useGetActivesList = (filters: IActivesListGetFilters) => {
    const query = useQuery({
        queryKey: [ActivesKeys.ACTIVES, filters],
        queryFn: () => getActivesList(filters),
        enabled: true,
    });

    return {
        ...query,
        refetch: query.refetch, 
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        isSuccess: query.isSuccess,
    };
};