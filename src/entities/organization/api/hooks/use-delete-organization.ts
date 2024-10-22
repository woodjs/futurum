import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrganizationKeys } from "../config";
import { deleteOrganization } from "../services/delete";

export const useDeleteOrganization = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteOrganization(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [OrganizationKeys.ORGANIZATIONS] });
        },
        onError: (error) => {
            console.error('Failed to delete organization', error);
        }
    });
};
