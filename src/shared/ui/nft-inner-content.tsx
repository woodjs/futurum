import { FC } from 'react';

interface IProps {
  stylebg?: string; // Свойство для цвета фона
  minCont?: number | undefined;
}

const NftInnerContent: FC<IProps> = ({minCont}) => { // Деструктуризация props для извлечения stylebg
  return (
    <div className={'rounded-lg bg-white-transparent w-full p-[10px] shadow-custom-inset'}>
      <div>
        <div
          className={'w-full h-full flex justify-between items-center'}
           // Используем stylebg как значение фона
        >
          <p className={'text-[10px] text-black font-bold'}>Минимальный вклад: {minCont}</p>
        </div>
      </div>
    </div>
  );
};

export default NftInnerContent;
