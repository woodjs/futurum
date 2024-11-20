import { z } from 'zod';

function appendToFormData(formData: FormData, key: string, value: any) {
    if (value instanceof File) {
        formData.append(key, value);
    } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
            appendToFormData(formData, `${key}[${index}]`, item);
        });
    } else if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach(subKey => {
            appendToFormData(formData, `${key}.${subKey}`, value[subKey]);
        });
    } else if (value !== undefined && value !== null) {
        formData.append(key, value);
    }
}

function validateAndConvertToFormData<T extends Record<string, any>>(data: T, schema: z.ZodSchema<T>): FormData | null {
    // Валидация данных с использованием переданной схемы
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
        console.error('Validation failed', validationResult.error);
        return null;
    }

    const formData = new FormData();

    const validData = validationResult.data;

    Object.keys(validData).forEach((key) => {
        appendToFormData(formData, key, validData[key as keyof T]);
    });

    return formData;
}

export { validateAndConvertToFormData }