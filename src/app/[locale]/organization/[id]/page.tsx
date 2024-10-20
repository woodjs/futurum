import { MyOrganization } from '@/widgets/my-organization'
import { OrganizationHeader } from '@/widgets/organization-header'

const OrganizationPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <MyOrganization id={params.id} />
    </div>
  )
}

export default OrganizationPage
