import { FC } from 'react'
import { IOrganizationDocuments } from '../model'
import FileList from '@/shared/ui/file-list'

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

  return (
    <div className='mt-6 grid gap-6 text-black'>
      {presentation && (
        <div className=''>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-xl font-bold'>Презентация</div>
            {edit && edit({ id })}
          </div>
          <FileList files={[presentation]} />
        </div>
      )}

      {companyCard && (
        <div className=''>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-xl font-bold'>Карта компании</div>
            {edit && edit({ id })}
          </div>
          <FileList files={[companyCard]} />
        </div>
      )}

      {taxReturn && (
        <div className=''>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-xl font-bold'>Налоговый вычет</div>
            {edit && edit({ id })}
          </div>
          <FileList files={[taxReturn]} />
        </div>
      )}

      {financialIndicators && (
        <div className=''>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-xl font-bold'>Финансовые показатели</div>
            {edit && edit({ id })}
          </div>
          <FileList files={[financialIndicators]} />
        </div>
      )}

      {additionalDocuments && (
        <div className=''>
          <div className='mb-4 flex items-center justify-between'>
            <div className='text-xl font-bold'>Дополнительные документы</div>
            {edit && edit({ id })}
          </div>
          <FileList files={additionalDocuments} />
        </div>
      )}
    </div>
  )
}
