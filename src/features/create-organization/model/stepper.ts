import { defineStepper } from "@stepperize/react";
import { addressSchema, companyInfoSchema, contactInfoSchema, descriptionFormSchema, documentsFormSchema } from "./schemas";
import { Description } from "@radix-ui/react-dialog";


const { useStepper, steps } = defineStepper(
    { id: 'files', label: 'files', description: 'Загрузите документы', skip: true, schema: documentsFormSchema },
    { id: 'company', label: 'company', description: 'Заполните основную информацию о компании', skip: false, schema: companyInfoSchema },
    { id: 'address', label: 'address', description: 'Заполните адрес', skip: false, schema: addressSchema },
    { id: 'description', label: 'description', description: 'Заполните описание', skip: true, schema: descriptionFormSchema },
    { id: 'contact', label: 'contact', description: 'Заполните контактную информацию', skip: true, schema: contactInfoSchema },
);


export { useStepper, steps }