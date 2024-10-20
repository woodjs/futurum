import { useMutation } from "@tanstack/react-query";
import { createOrganization } from "../services";
import { IOrganizationFormData } from "../../model";
import { organizationToFormData } from "../../lib";

export const useCreateOrganization = () => useMutation({

    mutationFn: (data: IOrganizationFormData) => {
        return createOrganization(data);
    },
    onSuccess: (data) => {
        console.log('Организация создана', data);
    }
})