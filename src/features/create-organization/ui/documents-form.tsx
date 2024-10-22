'use client'
import { Controller, useFormContext } from 'react-hook-form'
import { documentsFormSchema } from '@/entities/organization'
import { z } from 'zod'
import FileUpload from '@/shared/ui/file-upload'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations()

  return (
    <div className='grid gap-4'>
      {/* Поле для загрузки логотипа */}
      <Controller
        name='logo'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='logo'
            label={t('organization.form.documents.logo.label')}
            accept={imageAccept}
            multiple={false}
            maxFiles={1}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={t(errors.logo?.message as string)}
          />
        )}
      />
      <Controller
        name='presentation'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='presentation'
            label={t('organization.form.documents.presentation.label')}
            accept={pdfAccept}
            multiple={false}
            maxFiles={1}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={t(errors.presentation?.message as string)}
          />
        )}
      />
      <Controller
        name='companyCard'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='companyCard'
            label={t('organization.form.documents.companyCard.label')}
            accept={pdfAccept}
            multiple={false}
            maxFiles={1}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={t(errors.companyCard?.message as string)}
          />
        )}
      />
      <Controller
        name='taxReturn'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='taxReturn'
            label={t('organization.form.documents.taxReturn.label')}
            accept={pdfAccept}
            multiple={false}
            maxFiles={1}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={t(errors.taxReturn?.message as string)}
          />
        )}
      />
      <Controller
        name='financialIndicators'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='financialIndicators'
            label={t('organization.form.documents.financialIndicators.label')}
            accept={pdfAccept}
            multiple={false}
            maxFiles={1}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={t(errors.financialIndicators?.message as string)}
          />
        )}
      />
      <Controller
        name='additionalDocuments'
        control={control}
        render={({ field }) => (
          <FileUpload
            name='additionalDocuments'
            label={t('organization.form.documents.additionalDocuments.label')}
            accept={additionalAccept}
            multiple={true}
            maxFiles={10}
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={t(errors.additionalDocuments?.message as string)}
          />
        )}
      />
    </div>
  )
}

export default DocumentsForm
