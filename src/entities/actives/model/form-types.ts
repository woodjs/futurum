import { z } from "zod";
import { ActiveType } from "./active-type";

// !!! NOTE : Перенести в schemas всю валидацию

export const ActiveFormSchema = z.object({
  cathegory: z.nativeEnum(ActiveType),
  organizationId: z.string(),
  activeName: z.string(),
  headline: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  minContribution: z.number().nonnegative(), // Неотрицательное число
  purposeCollection: z.number().nonnegative(), // Неотрицательное число
  endingDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }), // Строка, которая должна быть датой
  documentIds: z.array(z.string()), // Массив строк
  nftId: z.string(),
  galeryImagesIds: z.array(z.string()), // Массив строк
  collectionId: z.string(),
});


// !!! NOTE : Что то намудрил разобраться и убрать ненужное
// Схема для валидации, что значение может быть только одним из значений перечисления ActiveType
export const activeTypeSchema = z.nativeEnum(ActiveType);

// Экспортируем тип на основе схемы
export type ActiveTypeSchemaType = z.infer<typeof activeTypeSchema>;

export type ActiveSchema = z.infer<typeof ActiveFormSchema>;
