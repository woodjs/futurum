import { validateAndConvertToFormData } from "@/shared/lib/convert-to-form-data";
import { businessStepperSchema, charityStepperSchema, IOrganizationFormData, OrganizationType, startupStepperSchema } from "../model";
import { z } from "zod";

const organizationToFormData = (data: IOrganizationFormData) => {
    const schema = data.type === OrganizationType.BUSINESS ? businessStepperSchema : data.type === OrganizationType.CHARITY ? charityStepperSchema : startupStepperSchema
    return (
        validateAndConvertToFormData(data, schema as z.ZodSchema<IOrganizationFormData>)
    );
}

export { organizationToFormData };