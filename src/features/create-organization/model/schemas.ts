import { createFileSchema, createMultipleFilesSchema } from "@/shared/lib/create-file-schema";
import { Presentation } from "lucide-react";
import { z } from "zod";

const companyInfoSchema = z.object({
    position: z.string({
        required_error: "Введите должность",
    }).min(1, "Введите должность"),
    companyName: z.string({
        required_error: "Введите название компании",
    })
        .min(3, "Минимальная длина названия компании 3 символа"),
    ownershipForm: z.string({
        required_error: "Введите форму собственности",
    }).min(1, "Введите форму собственности")
});

const addressSchema = z.object({
    address: z.string({
        required_error: "Введите адрес",
    }).min(1, "Введите адрес"),
    city: z.string({
        required_error: "Введите город",
    }).min(1, "Введите город"),
    country: z.string({
        required_error: "Введите страну",
    }).min(1, "Введите страну")
});

const phoneSchema = z.string().regex(
    /^(\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'Некорректный номер телефона'
);

const contactInfoSchema = z.object({
    // email: z.string().email({ 'message': 'Некорректная почта' }).optional(),
    website: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
    phone: phoneSchema.optional(),
    facebook: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
    instagram: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
    twitter: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
    tiktok: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
    telegram: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
    youtube: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
    whatsapp: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
    vk: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
    weChat: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
    reddit: z.string().url({ 'message': 'Некорректный адрес сайта' }).optional(),
});

const pdfFileSchema = createFileSchema(
    ['application/pdf'],
    2,
    false,
    'Файл обязателен',
    'Тип файла должен быть PDF',
    'Размер файла не должен превышать 2 МБ'
);

const anyFileSchema = createMultipleFilesSchema(
    [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    2,
    10,
    false,
    'Файл обязателен',
    'Недопустимый тип файла',
    'Размер файла не должен превышать 2 МБ',
    'Вы можете загрузить не более 10 файлов'
);

const documentsFormSchema = z.object({
    presentation: pdfFileSchema.optional(),
    companyCard: pdfFileSchema.optional(),
    taxReturn: pdfFileSchema.optional(),
    financialIndicators: pdfFileSchema.optional(),
    additionalDocuments: anyFileSchema.optional(),
});


const descriptionSchema = z
    .string()
    .max(3000, 'Описание не должно превышать 3000 символов').optional();

const descriptionFormSchema = z.object({
    description: descriptionSchema
})

export {
    companyInfoSchema,
    addressSchema,
    contactInfoSchema,
    phoneSchema,
    pdfFileSchema,
    anyFileSchema,
    descriptionFormSchema,
    documentsFormSchema
}