import { z } from "zod";
import { addressSchema, companyInfoSchema, contactInfoSchema, descriptionFormSchema, documentsFormSchema, employeesSchema, financialInfoSchema, startPageSchema } from "@/entities/organization";
import { OrganizationType } from "@/entities/organization";

const businessStepperSchema = z.object({
    type: z.literal(OrganizationType.BUSINESS),
    company: companyInfoSchema,
    address: addressSchema,
    financial: financialInfoSchema,
    description: descriptionFormSchema.optional(),
    contact: contactInfoSchema.optional(),
    files: documentsFormSchema.optional(),
});

const charityStepperSchema = z.object({
    type: z.literal(OrganizationType.CHARITY),
    charity: companyInfoSchema,
    address: addressSchema,
    description: descriptionFormSchema.optional(),
    contact: contactInfoSchema.optional(),
    files: documentsFormSchema.optional(),
});

const startupStepperSchema = z.object({
    type: z.literal(OrganizationType.STARTUP),
    company: companyInfoSchema,
    address: addressSchema,
    startPage: startPageSchema,
    description: descriptionFormSchema.optional(),
    contact: contactInfoSchema.optional(),
    files: documentsFormSchema.optional(),
});


export interface IBusinessStepperData extends z.infer<typeof businessStepperSchema> { }

export interface ICharityStepperData extends z.infer<typeof charityStepperSchema> { }

export interface IStartupStepperData extends z.infer<typeof startupStepperSchema> { }
