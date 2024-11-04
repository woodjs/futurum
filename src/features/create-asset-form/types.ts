import { z } from 'zod';

export interface IFile {
  id: string;
  name: string;
  type: string;
  url: string;
  file: File; // Добавьте это свойство, чтобы можно было передавать файл в FormData
}


// Определение схемы для данных формы
export interface FormFields {
    id: number;
    cathegory: string;
    organizationId: string;
    activeName: string;
    headline: string;
    description: string;
    tags: string[];
    minContribution: number;
    purposeCollection: number;
    endingDate: string;
    documentIds: string[];
    nftId: string[];
    galeryImagesIds: string[];
}


export const formSchema = z.object({
  selectCategory: z.string().min(1, 'Категория обязательна для выбора'),
  selectOrganization: z.string().min(1, 'Организация обязательна для выбора'),
  nameActive: z.string().min(1, 'Имя актива обязательно').max(100, 'Имя актива слишком длинное'),
  activeDescription: z.string().min(1, 'Описание актива обязательно').max(1000, 'Описание актива слишком длинное'),
  tegsArea: z.string().min(1, 'Теги обязательны').max(200, 'Теги слишком длинные'),
  cost: z.number().min(1, 'Стоимость должна быть больше 0'),
  frequencyPayments: z.string().min(1, 'Частота платежей обязательна'),
  refundFunds: z.string().min(1, 'Поле возврата средств обязательно'),
  dateFinish: z.number().min(Date.now(), 'Дата завершения должна быть в будущем'),
  possExtension: z.boolean(),
  subDocs: z.string().max(500, 'Доп материалы слишком длинные'),
  avatarNft: z.array(z.instanceof(File)).nonempty('Необходимо загрузить хотя бы один аватар'),
  textUrl: z.string().url('Некорректный URL'),
  albumNft: z.array(z.instanceof(File)).optional(),
  idCollection: z.string().min(1, 'ID коллекции обязателен'),
});

