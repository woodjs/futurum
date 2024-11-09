import { useQuery } from "@tanstack/react-query";
import { ActivesKeys } from "../config";
import { getActiveById } from "../services/get";
import { IActiveByIdResponse } from "../../model/types";


export const useGetActiveById = (id: string) => useQuery({
    queryKey: [ActivesKeys.ACTIVES, id],
    queryFn: () => getActiveById(id),
    enabled: !!id,
    
});
