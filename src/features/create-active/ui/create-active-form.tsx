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
import { z } from "zod";


interface ButtonProps {
    uuid: string;
}

const activePayoutFrequencyList = [
    { label: 'Раз в месяц', value: 'once_a_month' },
    { label: 'Раз в квартал', value: 'once_a_quarter' },
    { label: 'Раз в пол года', value: 'once_a_half_year' }
];
const activeRefundList = [
    { label: 'Через год', value: 'in_a_year' },
    { label: 'Через 2 года', value: 'in_2_years' },
    { label: 'Через 3 года', value: 'in_3_years' },
    { label: 'Через 4 года', value: 'in_4_years' },
    { label: 'Через 5 лет', value: 'in_5_years' },
];
const ActiveForm = () => {
    const router = useRouter(); // Хук для навигации

    // const { data: cetegory, isLoading, isSuccess, isError } = useGetOrganizationById(id)
    // Преобразование enum ActiveType в массив объектов для select options
    const getEnumOptions = (enumObj: Record<string, string>) => {
        return Object.entries(enumObj).map(([key, value]) => ({
            label: key.replace(/_/g, ' ').toLowerCase(), // Преобразуем ключ в человекочитаемый формат
            value, // Значение для поля value
        }));
    };
    const { data: organizationList, isLoading, isSuccess } = useGetOrganizationList({ my: true })

    const initialFiles1: IFile[] = [
        {
          id: "file1",
          name: "example1.jpg",
          type: "image/jpeg",
          url: "https://example.com/example1.jpg",
        },
      ];
      
      const initialFiles2: IFile[] = [
        {
          id: "file2",
          name: "example2.jpg",
          type: "image/jpeg",
          url: "https://example.com/example2.jpg",
        },
      ];
      
      const initialFiles3: IFile[] = [
        {
          id: "file3",
          name: "example3.jpg",
          type: "image/jpeg",
          url: "https://example.com/example3.jpg",
        },
      ];

    const [iscathegory, setIscathegory] = useState();
    const [isorganizationId, setIsorganizationId] = useState();
    const [isdescription, setIsdescription] = useState();
    const [isactiveName, setIsactiveName] = useState();
    const [istags, setIstags] = useState<string>('');

    const [price, setPrice] = useState<number>(0);
    const [headline, setHeadline] = useState<string>('paragraph');
    const [profitability, setProfitability] = useState<number>(0);
    const [payoutFrequency, setPayoutFrequency] = useState<'once_a_month' | 'once_a_quarter' | 'once_a_half_year'>('once_a_month');
    const [refund, setRefund] = useState<'in_a_year' | 'in_2_years' | 'in_3_years' | 'in_4_years' | 'in_5_years'>('in_a_year');
    const [activityPeriod, setActivityPeriod] = useState<number>(1);

    const [isminContribution, setIsminContribution] = useState();
    const [ispurposeCollection, setIspurposeCollection] = useState();
    const [isendingDate, setIsendingDate] = useState();

    const [withPossibilityOfExtension, setWithPossibilityOfExtension] = useState<boolean>(false);
    const [additionalMaterials, setAdditionalMaterials] = useState<string>('');
    const [fundUrl, setFundUrl] = useState<string>('');

    const [fileItems1, setUploadedFiles1] = useState<IFile[]>(initialFiles1);
    const [fileItems2, setUploadedFiles2] = useState<IFile[]>(initialFiles2);
    const [fileItems3, setUploadedFiles3] = useState<IFile[]>(initialFiles3);
    const [isselectedCollection, setIsselectedCollection] = useState<string | number>('');

    const [tags, setTags] = useState<string[]>([]);                 // Массив уникальных тегов


    // ???
    const inputRef = useRef<HTMLInputElement>(null); // Референс на поле ввода
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
    // ???
    useEffect(() => {
        // logStateValues();
    }, [iscathegory, isorganizationId, isdescription, isactiveName, istags, isminContribution,
        ispurposeCollection, isendingDate, fileItems1, fileItems2, fileItems3, isselectedCollection
    ]); // Указываем зависимости

    const { mutate: createActive } = useCreateActive();

    // console.log(getEnumOptions(ActiveType))
    const activeCategoryList = getEnumOptions(ActiveType2);

    const handleSubmit= (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (event) {
            const data = {
                cathegory: iscathegory ?? ActiveType2.BUSINESS,                       // ActiveType значение
                organizationId: isorganizationId || '237cc758-51df-4df4-8a0a-f8844a0692fb',   // ID организации
                activeName: isactiveName || 'заглушка',           // Название активности
                headline: "",                                 // Если headline необязателен, можно оставить пустым
                description: isdescription || 'заглушка',         // Описание
                tags: tags,                           // Теги как массив строк

                minContribution: Number(isminContribution) || 1,      // Минимальный вклад
                purposeOfCollection: Number(ispurposeCollection) || 1,  // Цель сбора средств
                endingDate: isendingDate || 'заглушка',           // Дата завершения
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
            try {
                ActiveFormSchema.parse(data); // Валидация данных
                // console.log('Данные прошли валидацию:', data);
                // Отправьте данные на сервер
            } catch (error) {
                console.error('Ошибка валидации:', error);
            }

            createActive(data, {
                onSuccess: () => {
                    console.log('Ура мы создали новый актив');
                },
                onError: (error) => {
                    console.error('Ошибка при создании коллекции:', error);
                },
            });
            event.preventDefault();

            router.push(`./`);
        } else {
            console.log("Ошибка.");
        }
    }

    function handleFormUpdateCathegory(data: { cathegory?: any; }, info: any): void {
        if (data) {
            setIscathegory(data.cathegory)
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
            if (data.additionalMaterials !== additionalMaterials) {
                setAdditionalMaterials(data.additionalMaterials);
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
                            activeName: {
                                name: 'activeName',
                                type: 'text',
                                label: 'Название актива',
                                placeholder: 'Hello',
                                description: 'Осталось 50 символов',
                                validation: z.string().min(3),
                            }
                        }}
                        onFormUpdate={handleFormUpdateActiveName}
                        renderFooter={form => <></>}
                    />
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
                    <input
                        type="text"
                        ref={inputRef} // Привязываем референс к полю ввода
                        onChange={handleInputChange} // Обновляем массив тегов при изменении
                        placeholder="Введите теги через пробел"
                        className="border border-gray-300 p-2 rounded-md w-full"
                    />

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
                    <Typography className='text-lg font-bold'>Параметры актива</Typography>
                    {(iscathegory === 'animal_help' || iscathegory === 'human_help') ? (
                        <DynamicForm
                            fields={{
                                minContribution: {
                                    name: 'minContribution',
                                    type: 'number',
                                    label: 'Минимальный взносмость',
                                    placeholder: '$ 10',
                                    description: '',
                                    validation: z.number().min(1),
                                }, purposeCollection: {
                                    name: 'purposeCollection',
                                    type: 'number',
                                    label: 'Цель сбора',
                                    placeholder: '$ 1000',
                                    description: '',
                                    validation: z.number().min(1),
                                },
                                endingDate: {
                                    name: 'endingDate',
                                    type: 'date',
                                    label: 'Дата завершения',
                                    placeholder: 'до 21.12.2024 |  00:00',
                                    validation: z.number().nonnegative(),
                                }
                            }}
                            onFormUpdate={handleFormUpdateMinPurpDate}
                            renderFooter={form => <></>}
                        />
                    ) : (
                        <DynamicForm
                            fields={{
                                price: {
                                    name: 'price',
                                    type: 'number',
                                    label: 'Стоимость',
                                    placeholder: '$ 50',
                                    description: '',
                                    validation: z.number().min(1),
                                }, profitability: {
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
                                    placeholder: 'до 21.12.2024 |  00:00',
                                    description: '',
                                    validation: z.number().min(1),
                                },
                                withPossibilityOfExtension: {
                                    name: 'withPossibilityOfExtension',
                                    type: 'checkbox',
                                    label: 'С возможностью продления',
                                    placeholder: 'С возможностью продления',
                                    validation: z.number().nonnegative(),
                                },
                                additionalMaterials: {
                                    name: 'additionalMaterials',
                                    type: 'richText',
                                    label: 'Доп. материалы',
                                    placeholder: 'Это пользователь получит после приобретения NFT',
                                    validation: z.number().nonnegative(),
                                }
                            }}
                            onFormUpdate={handleFormUpdateMinPurpDate2}
                            renderFooter={form => <></>}
                        />
                    )}
                    <div className='w-full border-b border-gray-300 my-4' ></div>

                    <Typography className='py-8 text-lg font-bold'>Документы</Typography>
                    {(iscathegory === 'animal_help' || iscathegory === 'human_help') ? (
                        <FileUpload
                            name='documentIds'
                            label={'Загрузите документы, подтверждающие необходимость в пожертвованиях'}
                            accept={'image/png, image/jpeg, image/jpg'}
                            multiple={true}
                            maxFiles={5}
                            required={true}
                            onChange={handleFileUpload1}
                        />


                    ) : null}
                    {(iscathegory === 'animal_help' || iscathegory === 'human_help') ? (
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
                    <Typography className='text-sm text-muted-foreground'>
                        Обратите внимание, что изображение должно быть вертикальным, так как оно обрежется под формат NFT.
                    </Typography>
                    <FileUpload
                        name='galeryImagesIds'
                        label={'Загрузите изображения для галереи'}
                        accept={'image/png, image/jpeg, image/jpg'}
                        multiple={true}
                        maxFiles={10}
                        required={true}
                        onChange={handleFileUpload3}
                    />
                    <div className='w-full border-b border-gray-300 my-4' ></div>
                    <Typography className='text-lg font-bold'>Разместить в коллекции</Typography>
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