import { useQuery } from "@tanstack/react-query";
import { OrganizationKeys } from "../config";
import { IOrganizationListFilters } from "../types";
import { getCathegorieId } from "../services/get";

export const useGetCethegoryList = (id: string) => useQuery({
    queryKey: [OrganizationKeys.ORGANIZATIONS, id],
    queryFn: () => getCathegorieId(id),
    enabled: true
})