import { useQuery } from "@tanstack/react-query";
import { OrganizationKeys } from "../config";
import { getOrganizationById } from "../services/get";
import { IOrganization } from "../../model";

export const useGetOrganizationById = <T = IOrganization>(id: string, select = (data: IOrganization) => data as T) => useQuery({
    queryKey: [OrganizationKeys.ORGANIZATIONS, id],
    queryFn: () => getOrganizationById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    select
});
