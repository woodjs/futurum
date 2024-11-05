import { useQuery } from "@tanstack/react-query";
import { ActivesKeys } from "../config";
import { getActiveById } from "../services/get";

export const useGetAcitveById = (id: string) => useQuery({
    queryKey: [ActivesKeys.ACTIVES, id],
    queryFn: () => getActiveById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
});
