'use client'
import { Button, Container, Typography } from '@/shared/ui';
import React, { Fragment, useEffect, useState } from 'react';
import CollectionForm from '../collection-form/CollectionForm';
import Divider from '@/shared/ui/divider';
import Cookies from 'js-cookie'
import FileUpload from '@/shared/ui/file-upload';
import { DynamicForm } from '@/shared/ui/dynamic-form';
import { NormalButton } from '@/shared/ui/normal-button';
import { CREATE_NFT } from '@/shared/api/config';
import { protectedAPI } from '@/shared/api';
import { useRouter } from '@/i18n/routing';
import { errorClientHandler } from '@/shared/api/helpers/auth.helper';
import { FormFields, IFile } from './types';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { register } from 'module';
import { categories_list, collections_list, organizations_list } from './list-default';

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

const ActiveCreate: React.FC = () => {
    // Для всех полей
    const [formData, setFormData] = useState<FormFields>({
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
        nftId: '',
        galeryImagesIds: [''],
        collectionId: '',
    });
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [uploadedFile1, setUploadedFiles1] = useState<IFile[]>([]);
    const [uploadedFiles2, setUploadedFiles2] = useState<IFile[]>([]);
    const [uploadedFiles3, setUploadedFiles3] = useState<IFile[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log('Загрузка данных при первоначальной загрузке страницы');
        const fetchData = async () => {
            setLoading(true);
            try {
                // Замените URL на соответствующие адреса вашего бэкэнда
                const [categoriesResponse, organizationsResponse, collectionsResponse] = await Promise.all([
                    fetch('http://localhost:3000/api/v1/organization-categories'),
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
    }, []); // Пустой массив зависимостей
    const [selectedCollection, setSelectedCollection] = useState<number | string>('');

    const handleCollectionSelect = (value: number | string) => {
        console.log('Выбрана коллекция:', value);
        setSelectedCollection(value);
    };
    const handleFileUpload1 = (files: IFile[]) => {
        const fileItems1: IFile[] = files.map(fileItem => ({
            id: fileItem.id, // Существующий ID
            name: fileItem.name,
            type: fileItem.type,
            url: fileItem.url,
        }));

        setUploadedFiles1(fileItems1);

        // Обновляем documentIds в formData
        setFormData(prevState => ({
            ...prevState,
            documentIds: fileItems1.map(file => file.id), // Проверяем, что это string[]
        }));
    };

    const handleFileUpload2 = (files: IFile[]) => {
        const fileItems2: IFile[] = files.map(fileItem => ({
            id: fileItem.id, // Существующий ID
            name: fileItem.name,
            type: fileItem.type,
            url: fileItem.url,
        }));

        setUploadedFiles2(fileItems2);

        // Обновляем documentIds в formData
        setFormData(prevState => ({
            ...prevState,
            nftId: String(prevState.nftId), // Проверяем, что это string[]
            minContribution: Number(prevState.minContribution) >= 0 ? Number(prevState.minContribution) : 0,
            purposeCollection: Number(prevState.purposeCollection) >= 0 ? Number(prevState.purposeCollection) : 0,
            tags: typeof prevState.tags === 'string' ? prevState.tags.split(' ').filter(tag => tag) : prevState.tags,
        }));
    };

    const handleFileUpload3 = (files: IFile[]) => {
        const fileItems3: IFile[] = files.map(fileItem => ({
            id: fileItem.id, // Существующий ID
            name: fileItem.name,
            type: fileItem.type,
            url: fileItem.url,
        }));

        setUploadedFiles3(fileItems3);

        // Обновляем documentIds в formData
        setFormData(prevState => ({
            ...prevState,
            galeryImagesIds: fileItems3.map(file => file.id), // Проверяем, что это string[]
        }));
    };



    const router = useRouter()

    const handleActive = async () => {
        const { id, cathegory, organizationId,
            headline,
            description,
            tags,
            minContribution,
            purposeCollection,
            endingDate,
            documentIds,
            nftId,
            galeryImagesIds } = formData


        try {
            // Логируем преобразованные значения перед отправкой для отладки
            console.log('Prepared formData:', formData);

            // Отправляем данные
            await protectedAPI.post(CREATE_NFT, formData)
                .then(res => {
                    Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(res.data));
                    router.push('/');
                })
                .catch(error => {
                    console.error('Ошибка при отправке данных:', error);
                    errorClientHandler(error?.errors);
                });
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
        //   await protectedAPI
        //     .post(CREATE_NFT, {
        //       ...formData,
        //     })
        //     .then(res => {

        //       Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(res.data))

        //       router.push('/')
        //     })
        //     .catch(error => {
        //       errorClientHandler(error?.errors)
        //     })
    }

    const handleFormUpdate = (data: Record<string, any>, info: any) => {
        console.log('Form data:', data);
        setFormData(prevState => ({
            ...prevState,
            ...data, // Обновляем существующее состояние с новыми данными
        }));
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Обновление состояния в одном вызове
        setFormData(prevState => ({
            ...prevState,
            minContribution: Number(prevState.minContribution) >= 0 ? Number(prevState.minContribution) : 0,
            purposeCollection: Number(prevState.purposeCollection) >= 0 ? Number(prevState.purposeCollection) : 0,
            tags: typeof prevState.tags === 'string' ? prevState.tags.split(' ').filter(tag => tag) : prevState.tags,

        }));
        console.log(formData)
        try {
            console.log(formData)
            await handleActive(); // Отправка данных на сервер после обновления состояния
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <DynamicForm
                    fields={{
                        cathegory: {
                            name: 'category',
                            type: 'select',
                            value: formData.cathegory,
                            label: 'Категория',
                            placeholder: 'Помощь животным',
                            options: categories?.map((category) => ({
                                label: category.name, // Имя категории для отображения
                                value: category.id, // Уникальный идентификатор категории
                            })) || [],
                        }
                    }}
                    onFormUpdate={handleFormUpdate}
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
                            value: formData.organizationId,
                            placeholder: 'Выберите вашу организацию',
                            options: organizations?.map((organization) => ({
                                label: organization.name, // Имя категории для отображения
                                value: organization.id, // Уникальный идентификатор категории
                            })) || [],
                        }
                    }}
                    onFormUpdate={handleFormUpdate}
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
                                value: formData.activeName,
                                placeholder: 'Hello',
                                description: 'Осталось 50 символов',
                                validation: z.string().min(3),
                            }
                        }}
                        onFormUpdate={handleFormUpdate}
                        renderFooter={form => <></>}
                    />
                    <DynamicForm
                        fields={{
                            description: {
                                name: 'description',
                                type: 'richText',
                                label: 'Описание',
                                value: formData.description,
                                description: 'Осталось 3000 символов, 10 картинок',
                                placeholder: 'Напишите описание вашего актива',
                                validation: z.string().max(3000),
                            }
                        }}
                        onFormUpdate={handleFormUpdate}
                        renderFooter={form => <></>}
                    />
                    <DynamicForm
                        fields={{
                            tags: {
                                name: 'tags',
                                type: 'text',
                                label: 'Теги',
                                value: formData.tags,
                                description: 'Осталось 100 символов',
                                placeholder:
                                    'Укажите теги, которые помогут при поиске, например #дизайн и т.д.',
                                validation: z.string().max(100),
                            }
                        }}
                        onFormUpdate={handleFormUpdate}
                        renderFooter={form => <></>}
                    />
                    {/* <Textarea cols={3} label='Теги' placeholder='Укажите теги, которые помогут при поиске, например #корм и т.д.'/>
                    <Divider /> */}
                    <Divider />
                    <Typography className='text-lg font-bold'>Параметры актива</Typography>
                    <DynamicForm
                        fields={{
                            minContribution: {
                                name: 'minContribution',
                                type: 'number',
                                label: 'Минимальный взносмость',
                                placeholder: '$ 000',
                                description: '',
                                value: formData.minContribution,
                                validation: z.number().min(1),
                            }, purposeCollection: {
                                name: 'purposeCollection',
                                type: 'number',
                                label: 'Цель сбора',
                                placeholder: '$ 000',
                                value: formData.purposeCollection,
                                description: '',
                                validation: z.number().min(1),
                            },
                            endingDate: {
                                name: 'endingDate',
                                type: 'text',
                                label: 'Дата завершения',
                                value: formData.endingDate,
                                placeholder: '0 %',
                                validation: z.number().nonnegative(),
                            }
                        }}
                        onFormUpdate={handleFormUpdate}
                        renderFooter={form => <></>}
                    />

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
                    <Divider />
                    <Typography className='text-lg font-bold'>Разместить в коллекции</Typography>
                    <CollectionForm onCollectionSelect={handleCollectionSelect} />



                </Container>
                <div className="flex pt-6 space-x-9 w-full">

                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </>
    );

};

export default ActiveCreate;