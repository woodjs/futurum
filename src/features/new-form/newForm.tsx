'use client'
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import FileUpload from '@/shared/ui/file-upload';

interface IFile {
  id: string;
  name: string;
  type: string;
  url: string;
}

const MyFormComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', // Пример текстового поля
    email: '', // Еще одно текстовое поле
  });
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (files: IFile[]) => {
    setUploadedFiles(files);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Данные формы:', formData);
    console.log('Загруженные файлы:', uploadedFiles);

    // Дополнительная логика отправки данных на сервер или дальнейшая обработка
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <FileUpload
        name="documents"
        label="Загрузите файлы"
        accept="image/png, image/jpeg, image/jpg"
        multiple={true}
        maxFiles={5}
        required={true}
        onChange={handleFileUpload} // Передаем обработчик для обновления файлов
      />

      <button type="submit">Отправить</button>
    </form>
  );
};

export default MyFormComponent;
