import UpdateProduct from '@/components/private/forms/UpdateProduct'
import { getProductById } from '@/lib/db/querys'

type TSearchParams = {
  params: Promise<{ id: string }>
}
export default async function page({ params }: TSearchParams) {
  const id = (await params).id;
  const data = await getProductById(id)
  return (
    <div className='flex justify-center'>
      <UpdateProduct props={data} />
    </div>
  )
}
