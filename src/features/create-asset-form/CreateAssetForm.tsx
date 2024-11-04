'use client'

import React, { Fragment, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createAsset } from './api';
import { useForm, Controller } from 'react-hook-form';
import { Button, Container, Typography } from '@/shared/ui';
import CustomTextField from './TextField';
import { useCategories } from '@/entities/category/hooks'
import { useOrg } from '@/entities/lisorg/hooks'
import { useSnackbar } from 'notistack'; // Импорт хука для уведомлений
import CollectionForm from '@/features/collection-form/CollectionForm';
import { DynamicForm } from '@/shared/ui/dynamic-form';
import FileUpload from '@/shared/ui/file-upload';
import { z } from 'zod';
import Cookies from 'js-cookie'
import Divider from '@/shared/ui/divider';
import FormWithSwitch from '@/shared/ui/toggle-switch';
import Textarea from '@/shared/ui/text-area';
import { FormFields, } from './types'
import { IFile } from '@/shared/ui/file-list';
import { categories_list, organizations_list, collections_list } from './list-default'; // Путь к файлу с дефолтными данными
import { Printer } from 'lucide-react';
import { protectedAPI } from '@/shared/api';
import { AUTH_SIGN_UP, CREATE_NFT } from '@/shared/api/config';
import { errorClientHandler } from '@/shared/api/helpers/auth.helper';
import { Link, useRouter } from '@/i18n/routing'
import { AxiosError } from 'axios';
const AUTH_TOKEN_KEY = 'auth-token-data'


interface Category {
    id: string;
    name: string;
}

interface Organization {
    id: string;
    name: string;
}

interface Collection {
    id: string;
    name: string;
}

const CreateAssetForm: React.FC = () => {
    // Для всех полей
    const [formData, setFormData] = useState({
        id: 0,
        cathegory: '',
        organizationId: '',
        activeName: '',
        headline: '',
        description: '',
        tags: [''],
        minContribution: 0,
        purposeCollection: 0,
        endingDate: '',
        documentIds: [''],
        nftId: [''],
        galeryImagesIds: ['']
    });
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = event.target;
        const newValue = type === 'number' ? Number(value) : value;
    
        setFormData(prevData => ({
            ...prevData,
            [name]: newValue,
        }));
        console.log(`Изменено поле: ${name}, новое значение: ${newValue}`);
    };
    // Для работы с файлами
    const [uploadedFile1, setUploadedFiles1] = useState<IFile[]>([]);
    const [uploadedFiles2, setUploadedFiles2] = useState<IFile[]>([]);
    const [uploadedFiles3, setUploadedFiles3] = useState<IFile[]>([]);

    // Для работы со списками
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    // Для работы с кнопкой отправить
    const [loading, setLoading] = useState<boolean>(true);


    const [serverResponse, setServerResponse] = useState<string | null>(null);

    const { enqueueSnackbar } = useSnackbar();
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleFileUpload1 = (files: IFile[]) => {
        const fileItems: IFile[] = files.map(fileItem => ({
            id: fileItem.id, // Существующий ID
            name: fileItem.name,
            type: fileItem.type,
            url: fileItem.url,
        }));
        setUploadedFiles1(fileItems);
    };

    const handleFileUpload2 = (files: IFile[]) => {
        const fileItems: IFile[] = files.map(fileItem => ({
            id: fileItem.id, // Существующий ID
            name: fileItem.name,
            type: fileItem.type,
            url: fileItem.url,
        }));
        setUploadedFiles2(fileItems);
    };

    const handleFileUpload3 = (files: IFile[]) => {
        const fileItems: IFile[] = files.map(fileItem => ({
            id: fileItem.id, // Существующий ID
            name: fileItem.name,
            type: fileItem.type,
            url: fileItem.url,
        }));
        setUploadedFiles3(fileItems);
    };

    const router = useRouter()

    useEffect(() => {
        console.log('Форма изменена:', formData);
        const fetchData = async () => {
            setLoading(true);
            try {
                // Замените URL на соответствующие адреса вашего бэкэнда
                const [categoriesResponse, organizationsResponse, collectionsResponse] = await Promise.all([
                    fetch('http://localhost:3000//api/v1/organization-categories'),
                    fetch('http://localhost:3000/api/v1/organizations'),
                    fetch('http://localhost:3000/api/v1/organization-startups'),
                ]);
    
                if (!categoriesResponse.ok || !organizationsResponse.ok || !collectionsResponse.ok) {
                    throw new Error('Ошибка при получении данных');
                }
    
                const categoriesData = await categoriesResponse.json();
                const organizationsData = await organizationsResponse.json();
                const collectionsData = await collectionsResponse.json();
    
                setCategories(categoriesData);
                setOrganizations(organizationsData);
                setCollections(collectionsData);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                // Используем дефолтные данные при ошибке
                setCategories(categories_list);
                setOrganizations(organizations_list);
                setCollections(collections_list);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [formData]);
    

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;

        console.log(value);
        setSelectedOption(value);

        // Обновляем состояние формы
        setFormData(prevData => ({
            ...prevData,
            [name]: value, // Используем name атрибут для обновления соответствующего поля
        }));

        console.log(value);
    };
    // Используем useMutation для отправки данных
    // Убедитесь, что типы указаны правильно:
    const mutation = useMutation<unknown, Error, FormFields>({
        mutationFn: (formData: FormFields) => createAsset(formData), // Убедитесь, что эта функция возвращает Promise
        onSuccess: (formData) => {
            enqueueSnackbar('Актив успешно создан!', { variant: 'success' });
            setServerResponse(JSON.stringify(formData, null, 2));
            console.log('Актив успешно создан');
        },
        onError: (error) => {
            enqueueSnackbar(`Ошибка: ${error.message}`, { variant: 'error' });
            setServerResponse(`Ошибка: ${error.message}`);
            console.error('Ошибка:', error.message);
        },

    });
    const handleAddAssets = async () => {
        const formDataToSend = new FormData();

        // Приведение `dateFinish` к строковому формату (если это дата)
        if (formData.endingDate && typeof formData.endingDate === 'number') {
            const date = new Date(formData.endingDate); // Пример использования timestamp
            formDataToSend.append('endingDate', date.toISOString());
        }

        // Добавляем остальные данные
        Object.keys(formData).forEach(key => {
            const value = formData[key as keyof FormFields];
            if (value && (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')) {
                formDataToSend.append(key, value.toString());
            }
        });

        // Добавляем файлы
        uploadedFile1.forEach((fileItem, index) => {
            formDataToSend.append(`documentIds[${index}]`, fileItem.id);
        });

        uploadedFiles2.forEach((fileItem, index) => {
            formDataToSend.append(`nftId[${index}]`, fileItem.id);
        });

        uploadedFiles3.forEach((fileItem, index) => {
            formDataToSend.append(`galeryImagesIds[${index}]`, fileItem.id);
        });

        formDataToSend.append('id', formData.id.toString());
        formDataToSend.append('cathegory', formData.cathegory);
        formDataToSend.append('organizationId', formData.organizationId);
        formDataToSend.append('activeName', formData.activeName);
        formDataToSend.append('headline', formData.headline);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('minContribution', formData.minContribution.toString());
        formDataToSend.append('purposeCollection', formData.purposeCollection.toString());
        formDataToSend.append('endingDate', formData.endingDate);

        try {
            const response = await protectedAPI.post(CREATE_NFT, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(response.data));
            enqueueSnackbar('Актив успешно создан!', { variant: 'success' });
            router.push('/');
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                console.error('Ошибка при отправке данных:', error.response.data);
                // Показать сообщение пользователю
                enqueueSnackbar(`Ошибка при отправке: ${error.response.data.message}`, { variant: 'error' });
            } else if (typeof error === 'object' && error !== null && 'errors' in error) {
                console.error('Ошибка:', (error as { errors: string[] }).errors);
                errorClientHandler((error as { errors: string[] }).errors);
            } else {
                console.error('Неизвестная ошибка:', error);
                enqueueSnackbar(`Неизвестная ошибка: ${String(error)}`, { variant: 'error' });
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await handleAddAssets();
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <DynamicForm
                    fields={{
                        category: {
                            type: 'select',
                            value: formData.cathegory,
                            onChange: handleInputChange,
                            label: 'Категория',

                            placeholder: 'Помощь животным',
                            options: categories?.map((category) => ({
                                label: category.name, // Имя категории для отображения
                                value: category.id, // Уникальный идентификатор категории
                            })) || [],
                        }
                    }}
                    renderFooter={form => <></>}
                />
                {selectedOption === 'option2' && (
                    <Typography className='text-[12px] text-[#2D3748] text-[700]'>Информация об организации</Typography>
                )}
                <DynamicForm
                    fields={{
                        name: {
                            type: 'select',
                            label: 'Организация',
                            value: formData.organizationId,
                            onChange: handleInputChange,
                            placeholder: 'Выберите вашу организацию',
                            options: organizations?.map((organization) => ({
                                label: organization.name, // Имя категории для отображения
                                value: organization.id, // Уникальный идентификатор категории
                            })) || [],
                        }
                    }}
                    renderFooter={form => <></>}
                />
                <Typography className='py-4 text-lg font-bold'>Информация об организации</Typography>
                <Container className='p-8 bg-slate-100 rounded-lg'>

                    <DynamicForm
                        fields={{
                            name: {
                                type: 'text',
                                label: 'Название актива',
                                value: formData.activeName,
                                onChange: handleInputChange,
                                placeholder: 'Hello',
                                description: 'Осталось 50 символов',
                                validation: z.string().min(3),
                            }
                        }}
                        renderFooter={form => <></>}
                    />
                    <DynamicForm
                        fields={{
                            description: {
                                type: 'richText',
                                label: 'Описание',
                                value: formData.description,
                                onChange: handleInputChange,
                                description: 'Осталось 3000 символов, 10 картинок',
                                placeholder: 'Напишите описание вашего актива',
                                validation: z.string().max(3000),
                            }
                        }}
                        renderFooter={form => <></>}
                    />
                    <DynamicForm
                        fields={{
                            tags: {
                                type: 'text',
                                label: 'Теги',
                                value: formData.tags,
                                onChange: handleInputChange,
                                description: 'Осталось 100 символов',
                                placeholder:
                                    'Укажите теги, которые помогут при поиске, например #дизайн и т.д.',
                                validation: z.string().max(100),
                            }
                        }}
                        renderFooter={form => <></>}
                    />
                    {/* <Textarea cols={3} label='Теги' placeholder='Укажите теги, которые помогут при поиске, например #корм и т.д.'/>
                    <Divider /> */}
                    <Divider />
                    <Typography className='text-lg font-bold'>Параметры актива</Typography>
                    <DynamicForm
                        fields={{
                            minbuy: {

                                type: 'number',
                                label: 'Минимальный взносмость',
                                placeholder: '$ 000',
                                description: '',
                                value: formData.minContribution,
                                onChange: handleInputChange,
                                validation: z.string().max(500),
                            }, buy: {
                                type: 'number',
                                label: 'Цель сбора',
                                placeholder: '$ 000',
                                value: formData.purposeCollection,
                                description: '',
                                onChange: handleInputChange,
                                validation: z.string().max(500),
                            },
                            procen: {
                                type: 'text',
                                label: 'Дата завершения',
                                value: formData.endingDate,
                                placeholder: '0 %',
                                onChange: handleInputChange,
                                validation: z.number().nonnegative(),
                            }
                        }} renderFooter={form => <></>}
                    />
                    <FormWithSwitch />
                    <Divider />
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
                        name='nftId'
                        label={'Загрузите изображение для NFT'}
                        accept={'image/png, image/jpeg, image/jpg'}
                        multiple={true}
                        maxFiles={20}
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
                    <Divider />
                    <Typography className='text-lg font-bold'>Разместить в коллекции</Typography>
                    <CollectionForm></CollectionForm>



                </Container>
                <div className="flex pt-6 space-x-9 w-full">
                    <Button className='flex-1 p-2' variant="outline" color="" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Отправка...' : 'Сохранить черновик'}
                    </Button>
                    <Button type="submit" className='flex-1 p-2' variant="default" color="primary" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Отправка...' : 'Создать актив'}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreateAssetForm;