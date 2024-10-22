'use client';
import { defineStepper, } from "@stepperize/react";
import { addressSchema, companyInfoSchema, contactInfoSchema, descriptionFormSchema, documentsFormSchema, employeesSchema, financialInfoSchema, startPageSchema } from "./schemas";
import { z } from "zod";


interface IOrganizationStep {
    id: string
    label: string
    description: string
    skip: boolean
    schema: z.AnyZodObject
}

const businessStepper = defineStepper<IOrganizationStep[]>(
    // { id: 'files', label: 'files', description: 'organization.form.stepper.businessStepper.files', skip: true, schema: documentsFormSchema },
    { id: 'company', label: 'organization.form.stepper.businessStepper.company', description: 'organization.form.stepper.businessStepper.company', skip: false, schema: companyInfoSchema },
    { id: 'address', label: 'organization.form.stepper.businessStepper.address', description: 'organization.form.stepper.businessStepper.address', skip: false, schema: addressSchema },
    { id: 'financial', label: 'organization.form.stepper.businessStepper.financial', description: 'organization.form.stepper.businessStepper.financial', skip: false, schema: financialInfoSchema },
    { id: 'description', label: 'organization.form.stepper.businessStepper.description', description: 'organization.form.stepper.businessStepper.description', skip: true, schema: descriptionFormSchema },
    { id: 'contact', label: 'organization.form.stepper.businessStepper.contact', description: 'organization.form.stepper.businessStepper.contact', skip: true, schema: contactInfoSchema },
    { id: 'employees', label: 'organization.form.stepper.businessStepper.employees', description: 'organization.form.stepper.businessStepper.employees', skip: true, schema: employeesSchema },
    { id: 'files', label: 'organization.form.stepper.businessStepper.files', description: 'organization.form.stepper.businessStepper.files', skip: false, schema: documentsFormSchema },
);

const charityStepper = defineStepper<IOrganizationStep[]>(
    { id: 'company', label: 'organization.form.stepper.charityStepper.company', description: 'organization.form.stepper.charityStepper.company', skip: false, schema: companyInfoSchema },
    { id: 'address', label: 'organization.form.stepper.charityStepper.address', description: 'organization.form.stepper.charityStepper.address', skip: false, schema: addressSchema },
    { id: 'description', label: 'organization.form.stepper.charityStepper.description', description: 'organization.form.stepper.charityStepper.description', skip: true, schema: descriptionFormSchema },
    { id: 'contact', label: 'organization.form.stepper.charityStepper.contact', description: 'organization.form.stepper.charityStepper.contact', skip: true, schema: contactInfoSchema },
    { id: 'employees', label: 'organization.form.stepper.charityStepper.employees', description: 'organization.form.stepper.charityStepper.employees', skip: true, schema: employeesSchema },
    { id: 'files', label: 'organization.form.stepper.charityStepper.files', description: 'organization.form.stepper.charityStepper.files', skip: false, schema: documentsFormSchema },
);

const startupStepper = defineStepper<IOrganizationStep[]>(
    { id: 'company', label: 'organization.form.stepper.startupStepper.company', description: 'organization.form.stepper.startupStepper.company', skip: false, schema: companyInfoSchema },
    { id: 'address', label: 'organization.form.stepper.startupStepper.address', description: 'organization.form.stepper.startupStepper.address', skip: false, schema: addressSchema },
    { id: 'startPage', label: 'organization.form.stepper.startupStepper.startPage', description: 'organization.form.stepper.startupStepper.startPage', skip: false, schema: startPageSchema },
    { id: 'description', label: 'organization.form.stepper.startupStepper.description', description: 'organization.form.stepper.startupStepper.description', skip: true, schema: descriptionFormSchema },
    { id: 'contact', label: 'organization.form.stepper.startupStepper.contact', description: 'organization.form.stepper.startupStepper.contact', skip: true, schema: contactInfoSchema },
    { id: 'employees', label: 'organization.form.stepper.startupStepper.employees', description: 'organization.form.stepper.startupStepper.employees', skip: true, schema: employeesSchema },
    { id: 'files', label: 'organization.form.stepper.startupStepper.files', description: 'organization.form.stepper.startupStepper.files', skip: false, schema: documentsFormSchema },
);

const mainStepper = defineStepper(
    { id: 'type', label: 'organization.form.stepper.mainStepper.typeSelection', description: 'organization.form.stepper.mainStepper.typeSelection' },
    { id: 'create', label: 'organization.form.stepper.mainStepper.create', description: 'organization.form.stepper.mainStepper.create' },
    { id: 'success', label: 'organization.form.stepper.mainStepper.success', description: 'organization.form.stepper.mainStepper.success' }
);



export { businessStepper, mainStepper, startupStepper, charityStepper, type IOrganizationStep }