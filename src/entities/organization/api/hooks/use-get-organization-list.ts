import { useQuery } from "@tanstack/react-query";
import { OrganizationKeys } from "../config";
import { IOrganizationListFilters } from "../types";
import { getOrganizationList } from "../services/get";

export const useGetOrganizationList = (filters: IOrganizationListFilters) => useQuery({
    queryKey: [OrganizationKeys.ORGANIZATIONS, filters],
    queryFn: () => getOrganizationList(filters),
    enabled: true
})