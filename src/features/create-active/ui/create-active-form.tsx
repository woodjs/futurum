'use client'
import { ActiveFormSchema, ActiveType, useCreateActive } from "@/entities/actives";
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


    const [iscathegory, setIscathegory] = useState();
    const [isorganizationId, setIsorganizationId] = useState();
    const [isdescription, setIsdescription] = useState();
    const [isactiveName, setIsactiveName] = useState();
    const [istags, setIstags] = useState<string>('');
    const [isminContribution, setIsminContribution] = useState();
    const [ispurposeCollection, setIspurposeCollection] = useState();
    const [isendingDate, setIsendingDate] = useState();
    const [fileItems1, setUploadedFiles1] = useState<IFile[]>([]);
    const [fileItems2, setUploadedFiles2] = useState<IFile[]>([]);
    const [fileItems3, setUploadedFiles3] = useState<IFile[]>([]);
    const [isselectedCollection, setIsselectedCollection] = useState<string | number>('');

    const [tags, setTags] = useState<string[]>([]);                 // Массив уникальных тегов


    // const logStateValues = () => {
        // console.group("State Values");
        // console.log("iscathegory:", iscathegory);
        // console.log("isorganizationId:", isorganizationId);
        // console.log("isdescription:", isdescription);
        // console.log("isactiveName:", isactiveName);
        // console.log("istags:", istags);
        // console.log("isminContribution:", isminContribution);
        // console.log("ispurposeCollection:", ispurposeCollection);
        // console.log("isendingDate:", isendingDate);
        // console.log("fileItems1:", fileItems1);
        // console.log("fileItems2:", fileItems2);
        // console.log("fileItems3:", fileItems3);
        // console.log("isselectedCollection:", isselectedCollection);
        // console.groupEnd();
    // };


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
    const activeCategoryList = getEnumOptions(ActiveType);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (event) {
            const data = {
                cathegory: iscathegory ?? ActiveType.BUSINESS,                       // ActiveType значение
                organizationId: isorganizationId || '',   // ID организации
                activeName: isactiveName || '',           // Название активности
                headline: "",                                 // Если headline необязателен, можно оставить пустым
                description: isdescription || '',         // Описание
                tags: tags,                           // Теги как массив строк
                minContribution: Number(isminContribution) || 0,      // Минимальный вклад
                purposeCollection: Number(ispurposeCollection) || 0,  // Цель сбора средств
                endingDate: isendingDate || '',           // Дата завершения
                documentIds: fileItems1.map(file => file.id), // Массив ID документов из fileItems1
                nftId: fileItems2.length > 0 ? fileItems2[0].id.toString() : '',                               // Если nftId необязателен, оставьте пустым
                galeryImagesIds: fileItems3.map(file => file.id), // Массив ID изображений галереи
                collectionId: isselectedCollection.toString() || '',// ID коллекции
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

            // router.push(`./`);
        } else {
            console.log("Ошибка.");
        }
    }

    function handleFormUpdateCathegory(data: { cathegory?: any; }, info: any): void {
        if (data) {
            setIscathegory(data.cathegory.value)
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

            <form onSubmit={handleSubmit}>
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
                {/* {selectedOption === 'option2' && (
                    <Typography className='text-[12px] text-[#2D3748] text-[700]'>Информация об организации</Typography>
                )} */}
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
                    {/* <DynamicForm
                        fields={{
                            tags: {
                                name: 'tags',
                                type: 'text',
                                label: 'Теги',
                                description: 'Осталось 100 символов',
                                placeholder:
                                    'Укажите теги, которые помогут при поиске, например #дизайн и т.д.',
                                validation: z.string().max(100),
                            }
                        }}
                        onFormUpdate={handleFormUpdateTags}
                        renderFooter={form => <></>}
                    /> */}
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
                    {/* <Textarea cols={3} label='Теги' placeholder='Укажите теги, которые помогут при поиске, например #корм и т.д.'/>
                    <Divider /> */}
                    <div className='w-full border-b border-gray-300 my-4' ></div>
                    <Typography className='text-lg font-bold'>Параметры актива</Typography>
                    <DynamicForm
                        fields={{
                            minContribution: {
                                name: 'minContribution',
                                type: 'number',
                                label: 'Минимальный взносмость',
                                placeholder: '$ 000',
                                description: '',
                                validation: z.number().min(1),
                            }, purposeCollection: {
                                name: 'purposeCollection',
                                type: 'number',
                                label: 'Цель сбора',
                                placeholder: '$ 000',
                                description: '',
                                validation: z.number().min(1),
                            },
                            endingDate: {
                                name: 'endingDate',
                                type: 'text',
                                label: 'Дата завершения',
                                placeholder: '0 %',
                                validation: z.number().nonnegative(),
                            }
                        }}
                        onFormUpdate={handleFormUpdateMinPurpDate}
                        renderFooter={form => <></>}
                    />

                    <div className='w-full border-b border-gray-300 my-4' ></div>
                    {/* <DynamicForm
                        fields={{
                            back: {
                                type: 'number',
                                label: 'Возврат',
                                placeholder: '$30',
                                validation: z.string().max(500),
                            },
                            chast: {
                                type: 'number',
                                label: 'Частота выплат',
                                placeholder: '0 %',
                                validation: z.number().nonnegative(),
                            },
                            expiredAt: {
                                type: 'date',
                                label: 'Срок активности',
                                placeholder: 'до 21.12.2024  00:00',
                                validation: z.date(),
                            },
                        }}
                        renderFooter={form => <></>}
                    /> */}
                    <Typography className='py-8 text-lg font-bold'>Документы</Typography>

                    <FileUpload
                        name='documentIds'
                        label={'Загрузите документы, подтверждающие необходимость в пожертвованиях'}
                        accept={'image/png, image/jpeg, image/jpg'}
                        multiple={true}
                        maxFiles={5}
                        required={true}
                        onChange={handleFileUpload1}
                    />
                    {/* <DynamicForm
                        fields={{
                            tags: {
                                type: 'text',
                                value: formsf.textUrl,
                                onChange: handleInputChange,
                                label: 'Ссылка на страницу с официального сайта фонда (если есть)',
                                placeholder:
                                    '1AmQ3l-zTTGxQTQHolWHxFRYdsy6NP2Xfwk6ajtI6w5A/edit',
                                validation: z.string().max(100),
                            }
                        }}
                        renderFooter={form => <></>}
                    /> */}
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

                    <Button type="submit">
                        Создать актив
                    </Button>
                </div>
            </form>
        </>
    )
}

export default ActiveForm;