'use client'
import { ActiveFormSchema, ActiveType, ActiveType2, useCreateActive } from "@/entities/actives";
import { useGetOrganizationList } from "@/entities/organization";
import CollectionForm from "@/features/create-collection/ui/create-collection-form";
import { Button, Container, Typography } from "@/shared/ui";
import { DynamicForm } from "@/shared/ui/dynamic-form";
import { IFile } from "@/shared/ui/file-list";
import FileUpload from "@/shared/ui/file-upload";
import { useLocale } from "next-intl";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";


interface ButtonProps {
    uuid: string;
}

export const activePayoutFrequencyList = [
    { label: 'Раз в месяц', value: 'once_a_month' },
    { label: 'Раз в квартал', value: 'once_a_quarter' },
    { label: 'Раз в пол года', value: 'once_a_half_year' }
];
export const activeRefundList = [
    { label: 'Через год', value: 'in_a_year' },
    { label: 'Через 2 года', value: 'in_2_years' },
    { label: 'Через 3 года', value: 'in_3_years' },
    { label: 'Через 4 года', value: 'in_4_years' },
    { label: 'Через 5 лет', value: 'in_5_years' },
];
export const activeCategoryList = [
    {label: "Бизнес", value: 'business'},
    {label: "Стартап", value: 'startup'},
    {label: "Помощь животным", value: 'animal_help'},
    {label: "Помощь людям", value: 'human_help'},
];
const ActiveForm = () => {
    const router = useRouter(); // Хук для навигации

    // const { data: cetegory, isLoading, isSuccess, isError } = useGetOrganizationById(id)
    // Преобразование enum ActiveType в массив объектов для select options
    const getEnumOptions = (enumObj: Record<string, string>) => {
        return Object.entries(enumObj).map(([key, value]) => ({
            label: key.replace(/_/g, ' ').toLowerCase(), // Преобразуем ключ в человекочитаемый формат
            value // Значение для поля value
        }));
    };
    const { data: organizationList, isLoading, isSuccess } = useGetOrganizationList({ my: true })

    const initialFiles1: IFile[] = [
        {
          id: "ac7be448-fb18-40c1-9a41-5e107a57468c",
          name: "example1.jpg",
          type: "image/jpeg",
          url: "https://example.com/example1.jpg",
        },
      ];
      
      const initialFiles2: IFile[] = [
        {
          id: "46ca396c-4c14-47f9-81a7-224a1345628b",
          name: "example2.jpg",
          type: "image/jpeg",
          url: "https://example.com/example2.jpg",
        },
      ];
      
      const initialFiles3: IFile[] = [
        {
          id: "204a4109-0932-4688-92cd-cb5b5019e095",
          name: "example3.jpg",
          type: "image/jpeg",
          url: "https://example.com/example3.jpg",
        },
      ];

    const [iscathegory, setIscathegory] = useState<string>();
    const [isorganizationId, setIsorganizationId] = useState();
    const [isdescription, setIsdescription] = useState<string>();
    const [isactiveName, setIsactiveName] = useState<string>();
    const [istags, setIstags] = useState<string>('');

    const [price, setPrice] = useState<number>(0);
    const [headline, setHeadline] = useState<string>('paragraph');
    const [profitability, setProfitability] = useState<number>(0);
    const [payoutFrequency, setPayoutFrequency] = useState<'once_a_month' | 'once_a_quarter' | 'once_a_half_year'>('once_a_month');
    const [refund, setRefund] = useState<'in_a_year' | 'in_2_years' | 'in_3_years' | 'in_4_years' | 'in_5_years'>('in_a_year');
    const [activityPeriod, setActivityPeriod] = useState<number>(1);

    const [isminContribution, setIsminContribution] = useState();
    const [ispurposeCollection, setIspurposeCollection] = useState();
    const [isendingDate, setIsendingDate] = useState<Date>();

    const [withPossibilityOfExtension, setWithPossibilityOfExtension] = useState<boolean>(false);
    const [additionalMaterials, setAdditionalMaterials] = useState<string>('');
    const [fundUrl, setFundUrl] = useState<string>('');

    const [fileItems1, setUploadedFiles1] = useState<IFile[]>(initialFiles1);
    const [fileItems2, setUploadedFiles2] = useState<IFile[]>(initialFiles2);
    const [fileItems3, setUploadedFiles3] = useState<IFile[]>(initialFiles3);
    const [isselectedCollection, setIsselectedCollection] = useState<string | number>('');

    const [tags, setTags] = useState<string[]>([]);                 // Массив уникальных тегов


    // ???
    const inputRef = useRef<HTMLTextAreaElement>(null); // Референс на поле ввода
    const [istags2, setIstags2] = useState<string>(''); // Состояние для строки ввода

    const handleInputChange = () => {
        const inputValue = inputRef.current?.value || ''; // Получаем текущее значение из input


        // Разбиваем строку на теги, удаляем дубликаты
        const uniqueTags = Array.from(new Set(inputValue.trim().split(/\s+/).filter(Boolean)));

        setTags(uniqueTags); // Обновляем массив уникальных тегов
    };


    const handleRemoveTag = (tagToRemove: string) => {
        // Удаляем все точные вхождения тега из строки

        const newInputValue = (inputRef?.current?.value || '')
            .split(/\s+/)
            .filter(tag => tag !== tagToRemove)
            .join(' ');

        if (inputRef.current) {

            inputRef.current.value = newInputValue;
        }
        setIstags2(newInputValue); // Обновляем строку ввода
        // setInputValue(newInputValue);
        setTags(tags.filter(tag => tag !== tagToRemove)); // Убираем тег из списка уникальных тегов
    };

    const handleFormUpdateTags = (data: { tags?: string }) => {
        const inputTags = data.tags || '';
        setIstags2(inputTags);

        // Обновляем массив уникальных тегов
        const uniqueTags = Array.from(new Set(inputTags.trim().split(/\s+/).filter(Boolean)));
        setTags(uniqueTags);
    };
    
    const { mutate: createActive } = useCreateActive();

    // console.log(getEnumOptions(ActiveType))
    // const activeCategoryList = getEnumOptions(ActiveType2);

    const handleSubmit= (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (event) {
            const data = {
                cathegory: iscathegory ?? "Бизнес",                       // ActiveType значение
                organizationId: isorganizationId || '237cc758-51df-4df4-8a0a-f8844a0692fb',   // ID организации
                activeName: isactiveName || 'заглушка',           // Название активности
                headline: "",                                 // Если headline необязателен, можно оставить пустым
                description: isdescription || 'заглушка',         // Описание
                tags: tags,                           // Теги как массив строк

                minContribution: Number(isminContribution) || 1,      // Минимальный вклад
                purposeOfCollection: Number(ispurposeCollection) || 1,  // Цель сбора средств
                endingDate: isendingDate!.toString() || 'заглушка',           // Дата завершения
                documentIds: fileItems1.map(file => file.id), // Массив ID документов из fileItems1
                nftId: fileItems2.length > 0 ? fileItems2[0].id.toString() : '237cc758-51df-4df4-8a0a-f8844a0692fb',                               // Если nftId необязателен, оставьте пустым
                galeryImagesIds: fileItems3.map(file => file.id), // Массив ID изображений галереи
                collectionId: isselectedCollection.toString() || '237cc758-51df-4df4-8a0a-f8844a0692fb',// ID коллекции

                price: Number(price) || 1,
                profitability: Number(profitability) || 1,
                payoutFrequency: payoutFrequency,
                refund: refund,
                activityPeriod: Number(activityPeriod) || 1,
                withPossibilityOfExtension: withPossibilityOfExtension || false,
                additionalMaterials: additionalMaterials || 'заглушка',
                fundUrl: fundUrl || 'https://www.google.com',
            };
            console.log(data)
            try {
                ActiveFormSchema.parse(data); // Валидация данных
                // console.log('Данные прошли валидацию:', data);
                // Отправьте данные на сервер
                createActive(data, {
                    onSuccess: () => {
                        console.log('Ура мы создали новый актив');
                        router.push(`./`);
                    },
                    onError: (error) => {
                        console.error('Ошибка при создании коллекции:', error);
                        toast.error("Ошибка при создании коллекции")
                    },
                });
                event.preventDefault();
            } catch (error) {
                console.error('Ошибка валидации:', error);
                toast.error('Ошибка валидации')
            }


        } else {
            console.log("Ошибка.");
        }
    }

    function handleFormUpdateCathegory(data: { cathegory?: any; }, info: any): void {
        if (data) {
            console.log(activeCategoryList.find(category => category.value === data.cathegory)?.label)
            setIscathegory(activeCategoryList.find(category => category.value === data.cathegory)?.label)
        } else {
            console.log("Категория не задана.");
        }
    }

    function handleFormUpdateOrganization(data: { organizationId?: any; }, info: any): void {
        if (data) {
            setIsorganizationId(data.organizationId)
        } else {
            console.log("Организация не задана.");
        }
    }

    function handleFormDescription(data: { description?: any; }, info: any): void {
        if (data) {
            setIsdescription(data.description)

        } else {
            console.log("Описание не задана.");
        }
    }

    function handleFormUpdateActiveName(data: { activeName?: any; }, info: any): void {
        if (data) {
            setIsactiveName(data.activeName)
        } else {
            console.log("Имя актива не задана.");
        }
    }
    function handleUrlName(data: { fundUrl?: any; }, info: any): void {
        if (data) {
            setFundUrl(data.fundUrl)
        } else {
            console.log("Имя актива не задана.");
        }
    }



    function handleFormUpdateMinPurpDate(data: { minContribution?: any; purposeCollection?: any; endingDate?: any; }, info: any): void {
        if (data) {
            if (data.minContribution !== isminContribution) {
                // console.log("minContribution обновлено:", data.minContribution);
                setIsminContribution(data.minContribution);
            }

            if (data.purposeCollection !== ispurposeCollection) {
                // console.log("purposeCollection обновлено:", data.purposeCollection);
                setIspurposeCollection(data.purposeCollection);
            }

            if (data.endingDate !== isendingDate) {
                // console.log("endingDate обновлено:", data.endingDate);
                setIsendingDate(data.endingDate);
            }
        } else {
            console.log("Параметры не задана.");
        }
    }
    function handleFormUpdateMinPurpDate2(data: {
        price?: any; profitability?: any; payoutFrequency?: any; refund?: any;
        activityPeriod?: any; endingDate?: any; withPossibilityOfExtension?: any; additionalMaterials?: any
    }, info: any): void {
        if (data) {
            if (data.price !== price) {
                setPrice(data.price);
            }
            if (data.profitability !== profitability) {
                setProfitability(data.profitability);
            }
            if (data.payoutFrequency !== payoutFrequency) {
                setPayoutFrequency(data.payoutFrequency);
            }
            if (data.refund !== refund) {
                setRefund(data.refund);
            }
            if (data.activityPeriod !== activityPeriod) {
                setActivityPeriod(data.activityPeriod);
            }
            if (data.endingDate !== isendingDate) {
                setIsendingDate(data.endingDate);
            }
            if (data.withPossibilityOfExtension !== withPossibilityOfExtension) {
                setWithPossibilityOfExtension(data.withPossibilityOfExtension);
            }

            
        } else {
            console.log("Параметры не задана.");
        }
    }
    const handleFileUpload1 = (files: IFile[]) => {
        const fileItems1: IFile[] = files.map(fileItem => ({
            id: fileItem.id, // Существующий ID
            name: fileItem.name,
            type: fileItem.type,
            url: fileItem.url,
        }));
        setUploadedFiles1(fileItems1);
    };
    const handleFileUpload2 = (files: IFile[]) => {
        const fileItems2: IFile[] = files.map(fileItem => ({
            id: fileItem.id, // Существующий ID
            name: fileItem.name,
            type: fileItem.type,
            url: fileItem.url,
        }));
        setUploadedFiles2(fileItems2);
    };
    const handleFileUpload3 = (files: IFile[]) => {
        const fileItems3: IFile[] = files.map(fileItem => ({
            id: fileItem.id, // Существующий ID
            name: fileItem.name,
            type: fileItem.type,
            url: fileItem.url,
        }));
        setUploadedFiles3(fileItems3);
    };


    function handleCollectionSelect(selectedCollection: string | number): void {
        if (selectedCollection) {
            setIsselectedCollection(selectedCollection)
        } else {
            console.log("Коллекция не задана.");
        }
    }

    return (
        <>

            {/* <form onSubmit={handleSubmit}> */}
                <DynamicForm
                    fields={{
                        cathegory: {
                            name: 'category',
                            type: 'select',
                            label: 'Категория',
                            placeholder: 'Выберите категорию',
                            options: activeCategoryList,
                        }
                    }}
                    onFormUpdate={handleFormUpdateCathegory}
                    renderFooter={form => <></>}
                />
                
                <DynamicForm
                    fields={{
                        organizationId: {
                            name: 'organizationId',
                            type: 'select',
                            label: 'Организация',
                            placeholder: 'Выберите вашу организацию',
                            options: organizationList?.data?.map((organization) => ({
                                label: organization.companyName, // Имя категории для отображения
                                value: organization.id, // Уникальный идентификатор категории
                            })) || [],
                        }
                    }}
                    onFormUpdate={handleFormUpdateOrganization}
                    renderFooter={form => <></>}
                />
                <Typography className='py-4 text-lg font-bold'>Информация об организации</Typography>
                <Container className='p-8 bg-slate-100 rounded-lg'>

                    <DynamicForm
                        fields={{
                            organizationId: {
                                name: 'organizationId',
                                type: 'select',
                                label: 'Организация',
                                placeholder: 'Выберите вашу организацию',
                                options: organizationList?.data?.map((organization) => ({
                                    label: organization.companyName, // Имя категории для отображения
                                    value: organization.id, // Уникальный идентификатор категории
                                })) || [],
                            }
                        }}
                        onFormUpdate={handleFormUpdateOrganization}
                        renderFooter={form => <></>}
                    />

                    <DynamicForm
                        fields={{
                            activeName: {
                                name: 'activeName',
                                type: 'text',
                                label: 'Название актива',
                                placeholder: 'Hello',
                                description: 'Осталось 50 символов',
                                validation: z.string().max(50),
                            }
                        }}
                        onFormUpdate={handleFormUpdateActiveName}
                        renderFooter={form => <></>}
                    />
                    {isactiveName && isactiveName.length > 50 && (
                        <p className="text-[14px] text-red-500">Название актива не может быть больше 50 cимволов</p>
                    )}

                    <DynamicForm
                        fields={{
                            description: {
                                name: 'description',
                                type: 'richText',
                                label: 'Описание',
                                description: 'Осталось 3000 символов, 10 картинок',
                                placeholder: 'Напишите описание вашего актива',
                                validation: z.string().max(3000),
                            }
                        }}
                        onFormUpdate={handleFormDescription}
                        renderFooter={form => <></>}
                    />
                    {isdescription && isdescription.length > 3000 && (
                        <p className="text-[14px] text-red-500">Описание актива не может быть больше 3000 cимволов</p>
                    )}
                    <p className="text-[14px] font-[700] text-[#2D3748] mb-[8px]">Теги</p>
                    <textarea
                        ref={inputRef} // Привязываем референс к полю ввода
                        onChange={handleInputChange} // Обновляем массив тегов при изменении
                        placeholder="Укажите теги, которые помогут при поиске, например #корм и т.д."
                        className="border border-[#A0AEC0E5] p-2 rounded-md w-full h-[140px] max-h-[140px] text-[14px]"
                    />
                    <p className="font-[400] text-[12px] text-[#A0AEC0E5]">Осталось 100 символов</p>
                    {inputRef.current?.value && inputRef.current?.value.length > 100 && (
                        <p className="text-[14px] text-red-500">Поле с тегами не может быть больше 100 символов</p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md flex items-center gap-2"
                            >
                                {tag}
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-red-500 hover:text-red-700 ml-2"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className='w-full border-b border-gray-300 my-4' ></div>
                    <Typography className='text-lg font-bold mb-[16px]'>Параметры актива</Typography>
                    {(iscathegory === ActiveType2.ANIMAL_HELP || iscathegory === ActiveType2.HUMAN_HELP) ? (
                        <>
                            <DynamicForm
                                fields={{
                                    minContribution: {
                                        name: 'minContribution',
                                        type: 'number',
                                        label: 'Минимальный взнос',
                                        placeholder: '$ 000',
                                        description: '',
                                        validation: z.number().max(50),
                                    }, purposeCollection: {
                                        name: 'purposeCollection',
                                        type: 'number',
                                        label: 'Цель сбора',
                                        placeholder: '$ 000',
                                        description: '',
                                        validation: z.number().max(1000),
                                    },
                                    endingDate: {
                                        name: 'endingDate',
                                        type: 'date',
                                        label: 'Дата завершения',
                                        placeholder: 'Выберите дату завершения',
                                        validation: z.number().nonnegative(),
                                    }
                                }}
                                onFormUpdate={handleFormUpdateMinPurpDate}
                                renderFooter={form => <></>}
                            />
                            {isminContribution && isminContribution < 50 && (
                                <p className="text-[14px] text-red-500">Минимальный взнос не может быть ниже 50$</p>
                            )}
                        
                            {ispurposeCollection && ispurposeCollection < 1000 && (
                                <p className="text-[14px] text-red-500">Цель сбора не может быть ниже 1000$</p>
                            )}
                        </>
                    ) : (
                        <>
                            <DynamicForm
                                fields={{
                                    price: {
                                        name: 'price',
                                        type: 'number',
                                        label: 'Стоимость',
                                        placeholder: '$ 50',
                                        description: 'Указывайте цену, учитывая комиссию в N%  ',
                                        validation: z.number().min(1),
                                    }, 
                                    profitability: {
                                        name: 'profitability',
                                        type: 'number',
                                        label: 'Доходность',
                                        placeholder: '0 %',
                                        description: '',
                                        validation: z.number().min(1),
                                    },
                                    payoutFrequency: {
                                        name: 'payoutFrequency',
                                        type: 'select',
                                        label: 'Частота выплат',
                                        placeholder: 'выберите',
                                        options: activePayoutFrequencyList,
                                    },
                                    refund: {
                                        name: 'refund',
                                        type: 'select',
                                        label: 'Возврат средств',
                                        placeholder: 'выберите',
                                        options: activeRefundList,
                                    },
                                    activityPeriod: {
                                        name: 'activityPeriod',
                                        type: 'number',
                                        label: 'Срок активности',
                                        placeholder: '0 %',
                                        description: '',
                                        validation: z.number().min(1),
                                    },
                                    endingDate: {
                                        name: 'endingDate',
                                        type: 'date',
                                        label: 'Дата завершения',
                                        placeholder: 'Выберите дату завершения',
                                        description: '',
                                        validation: z.number().min(1),
                                    },
                                    withPossibilityOfExtension: {
                                        name: 'withPossibilityOfExtension',
                                        type: 'checkbox',
                                        label: 'С возможностью продления',
                                        placeholder: 'С возможностью продления',
                                        validation: z.number().nonnegative(),
                                    }
                                }}
                                onFormUpdate={handleFormUpdateMinPurpDate2}
                                renderFooter={form => <></>}
                            />
                                {price && price < 50 ? (
                                    <p className="text-[14px] text-red-500 mb-[8px]">Стоимость не может быть ниже 50$</p>
                                ) : ""}
                            
                                {profitability && profitability < 1 ? (
                                    <p className="text-[14px] text-red-500 mb-[8px]">Доходность не может быть ниже 1%</p>
                                ) : ""}
                        </>
                    )}

                    {(iscathegory === ActiveType2.STARTUP || iscathegory === ActiveType2.BUSINESS) && (
                        <>
                            <p className="text-[14px] font-[700] text-[#2D3748] mb-[8px]">Доп. материалы</p>
                            <textarea
                                onChange={(e) => setAdditionalMaterials(e.target.value)}
                                placeholder="Это пользователь получит после приобретения NFT"
                                className="border border-[#A0AEC0E5] p-2 rounded-md w-full h-[140px] max-h-[140px] text-[14px]"
                            />
                            <p className="font-[400] text-[12px] text-[#A0AEC0E5] mb-[24px]">Осталось 500 символов</p>
                            {additionalMaterials && additionalMaterials.length > 500 && (
                                    <p className="text-[14px] text-red-500">Доп. материалы не могут быть больше 500</p>
                                )}
                        </>
                    )}
                    
                    {(iscathegory === ActiveType2.ANIMAL_HELP || iscathegory === ActiveType2.HUMAN_HELP) && (
                        <>
                            <div className='w-full border-b border-gray-300' ></div>
                            <Typography className='text-lg font-bold mt-[16px] mb-[16px]'>Документы</Typography>
                        </>
                    )}
                    {(iscathegory === ActiveType2.ANIMAL_HELP || iscathegory === ActiveType2.HUMAN_HELP) ? (
                        <>
                            <FileUpload
                                name='documentIds'
                                label={'Загрузите документы, подтверждающие необходимость в пожертвованиях'}
                                accept={'application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/vnd.openxmlformats-officedocument.presentationml.presentation'}
                                multiple={true}
                                maxFiles={10}
                                required={true}
                                onChange={handleFileUpload1}
                            />
                            <Typography className='text-[12px] font-[400] text-[#A0AEC0E5] mb-[16px] mt-[16px]'>
                                Вы можете загрузить до 10 файлов PDF, Word, Exel и т.д.
                            </Typography>
                        </>

                    ) : null}
                    {(iscathegory === ActiveType2.ANIMAL_HELP || iscathegory === ActiveType2.HUMAN_HELP) ? (
                        <DynamicForm
                            fields={{
                                fundUrl: {
                                    name: 'fundUrl',
                                    type: 'text',
                                    label: 'Ссылка на страницу с официального сайта фонда (если есть)',
                                    placeholder: '1AmQ3l-zTTGxQTQHolWHxFRYdsy6NP2Xfwk6ajtI6w5A/edit',
                                    validation: z.string().max(3000),
                                }
                            }}
                            onFormUpdate={handleUrlName}
                            renderFooter={form => <></>}
                        />
                    ) : null}
                    <FileUpload
                        name='nft'
                        label={'Загрузите изображение для NFT'}
                        accept={'image/png, image/jpeg, image/jpg'}
                        multiple={true}
                        maxFiles={1}
                        required={true}
                        onChange={handleFileUpload2}
                    />
                    <Typography className='text-[12px] font-[400] text-[#A0AEC0E5] mb-[16px] mt-[16px]'>
                    Обратите внимание, что изображение должно быть вертикальным, так как оно обрежется под формат NFT. Рекомендуем использовать фотографии, сделанные непосредственно вами, или картинки, сгенерированные нейросетью.
Не рекомендуем использовать чужие изображения, взятые со стоков.
                    </Typography>
                    <FileUpload
                        name='galeryImagesIds'
                        label={'Загрузите изображения для галереи'}
                        accept={'image/png, image/jpeg, image/jpg'}
                        multiple={true}
                        maxFiles={20}
                        required={true}
                        onChange={handleFileUpload3}
                    />
                    <Typography className='text-[12px] font-[400] text-[#A0AEC0E5] mb-[16px] mt-[16px]'>
                        Вы можете загрузить до 20 изображений.
                    </Typography>
                </Container>

                <Typography className='text-lg font-bold mt-[28px] mb-[12px]'>Разместить в коллекции</Typography>

                <Container className="p-8 bg-slate-100 rounded-lg">
                    <CollectionForm onCollectionSelect={handleCollectionSelect} />
                </Container>

                <div className="flex pt-6 space-x-9 w-full">
                    <Button 
                    type="button"
                    onClick={handleSubmit}>
                        Создать актив
                    </Button>
                </div>
            {/* </form> */}
        </>
    )
}

export default ActiveForm;