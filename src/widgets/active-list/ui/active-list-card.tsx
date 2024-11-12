'use client'
import { IActiveListcollection, IActiveListDocLink, IActiveListGaleryImageLink, IActiveListTag } from '@/entities/actives';
import { API_URL_FILE } from '@/shared/api/config'
import { GradientTypography } from '@/shared/ui';
import ActiveBodyCard from '@/shared/ui/active-card';
import ActiveFooter from '@/shared/ui/active-footer';
import ActiveInnerContent from '@/shared/ui/active-inner-content';
import NftImage from '@/shared/ui/nft-image';
import NftcardHeader from '@/shared/ui/nftcard-header';
import Link from 'next/link';
import { Button } from 'react-day-picker';
import { format } from 'date-fns'
import { getDateLocale } from '@/shared/lib/get-date-locale';
import { useRouter } from 'next/router';


interface IActiveList {
    id: string;
    nft: string;
    activeName: string;
    description: string;
    purposeCollection: number;
    cathegory: string;
    endingDate: string;
    minContribution: number;
    collection: IActiveListcollection;
    tags: IActiveListTag[];
    organization: string;
    headline: string;
    documents: IActiveListDocLink[];
    galeryImages: IActiveListGaleryImageLink[];
  }
  
  interface IActiveListProps {
    item: IActiveList;
  }
  
  const ActiveListItems: React.FC<IActiveListProps> = ({ item }) => {

        const ActiveItems: IActiveList = {
        id: item.id,
        nft: API_URL_FILE + item.nft,
        activeName: item.activeName,
        description: item.description,
        purposeCollection: item.purposeCollection,
        cathegory: item.cathegory,
        endingDate: item.endingDate,
        minContribution: item.minContribution,
        collection: item.collection,
        tags: item.tags,
        organization: item.organization,
        headline: item.headline,
        documents: item.documents,
        galeryImages: item.galeryImages,
    }
    console.log("item")
    console.log(item)
    // const locale = useLocale()

    return (
      <div className='flex gap-6 ' >
        <ActiveBodyCard
          Header={<NftcardHeader tags={item.tags} />}
          Image={<NftImage imageSrc={API_URL_FILE + item.nft} />}
          Content={<ActiveInnerContent content={item.minContribution} />}
          Footer={<ActiveFooter ButtonSlot={"ntrcn"} price={item.purposeCollection.toString()} stylebg={item.collection.color} />}
        />
        
        <div className='flex flex-col space-between justify-between '>

          <div className="">
            <div className={'mt-2 text-xs text-slate-500 max-h-[]180px'}>
              {/* {format(item.endingDate || item.purposeCollection, 'dd MMMM HH:MM', {
                locale: getDateLocale(locale),
              })} */}
            </div>
            <GradientTypography className='mt-4 text-4xl'>
              <Link href={`/active/${item.id}`}>
                {item.activeName}
              </Link>
            </GradientTypography>
            <div className='w-[600px]'>
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
            <div className="h-[70px] w-[290px] flex justify-between">
              <div className="">
                <div className=""></div>
              </div>
            </div>
          </div>




          {/* <Typography className='py-4 text-lg'>{description}</Typography> */}
          {/* <div className='flex'><span>Активный</span><ActiveCardTimer content={ endingDate || '40d:12h:06m'} /></div>
            <div>иконки</div> */}
          <Button type='button' className='w-[320px]'>Поместить в Топ</Button>
        </div>
      </div>
    );
  };
  
  export default ActiveListItems;
  