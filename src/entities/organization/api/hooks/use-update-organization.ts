import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrganizationKeys } from "../config";
import { updateOrganization } from "../services/patch";
import { IOrganizationFormData } from "../../model/form-types";

export const useUpdateOrganization = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { id: string, organizationData: Partial<IOrganizationFormData> }) =>
            updateOrganization(data.id, data.organizationData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [OrganizationKeys.ORGANIZATIONS],
            });
        },
        onError: (error) => {
            console.error('Failed to update organization', error);
        }
    });
};
