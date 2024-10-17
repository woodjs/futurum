import { createFileSchema, createMultipleFilesSchema } from "@/shared/lib/create-file-schema";
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
    website: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
    phone: phoneSchema.optional().nullable().or(z.literal('')),
    facebook: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
    instagram: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
    twitter: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
    tiktok: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
    telegram: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
    youtube: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
    whatsapp: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
    vk: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
    weChat: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
    reddit: z.string().url({ message: 'Некорректный адрес сайта' }).optional().nullable().or(z.literal('')),
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

const imageFileSchema = createMultipleFilesSchema(
    ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
    2,
    10,
    false,
    'Файл обязателен',
    'Недопустимый тип файла',
    'Размер файла не должен превышать 2 МБ',
    'Вы можете загрузить не более 10 файлов'
)
const fileSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    url: z.string(),
});

const documentsFormSchema = z.object({
    logo: z.array(fileSchema).min(1, 'Логотип обязателен'),
    presentation: z.array(fileSchema).optional(),
    companyCard: z.array(fileSchema).optional(),
    taxReturn: z.array(fileSchema).optional(),
    financialIndicators: z.array(fileSchema).optional(),
    additionalDocuments: z.array(fileSchema).optional(),
});


const descriptionSchema = z
    .string()
    .max(3000, 'Описание не должно превышать 3000 символов').optional();

const descriptionFormSchema = z.object({
    description: descriptionSchema
})

const startPageSchema = z.object({
    amountForStart: z.number({
        required_error: 'Сумма должна быть числом',
    }).min(1, 'Сумма должна быть больше 0'),
    files: z.array(fileSchema).optional(),
})


const financialInfoSchema = z.object({
    foundationYear: z.preprocess((val) => Number(val), z.number({
        required_error: 'Год основания должен быть числом',
    }).min(1000, 'Год основания должен быть больше 1000').max(new Date().getFullYear(), 'Год основания не может быть больше текущего')),

    annualTurnover: z.preprocess((val) => Number(val), z.number({
        required_error: 'Годовой оборот должен быть числом',
    }).min(1, 'Годовой оборот должен быть больше 0')),

    grossRevenue: z.preprocess((val) => Number(val), z.number({
        required_error: 'Массовая выручка должна быть числом',
    }).min(1, 'Массовая выручка должна быть больше 0')),
});

const employeeSchema = z.object({
    firstName: z.string().min(1, 'Введите имя'),
    lastName: z.string().min(1, 'Введите фамилию или первую букву'),
    futurumAccount: z.string().url('Введите корректную ссылку'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Введите корректный номер телефона'),
    telegram: z.string().min(1, 'Введите Telegram'),
    avatar: z.array(fileSchema).optional(),
});

const employeesSchema =
    z.object({
        employees: z.array(employeeSchema).max(10, 'Максимальное количество сотрудников 10')
    })

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
}