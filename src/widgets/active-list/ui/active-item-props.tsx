// Blogdata.tsx
import React from 'react';
import { IActiveDN2 } from '@/entities/actives';
import { API_URL_FILE } from '@/shared/api/config';

const ActiveData: React.FC<IActiveDN2> = ({ data }) => {
    return (
        <div className="blog-data">
            <h1>{data.activeName}</h1>
            <p><strong>Категория:</strong> {data.cathegory}</p>
            <p><strong>Организация:</strong> {data.organizationId}</p>
            <p><strong>Описание:</strong></p>
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>

            <h2>Информация о сборе</h2>
            <p><strong>Цена:</strong> {data.price}</p>
            <p><strong>Доходность:</strong> {data.profitability}</p>
            <p><strong>Частота выплат:</strong> {data.payoutFrequency}</p>
            <p><strong>Период активности:</strong> {data.activityPeriod} дней</p>
            <p><strong>Дата окончания:</strong> {new Date(data.endingDate).toLocaleDateString()}</p>
            <p><strong>С возможностью продления:</strong> {data.withPossibilityOfExtension ? 'Да' : 'Нет'}</p>
            <p><strong>Цель сбора:</strong> {data.purposeOfCollection}</p>
            <p><strong>Ссылка на фонд:</strong> <a href={data.fundUrl}>{data.fundUrl}</a></p>

            <h2>Теги</h2>
            <ul>
                {data.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>

            <h2>Материалы</h2>
            <div dangerouslySetInnerHTML={{ __html: data.additionalMaterials }}></div>

            <h2>Документы</h2>
            <ul>
                {data.documentIds.map((doc, index) => (
                    <li key={index}><a href={doc}>Документ {index + 1}</a></li>
                ))}
            </ul>

            <h2>Галерея</h2>
            <div className="flex gallery gap-2">
                
                    <div className="w-10 h-10">
                        <img  src={API_URL_FILE + data.galeryImagesIds} />
                    </div>
                
            </div>

            <h2>Коллекция</h2>
            <p><strong>Название:</strong> {data.collection.name}</p>
            <p><strong>Цвет:</strong> {data.collection.color}</p>
            <p><strong>ID пользователя:</strong> {data.collection.userId}</p>
        </div>
    );
};

export default ActiveData;
