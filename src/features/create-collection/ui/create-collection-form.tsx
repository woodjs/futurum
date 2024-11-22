import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui';
import { useCreateCollection } from '@/entities/collections';
import { ICollection } from '@/entities/collections/model';
import { useGetCollectionList } from '@/entities/collections/api/hooks/use-get-collections-list';
import { DynamicForm } from '@/shared/ui/dynamic-form';
import AddCollectionIcon from '@/shared/icons/AddCollectionIcon';
import DeleteFileIcon from '@/shared/icons/DeleteFileIcon';
import { IActiveResponseById2 } from '@/entities/actives';
import { UseQueryResult } from '@tanstack/react-query';

interface IOption {
    id?: string;
    name: string;
    color: string;
}

interface IOptionListProps {
    CollList: IOption[];
}

interface CollectionFormProps {
    onCollectionSelect: (selectedCollection: number | string) => void;
    currentActiveData?: UseQueryResult<IActiveResponseById2, Error>;
    isselectedCollection?: string | number
}


const CollectionForm: React.FC<CollectionFormProps> = ({ onCollectionSelect, currentActiveData, isselectedCollection }) => {
    const { register, handleSubmit, setValue } = useForm();
    const { data: collectionData, isLoading, refetch } = useGetCollectionList({});


    const [collections, setCollections] = useState<IOption[]>();

    useEffect(() => {
        // Проверяем, что activeData и activeData.actives определены
        if (collectionData?.data) {
            setCollections(collectionData.data);
        }
    }, [collectionData]);

    const [selectedCollection, setSelectedCollection] = useState<number | string>('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [newCollectionColor, setNewCollectionColor] = useState('#000000');
    const { mutate: createCollection } = useCreateCollection();

    const handleSelectChange = (data: { cathegory?: any }) => {
        const selectedValue = data.cathegory;
        setSelectedCollection(selectedValue);
        onCollectionSelect(selectedValue); // Passing the value directly
    };

    const handleCreateCollection = () => {
        const newCollection = {
            name: newCollectionName,
            color: newCollectionColor,
        };

        createCollection(newCollection, {
            onSuccess: () => {
                setCollections((prevCollections) => [...(prevCollections || []), newCollection]);
                setIsDialogOpen(false);
                setNewCollectionName('');
                setNewCollectionColor('#000000');
                refetch()
            },
            onError: (error) => {
                console.error('Ошибка при создании коллекции:', error);
            },
        });
        
    };

    return (
        <div className="">
            <div className="mb-4">
                <DynamicForm
                    fields={{
                        cathegory: {
                            name: 'collection',
                            type: 'select',
                            label: 'Выбрать коллекцию',
                            placeholder: 'Выберите коллекцию',
                            options: collections?.map((collection) => ({
                                label: collection.name, 
                                value: collection.id!, 
                            })) || [],
                        }
                    }}
                    onFormUpdate={handleSelectChange}
                    defaultValue={collections ? (collections.find(collection => collection.id === isselectedCollection))?.name : ""}
                    renderFooter={form => <></>}
                />
            </div>

            <div className="flex items-center mb-4">
                <button
                    type="button"
                    onClick={() => setIsDialogOpen(true)}
                    className="flex flex-row items-center gap-[8px]"
                >
                    <AddCollectionIcon />
                    <p className="text-[14px] font-[700] text-[#046EB5]">Новая коллекция</p>
                </button>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
                        <button
                            type='button'
                            onClick={() => setIsDialogOpen(false)}
                            className='absolute top-6 right-4 text-sm text-red-600 underline p-1'
                        >
                            <DeleteFileIcon />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Создать новую коллекцию</h2>
                        <input
                            type="text"
                            placeholder="Название коллекции"
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                        <label className="block mb-2 text-gray-700">Выберите цвет</label>
                        <input
                            type="color"
                            value={newCollectionColor}
                            onChange={(e) => setNewCollectionColor(e.target.value)}
                            className="w-full mb-4 h-10 cursor-pointer"
                        />
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                onClick={handleCreateCollection}
                                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                            >
                                Сохранить
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollectionForm;
