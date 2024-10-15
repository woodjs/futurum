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
    // { id: 'files', label: 'files', description: 'Загрузите документы', skip: true, schema: documentsFormSchema },
    { id: 'company', label: 'company', description: 'Заполните основную информацию о компании', skip: false, schema: companyInfoSchema },
    { id: 'address', label: 'address', description: 'Заполните адрес', skip: false, schema: addressSchema },
    { id: 'financial', label: 'financial', description: 'Заполните финансовую информацию', skip: false, schema: financialInfoSchema },
    { id: 'description', label: 'description', description: 'Заполните описание', skip: true, schema: descriptionFormSchema },
    { id: 'contact', label: 'contact', description: 'Заполните контактную информацию', skip: true, schema: contactInfoSchema },
    { id: 'employees', label: 'employees', description: 'Заполните информацию о сотрудниках', skip: true, schema: employeesSchema },
    { id: 'files', label: 'files', description: 'Загрузите документы', skip: true, schema: documentsFormSchema },
);

const charityStepper = defineStepper<IOrganizationStep[]>(
    { id: 'company', label: 'company', description: 'Заполните основную информацию о компании', skip: false, schema: companyInfoSchema },
    { id: 'address', label: 'address', description: 'Заполните адрес', skip: false, schema: addressSchema },
    { id: 'description', label: 'description', description: 'Заполните описание', skip: true, schema: descriptionFormSchema },
    { id: 'contact', label: 'contact', description: 'Заполните контактную информацию', skip: true, schema: contactInfoSchema },
    { id: 'employees', label: 'employees', description: 'Заполните информацию о сотрудниках', skip: true, schema: employeesSchema },
    { id: 'files', label: 'files', description: 'Загрузите документы', skip: true, schema: documentsFormSchema },
);

const startupStepper = defineStepper<IOrganizationStep[]>(
    { id: 'company', label: 'company', description: 'Заполните основную информацию о компании', skip: false, schema: companyInfoSchema },
    { id: 'address', label: 'address', description: 'Заполните адрес', skip: false, schema: addressSchema },
    { id: 'startPage', label: 'startPage', description: 'Заполните информацию по стартапу', skip: false, schema: startPageSchema },
    { id: 'description', label: 'description', description: 'Заполните описание', skip: true, schema: descriptionFormSchema },
    { id: 'contact', label: 'contact', description: 'Заполните контактную информацию', skip: true, schema: contactInfoSchema },
    { id: 'employees', label: 'employees', description: 'Заполните информацию о сотрудниках', skip: true, schema: employeesSchema },
    { id: 'files', label: 'files', description: 'Загрузите документы', skip: true, schema: documentsFormSchema },
);

const mainStepper = defineStepper(
    { id: 'type', label: 'type', description: 'Выберите тип организации', },
    { id: 'create', label: 'create', description: 'Создание организации', },
    { id: 'success', label: 'success', description: 'Организация создана', }
);



export { businessStepper, mainStepper, startupStepper, charityStepper, type IOrganizationStep }