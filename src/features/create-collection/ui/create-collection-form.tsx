import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/ui';
import { useCreateCollection } from '@/entities/collections';
import { ICollection } from '@/entities/collections/model';
import { useGetCollectionList } from '@/entities/collections/api/hooks/use-get-collections-list';

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
}


const CollectionForm: React.FC<CollectionFormProps> = ({ onCollectionSelect }) => {
    const { register, handleSubmit, setValue } = useForm();
    const { data: collectionData, isLoading } = useGetCollectionList({});


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

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedCollection(selectedValue);
        onCollectionSelect(selectedValue); // Передача значения напрямую
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
            },
            onError: (error) => {
                console.error('Ошибка при создании коллекции:', error);
            },
        });
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Выберите коллекцию</label>
                <select
                    value={selectedCollection}
                    onChange={handleSelectChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Выберите коллекцию</option>
                    {(collections || []).map((collection) => (
                        <option
                            key={collection.id}
                            value={collection.id}
                            style={{ color: collection.color }}
                        >
                            {collection.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center mb-4">
                <button
                    type="button"
                    onClick={() => setIsDialogOpen(true)}
                    className="items-center px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                    + Создать коллекцию
                </button>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
                                onClick={() => setIsDialogOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                            >
                                Отмена
                            </Button>
                            <Button
                                type="button"
                                onClick={handleCreateCollection}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
