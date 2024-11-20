import { z } from "zod";
import { ActiveType, ActiveType2 } from "./active-type";

// !!! NOTE : Перенести в schemas всю валидацию

export const ActiveFormSchema = z.object({
  cathegory: z.string(),
  organizationId: z.string(),
  activeName: z.string(),
  headline: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  minContribution: z.number().nonnegative(), // Неотрицательное число
  purposeCollection: z.any(), // Неотрицательное число
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



export const ActiveFormSchema2 = z.object({
  cathegory: z.string(),               // Категория, как enum
  organizationId: z.string(),                 // ID организации, строка UUID
  activeName: z.string(),                     // Название активности, строка
  headline: z.string(),                   // Заголовок, строка, необязательный
  description: z.string(),                    // Описание, строка
  tags: z.array(z.string()),                         // Теги, массив строк
  price: z.number().nonnegative(),                   // Цена, неотрицательное число
  profitability: z.number().nonnegative(),           // Доходность, неотрицательное число
  payoutFrequency: z.enum(['once_a_month', 'once_a_quarter', 'once_a_half_year']),  // Частота выплат
  refund: z.enum(['in_a_year', 'in_2_years', 'in_3_years', 'in_4_years', 'in_5_years']), // Срок возврата
  activityPeriod: z.number().int().min(1).max(100),  // Период активности, целое число от 1 до 100
  minContribution: z.number().nonnegative(),     // Минимальный взнос
  purposeOfCollection: z.number().nonnegative(),     // Цель сбора средств
  endingDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),  // Дата завершения, строка с валидацией
  withPossibilityOfExtension: z.boolean(),           // Возможность продления, булево значение
  additionalMaterials: z.string().min(1),            // Дополнительные материалы, строка
  fundUrl: z.string(),              // URL фонда, строка URL
  documentIds: z.array(z.string()),           // Массив ID документов, строки UUID
  nftId: z.string(),               // ID NFT, строка UUID, необязательный
  galeryImagesIds: z.array(z.string()),       // Массив ID изображений галереи, строки UUID
  collectionId: z.string()                                   // Коллекция, необязательная
});



export type ActiveSchema2 = z.infer<typeof ActiveFormSchema2>;



