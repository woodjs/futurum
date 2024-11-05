import { ICollectListFilters } from '@/entities/active';
import { useGetCollectList } from '@/entities/active/api';
import { useCreateCollection } from '@/entities/active/api/hooks/use-create-collects';
import { Button } from '@/shared/ui';
import React, { useState } from 'react';

interface Collection {
  name: string;
  color: string;
}

interface CollectionFormProps {
  onCollectionSelect: (selectedCollection: number | string) => void;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ onCollectionSelect }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<number | string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionColor, setNewCollectionColor] = useState('#000000');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCollection(selectedValue);
    onCollectionSelect(selectedValue); // Передача значения в родительский компонент
  };

  const { data: activeData } = useGetCollectList();
  const newCollection: Collection = {
    name: newCollectionName,
    color: newCollectionColor,
  };
  const handleCreateCollection = () => {


    // Вызов функции мутации для отправки данных на сервер
    createCollection(newCollection, {
      onSuccess: () => {
        setCollections([...collections, newCollection]);
        
        setIsDialogOpen(false);
      },
      onError: (error) => {
        console.error('Ошибка при создании коллекции:', error);
      },
    });
  };
  const { mutate: createCollection } = useCreateCollection(newCollection);

  return (
    <div className="p-4">
      {/* Select для выбора коллекции */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Выберите коллекцию</label>
        <select
          value={selectedCollection}
          onChange={handleSelectChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Выберите коллекцию</option>
          {activeData?.data.map((collection) => (
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

      {/* Кнопка для открытия формы создания новой коллекции */}
      <div className="flex items-center mb-4">
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className=""
        >
          <span className="items-center px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">+</span> Создать коллекцию
        </button>
      </div>

      {/* Модальное окно для создания новой коллекции */}
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
