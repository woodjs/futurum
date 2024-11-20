'use client'

import { Button, Typography } from '@/shared/ui'
import { DynamicForm } from '@/shared/ui/dynamic-form'
import FileUpload from '@/shared/ui/file-upload'
import { useTranslations } from 'next-intl'
import { Fragment } from 'react'
import { z } from 'zod'

export const CreateAssetForm = () => {
  const t = useTranslations('assets')

  return (
    <Fragment>
      <DynamicForm
        fields={{
          name: {
            type: 'text',
            label: 'Название актива',
            placeholder: 'Hello',
            validation: z.string().min(3),
          },
          description: {
            type: 'richText',
            label: 'Описание',
            placeholder: 'Напишите описание вашего актива',
            validation: z.string().max(3000),
          },
          tags: {
            type: 'text',
            label: 'Теги',
            placeholder:
              'Укажите теги, которые помогут при поиске, например #дизайн и т.д.',
            validation: z.string().max(100),
          },
          link: {
            type: 'text',
            label: 'Ссылка на актив/товар',
            placeholder: 'Это пользователь получит после приобретения NFT.',
            validation: z.string().max(500),
          },
          price: {
            type: 'number',
            label: 'Стоимость',
            placeholder: '$1000',
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
      />

      <Typography className='py-8 text-lg font-bold'>Документы</Typography>

      <FileUpload
        name='logo'
        label={'Загрузите изображение для NFT'}
        accept={'image/png, image/jpeg, image/jpg'}
        multiple={false}
        maxFiles={1}
        required={true}
        // value={avatar}
        // onChange={handleFileUpload}
        // error={avatarError}
      />

      <Typography className='py-4 text-[#A0AEC0E5]'>
        Обратите внимание, что изображение должно быть вертикальным, так как оно
        обрежется под формат NFT. Рекомендуем использовать фотографии, сделанные
        непосредственно вами, или картинки, сгенерированные нейросетью. Не
        рекомендуем использовать чужие изображения, взятые со стоков.
      </Typography>

      <FileUpload
        name='logo'
        label={'Загрузите изображения для галереи'}
        accept={'image/png, image/jpeg, image/jpg'}
        multiple={true}
        maxFiles={20}
        required={true}
        // value={avatar}
        // onChange={handleFileUpload}
        // error={avatarError}
      />

      <Typography className='pb-4 pt-8 text-[#A0AEC0E5]'>
        *загрузка документов повысит уровень доверия к компании и увеличит
        вероятность выбора для инвестиций. <br /> <br /> В случае несогласия
        публичного доступа вы можете открывать доступ к файлам по запросу,
        ознакомившись с информацией о пользователе, который запрашивает доступ
        или связаться с ним через сообщения в профиле. Чтобы сделать документ с
        закрытым доступом, необходимо после загрузки файла установить значок
        “Замок” в окошке на файле.
      </Typography>

      <div className='flex w-full justify-end'>
        <Button>Создать актив</Button>
      </div>
    </Fragment>
  )
}
