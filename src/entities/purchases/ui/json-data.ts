// Пример входящего JSON
const jsonData = {
    "data": [
      {
        "id": 0,
        "cathegory": "Бизнес",
        "organizationId": "696aa952-aa13-4076-9ace-c638c3c11845",
        "activeName": "hello",
        "headline": "Head line",
        "description": "Description",
        "tags": [
          "#nice",
          "#good"
        ],
        "minContribution": 100,
        "purposeCollection": 10000,
        "endingDate": "2024-07-30T13:18:01.145Z",
        "documentIds": [
          "696aa952-aa13-4076-9ace-c638c3c11845"
        ],
        "nftId": "696aa952-aa13-4076-9ace-c638c3c11845",
        "galeryImagesIds": "696aa952-aa13-4076-9ace-c638c3c11845"
      }
    ],
    "hasNextPage": true
  };
  
  // Парсинг данных
  const { data, hasNextPage } = jsonData;
  
  // Пример использования данных
  data.forEach(item => {
    console.log(`ID: ${item.id}`);
    console.log(`Категория: ${item.cathegory}`);
    console.log(`Название: ${item.activeName}`);
    console.log(`Заголовок: ${item.headline}`);
    console.log(`Описание: ${item.description}`);
    console.log(`Теги: ${item.tags.join(', ')}`);
    console.log(`Минимальный взнос: ${item.minContribution}`);
    console.log(`Цель сбора: ${item.purposeCollection}`);
    console.log(`Дата окончания: ${new Date(item.endingDate).toLocaleString()}`);
    console.log(`ID документов: ${item.documentIds.join(', ')}`);
    console.log(`NFT ID: ${item.nftId}`);
    console.log(`ID изображений галереи: ${item.galeryImagesIds}`);
    console.log('--------------------------------');
  });
  
  // Состояние пагинации
  console.log(`Есть ли следующая страница: ${hasNextPage}`);
  