import { z } from "zod";

export const CollectionsDataSchema = z.object({
    name: z.string(),
    color: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid color format"), // Проверка HEX-кода цвета
  });


// Экспортируем тип на основе схемы
export type CollectionsSchemaType = z.infer<typeof CollectionsDataSchema>;