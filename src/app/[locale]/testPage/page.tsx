import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

export default function TestPage() {
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
          <div>TestOne</div>
        </TabsContent>
        <TabsContent value='testTwo'>
          <div>TestTwo</div>
        </TabsContent>
        <TabsContent value='testThree'>
          <div>TestThree</div>
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
