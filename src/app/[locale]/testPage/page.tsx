import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import Loader from '../../../shared/ui/loader'
import { RangeSlider } from '../../../shared/ui/range-slider'
import Table from '../../../shared/ui/table'

export default function TestPage() {
  const onValueChange = (values: number[]): void => {
    console.log(values)
  }

  return (
    <div className='p-10'>
      <Tabs defaultValue='account' className='w-full'>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='testOne'>TestOne</TabsTrigger>
          <TabsTrigger value='testTwo'>TestTwo</TabsTrigger>
          <TabsTrigger value='testThree'>TestThree</TabsTrigger>
          <TabsTrigger value='testFour'>TestFour</TabsTrigger>
          <TabsTrigger value='testFive'>TestFive</TabsTrigger>
        </TabsList>
        <TabsContent value='testOne'>
          <Loader />
        </TabsContent>
        <TabsContent value='testTwo'>
          <RangeSlider
            min={0}
            max={100}
            minStepsBetweenThumbs={1}
            step={1}
            value={[1, 2]}
          />
        </TabsContent>
        <TabsContent value='testThree'>
          <Table />
        </TabsContent>
        <TabsContent value='testFour'>
          <div>TestFour</div>
        </TabsContent>
        <TabsContent value='testFive'>
          <div>TestFive</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
