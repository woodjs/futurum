import React from 'react';

interface TextWrapperProps {
  maxLength: number;             // Максимальная длина текста
  placeholder?: string;          // Заменяет '...' при отсутствии текста
  children: string;              // Текст для отображения через children
}

const TextWrapper: React.FC<TextWrapperProps> = ({ children, maxLength, placeholder = '...' }) => {
  if (!children) {
    return <span>{placeholder}</span>; // Если текст пустой, отображаем placeholder
  }

  // Если текст длиннее maxLength, обрезаем и добавляем placeholder вместо многоточий
  const displayText = children.length > maxLength ? `${children.slice(0, maxLength)}${placeholder}` : children;

  return <span>{displayText}</span>;
};

export default TextWrapper;
