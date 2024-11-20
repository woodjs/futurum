import { z } from "zod";
import { addressSchema, companyInfoSchema, contactInfoSchema, descriptionFormSchema, documentsFormSchema, employeesSchema, financialInfoSchema, startPageSchema } from "./schemas";
import { OrganizationType } from "./organization-type";


const businessStepperSchema = z.object({
    type: z.literal(OrganizationType?.BUSINESS),
    company: companyInfoSchema,
    address: addressSchema,
    financial: financialInfoSchema,
    description: descriptionFormSchema.optional(),
    contact: contactInfoSchema.optional(),
    employees: employeesSchema.optional(),
    files: documentsFormSchema,
});

const charityStepperSchema = z.object({
    type: z.literal(OrganizationType?.CHARITY),
    company: companyInfoSchema,
    address: addressSchema,
    description: descriptionFormSchema.optional(),
    contact: contactInfoSchema.optional(),
    employees: employeesSchema.optional(),
    files: documentsFormSchema,
});

const startupStepperSchema = z.object({
    type: z.literal(OrganizationType?.STARTUP),
    company: companyInfoSchema,
    address: addressSchema,
    startPage: startPageSchema,
    description: descriptionFormSchema.optional(),
    contact: contactInfoSchema.optional(),
    employees: employeesSchema.optional(),
    files: documentsFormSchema,
});

export {
    businessStepperSchema,
    charityStepperSchema,
    startupStepperSchema
}

export interface IBusinessStepperData extends z.infer<typeof businessStepperSchema> { }

export interface ICharityStepperData extends z.infer<typeof charityStepperSchema> { }

export interface IStartupStepperData extends z.infer<typeof startupStepperSchema> { }

export type IOrganizationFormData = IBusinessStepperData | ICharityStepperData | IStartupStepperData
