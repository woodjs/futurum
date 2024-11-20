'use client'
import { FC } from 'react'
import { IOrganizationDocuments } from '../model'
import FileList from '@/shared/ui/file-list'
import { useTranslations } from 'next-intl'
import EmptyView from './empty'

interface IDocumentsViewProps extends IOrganizationDocuments {
  id: string
  edit?: FC<{ id: string }>
}

export const DocumentsView: FC<IDocumentsViewProps> = props => {
  const {
    presentation,
    companyCard,
    taxReturn,
    financialIndicators,
    additionalDocuments,
    id,
    edit,
  } = props

  const t = useTranslations()

  return (
    <div className='mt-6 grid gap-6 text-black'>
      {presentation && (
        <div className=''>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-xl font-bold'>
              {t('organization.view.presentation')}
            </div>
            {edit && edit({ id })}
          </div>
          <FileList files={[presentation]} />
        </div>
      )}
      {!presentation && edit && (
        <EmptyView
          isFile
          title={t('organization.view.presentation')}
          edit={edit}
          id={id}
        />
      )}

      {companyCard && (
        <div className=''>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-xl font-bold'>
              {t('organization.view.companyCard')}
            </div>
            {edit && edit({ id })}
          </div>
          <FileList files={[companyCard]} />
        </div>
      )}

      {!companyCard && edit && (
        <EmptyView
          isFile
          title={t('organization.view.companyCard')}
          edit={edit}
          id={id}
        />
      )}

      {taxReturn && (
        <div className=''>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-xl font-bold'>
              {t('organization.view.taxDeduction')}
            </div>
            {edit && edit({ id })}
          </div>
          <FileList files={[taxReturn]} />
        </div>
      )}

      {!taxReturn && edit && (
        <EmptyView
          isFile
          title={t('organization.view.taxDeduction')}
          edit={edit}
          id={id}
        />
      )}

      {financialIndicators && (
        <div className=''>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-xl font-bold'>
              {t('organization.view.financialIndicators')}
            </div>
            {edit && edit({ id })}
          </div>
          <FileList files={[financialIndicators]} />
        </div>
      )}

      {!financialIndicators && edit && (
        <EmptyView
          isFile
          title={`${t('organization.view.financialIndicators')}`}
          edit={edit}
          id={id}
        />
      )}

      {additionalDocuments && (
        <div className=''>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-xl font-bold'>
              {t('organization.view.additionalDocuments')}
            </div>
            {edit && edit({ id })}
          </div>
          <FileList files={additionalDocuments} />
        </div>
      )}

      {!additionalDocuments && edit && (
        <EmptyView
          isFile
          title={t('organization.view.additionalDocuments')}
          edit={edit}
          id={id}
        />
      )}
    </div>
  )
}
