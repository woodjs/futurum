import { IPurchaseItem } from '@/entities/purchases'
import PurchaseCard from '@/entities/purchases/ui/purchase-card'
import Loader from '@/shared/ui/loader'
import { Skeleton } from '@/shared/ui/skeleton'
import { faker } from '@faker-js/faker'
import Menu from './menu'

const generatePurchaseItems = (count: number): IPurchaseItem[] => {
  const purchaseItems: IPurchaseItem[] = []

  for (let i = 0; i < count; i++) {
    const purchaseItem: IPurchaseItem = {
      id: faker.string.uuid(),
      image: `/images/nfts/profit-${faker.number.int({ min: 1, max: 5 })}.jpg`,
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      type: faker.word.words(),
      category: faker.word.words(1),
      tag: `#${faker.word.words(1)}`,
      params: [
        {
          title: faker.finance.transactionType(),
          value: faker.finance.amount(),
        },
        {
          title: faker.finance.transactionType(),
          value: faker.finance.amount(),
        },
      ],
      author: {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        image: '',
      },
      expired: faker.date.future(),
      likes: faker.number.int({ min: 0, max: 100 }),
      isLiked: faker.datatype.boolean(),
      purchaseDate: faker.date.past(),
    }

    purchaseItems.push(purchaseItem)
  }

  return purchaseItems
}

const purchaseList: IPurchaseItem[] = generatePurchaseItems(30)

const isLoading = false
const isSuccess = true

export const PurchaseList = () => {
  return (
    <div className={'flex flex-wrap gap-[24px]'}>
      {isLoading &&
        purchaseList.map((item, index) => (
          <div className='w-[220px]' key={item.id}>
            <Skeleton className='h-[344px] w-full rounded-2xl' />
            <Skeleton className='mt-4 h-3 w-1/3 rounded-full' />
            <Skeleton className='mt-1 h-5 w-2/3 rounded-full' />
          </div>
        ))}
      {isSuccess &&
        purchaseList.map((item, index) => (
          <PurchaseCard
            menuSlot={<Menu id={item.id} />}
            key={item.id}
            {...item}
          />
        ))}
    </div>
  )
}
