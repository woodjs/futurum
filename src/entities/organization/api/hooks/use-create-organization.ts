import { useMutation } from "@tanstack/react-query";
import { createOrganization } from "../services";
import { IOrganizationFormData } from "../../model";
import { organizationToFormData } from "../../lib";

export const useCreateOrganization = () => useMutation({
    mutationFn: (data: IOrganizationFormData) => {
        const formData = organizationToFormData(data)
        if (!formData) throw new Error('Организация не может быть создана');
        return createOrganization(formData);
    },
    onSuccess: (data) => {
        console.log('Организация создана', data);
    }
})