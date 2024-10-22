import { z } from "zod";

const companyInfoSchema = z.object({
    position: z.string({
        required_error: "organization.form.companyInfo.position.required",
    }).min(1, "organization.form.companyInfo.position.min"),
    companyName: z.string({
        required_error: "organization.form.companyInfo.companyName.required",
    }).min(3, "organization.form.companyInfo.companyName.min"),
    ownershipForm: z.string({
        required_error: "organization.form.companyInfo.ownershipForm.required",
    }).min(1, "organization.form.companyInfo.ownershipForm.min")
});

const addressSchema = z.object({
    address: z.string({
        required_error: "organization.form.address.address.required",
    }).min(1, "organization.form.address.address.min"),
    city: z.string({
        required_error: "organization.form.address.city.required",
    }).min(1, "organization.form.address.city.min"),
    country: z.string({
        required_error: "organization.form.address.country.required",
    }).min(1, "organization.form.address.country.min")
});

const phoneSchema = z.string().regex(
    /^(\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'organization.form.contactInfo.phone.invalid'
);

const contactInfoSchema = z.object({
    website: z.string().url({ message: 'organization.form.contactInfo.website.invalid' }).optional().nullable().or(z.literal('')),
    phone: phoneSchema.optional().nullable().or(z.literal('')),
    facebook: z.string().url({ message: 'organization.form.contactInfo.facebook.invalid' }).optional().nullable(),
    instagram: z.string().url({ message: 'organization.form.contactInfo.instagram.invalid' }).optional().nullable(),
    twitter: z.string().url({ message: 'organization.form.contactInfo.twitter.invalid' }).optional().nullable(),
    tiktok: z.string().url({ message: 'organization.form.contactInfo.tiktok.invalid' }).optional().nullable(),
    telegram: z.string().url({ message: 'organization.form.contactInfo.telegram.invalid' }).optional().nullable(),
    youtube: z.string().url({ message: 'organization.form.contactInfo.youtube.invalid' }).optional().nullable(),
    whatsapp: z.string().url({ message: 'organization.form.contactInfo.whatsapp.invalid' }).optional().nullable(),
    vk: z.string().url({ message: 'organization.form.contactInfo.vk.invalid' }).optional().nullable(),
    weChat: z.string().url({ message: 'organization.form.contactInfo.weChat.invalid' }).optional().nullable(),
    reddit: z.string().url({ message: 'organization.form.contactInfo.reddit.invalid' }).optional().nullable()
});

const fileSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    url: z.string(),
});

const documentsFormSchema = z.object({
    logo: z.array(fileSchema).min(1, 'organization.form.documents.logo.min'),
    presentation: z.array(fileSchema).optional(),
    companyCard: z.array(fileSchema).optional(),
    taxReturn: z.array(fileSchema).optional(),
    financialIndicators: z.array(fileSchema).optional(),
    additionalDocuments: z.array(fileSchema).optional(),
});

const descriptionSchema = z
    .string()
    .max(3000, 'organization.form.description.max').optional();

const descriptionFormSchema = z.object({
    description: descriptionSchema
});

const startPageSchema = z.object({
    amountForStart: z.number({
        required_error: 'organization.form.startPage.amountForStart.required',
    }).min(1, 'organization.form.startPage.amountForStart.min'),
    files: z.array(fileSchema).optional(),
});

const financialInfoSchema = z.object({
    foundationYear: z.preprocess((val) => Number(val), z.number({
        required_error: 'organization.form.startPage.financialInfo.foundationYear.required',
    }).min(1000, 'organization.form.startPage.financialInfo.foundationYear.min').max(new Date().getFullYear(), 'organization.form.startPage.financialInfo.foundationYear.max')),

    annualTurnover: z.preprocess((val) => Number(val), z.number({
        required_error: 'organization.form.startPage.financialInfo.annualTurnover.required',
    }).min(1, 'organization.form.startPage.financialInfo.annualTurnover.min')),

    grossRevenue: z.preprocess((val) => Number(val), z.number({
        required_error: 'organization.form.startPage.financialInfo.grossRevenue.required',
    }).min(1, 'organization.form.startPage.financialInfo.grossRevenue.min')),
});

const employeeSchema = z.object({
    firstName: z.string().min(1, 'organization.form.startPage.employee.firstName.min'),
    lastName: z.string().min(1, 'organization.form.startPage.employee.lastName.min'),
    futurumAccount: z.string().url('organization.form.startPage.employee.futurumAccount.invalid'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'organization.form.startPage.employee.phone.invalid'),
    telegram: z.string().min(1, 'organization.form.startPage.employee.telegram.min'),
    avatar: z.array(fileSchema).optional(),
});

const employeesSchema =
    z.object({
        employees: z.array(employeeSchema).max(10, 'organization.form.startPage.employees.max')
    });

export {
    companyInfoSchema,
    addressSchema,
    contactInfoSchema,
    phoneSchema,
    descriptionFormSchema,
    documentsFormSchema,
    employeesSchema,
    startPageSchema,
    financialInfoSchema
};
