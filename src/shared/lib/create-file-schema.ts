import { z } from 'zod';


export function createFileSchema(
    acceptedTypes: string[],
    maxSizeMB: number,
    required: boolean,
    requiredMessage: string,
    typeErrorMessage: string,
    sizeErrorMessage: string
) {
    return z
        .unknown().transform(value => {
            return value as FileList
        })
        .optional()
        .superRefine((files, ctx) => {
            if (!files || files.length === 0) {
                if (required) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: requiredMessage,
                    });
                }
                return;
            }

            const file = files[0] as File;

            if (!acceptedTypes.includes(file.type)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: typeErrorMessage,
                });
            }

            if (file.size > maxSizeMB * 1024 * 1024) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: sizeErrorMessage,
                });
            }
        });
}

export function createMultipleFilesSchema(
    acceptedTypes: string[],
    maxSizeMB: number,
    maxFiles: number,
    required: boolean,
    requiredMessage: string,
    typeErrorMessage: string,
    sizeErrorMessage: string,
    maxFilesMessage: string
) {
    return z
        .custom<FileList>()
        .refine((files) => {
            if (required) {
                return files && files.length > 0;
            }
            return true;
        }, {
            message: requiredMessage,
        })
        .refine((files) => files.length <= maxFiles, {
            message: maxFilesMessage,
        })
        .superRefine((files, ctx) => {
            Array.from(files).forEach((file, index) => {
                if (!acceptedTypes.includes(file.type)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: typeErrorMessage,
                        path: [index],
                    });
                }

                if (file.size > maxSizeMB * 1024 * 1024) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: sizeErrorMessage,
                        path: [index],
                    });
                }
            });
        });
}
