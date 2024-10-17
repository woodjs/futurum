'use client'
import { Controller, useFormContext } from 'react-hook-form'
import { documentsFormSchema } from '@/entities/organization'
import { z } from 'zod'
import FileUpload from '@/shared/ui/file-upload'

// Типизация для значений формы
type DocumentsFormValues = z.infer<typeof documentsFormSchema>
const imageAccept = 'image/png, image/jpeg, image/jpg'
const pdfAccept = 'application/pdf'
const additionalAccept =
  'image/png, image/jpeg, image/jpg, image/webp, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.presentationml.presentation'

const DocumentsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<DocumentsFormValues>()

  return (
    <div className='grid gap-4'>
      {/* Поле для загрузки презентации */}
      <Controller
        name='logo'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='logo'
            label='Логотип организации'
            accept={imageAccept}
            multiple={false}
            maxFiles={1}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={errors.presentation?.message as string}
          />
        )}
      />
      <Controller
        name='presentation'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='presentation'
            label='Презентация компании (PDF)'
            accept={pdfAccept}
            multiple={false}
            maxFiles={1}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={errors.presentation?.message as string}
          />
        )}
      />

      <Controller
        name='companyCard'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='companyCard'
            label='Карточка компании (PDF)'
            accept={pdfAccept}
            multiple={false}
            maxFiles={1}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={errors.companyCard?.message as string}
          />
        )}
      />

      <Controller
        name='taxReturn'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='taxReturn'
            label='Налоговая декларация (PDF)'
            accept={pdfAccept}
            multiple={false}
            maxFiles={1}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={errors.taxReturn?.message as string}
          />
        )}
      />

      <Controller
        name='financialIndicators'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='financialIndicators'
            label='Финансовые показатели (PDF)'
            accept={pdfAccept}
            multiple={false}
            maxFiles={1}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={errors.financialIndicators?.message as string}
          />
        )}
      />

      <Controller
        name='additionalDocuments'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='additionalDocuments'
            label='Дополнительные документы (до 10, PNG, JPG, PDF, DOCX, XLSX)'
            accept={additionalAccept}
            multiple={true}
            maxFiles={10}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={errors.additionalDocuments?.message as string}
          />
        )}
      />
    </div>
  )
}

export default DocumentsForm
