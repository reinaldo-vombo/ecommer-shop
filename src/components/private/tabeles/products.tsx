'use client'

import { useCallback, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, SortAsc, SortDesc, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import SheetModal from '@/components/shared/SheetModal'
import Link from 'next/link'
import { TProduct } from '@/components/shared/product/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { createQueryString } from '@/lib/utils'
import { FILTER_ITEMS, SORT_ITEM } from '@/constants/site-content'
// import AlertModal from '@/components/shared/AlertModal'
import { ScrollArea } from '@/components/ui/scroll-area'
import ProductDetails from '../product/OverView'

type Product = {
   id: number;
   name: string;
   image: string;
   price: number;
   status: string;
   sold: number;
   returned: number;
};
type TProps = {
   props: TProduct[]
}

type TSort = {
   key: keyof Product | null; // Use keyof to restrict to valid keys
   direction: 'ascending' | 'descending'; // Specify the possible values
};
// Sample product data '/product/NIKE+AIR+MAX+PLUS.png'


const ProductTable = ({ props }: TProps) => {
   const [products, setProducts] = useState(props)
   const [sortConfig,] = useState<TSort>({ key: null, direction: 'ascending' })
   const [currentPage, setCurrentPage] = useState(1)
   const itemsPerPage = 5
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();
   const query = searchParams.get('search')?.toString() || '';
   const filter = searchParams.get('filter')?.toString() || '';

   useEffect(() => {
      if (query) {
         const filtered = props.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
         );
         setProducts(filtered);
      } else {
         setProducts(props); // Reset to original products if no query
      }
   }, [query]);

   const handleSearch = useDebouncedCallback((term) => {

      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('search', term);
      } else {
         params.delete('search');
      }
      replace(`${pathname}?${params.toString()}`);
   }, 300);

   // const handleDelete = (id: number) => {
   //    setProducts(products.filter(product => product.id !== id))

   // }

   const filteredProducts = products
      .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
   // .filter(product => {
   //    if (activeFilter === 'new') return product.status === 'new'
   //    if (activeFilter === 'mostSold') return product.sold >= 50
   //    if (activeFilter === 'returned') return product.returned > 0
   //    return true
   // })
   // .sort((a, b) => {
   //    if (sortConfig.key === null) return 0
   //    const aValue = a[sortConfig.key]
   //    const bValue = b[sortConfig.key]
   //    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1
   //    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1
   //    return 0
   // })
   const pageCount = Math.ceil(filteredProducts.length / itemsPerPage)
   const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   )
   const generateQueryString = useCallback(
      (name: string, value: string) => createQueryString(searchParams, name, value),
      [searchParams]
   );

   return (
      <div className="container mx-auto p-4">
         <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-64">
               <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
               <Input
                  type="text"
                  placeholder="Procurar productos..."
                  onChange={(e) => {
                     handleSearch(e.target.value);
                  }}
                  defaultValue={searchParams.get('query')?.toString()}
                  className="pl-8"
               />
            </div>
            <div className="flex flex-wrap gap-2">
               {FILTER_ITEMS.map((filters) => (
                  <Button variant={filter === filters.key ? 'default' : 'outline'} key={filters.id}>
                     <Link href={pathname + '?' + generateQueryString('filter', filters.key)}>
                        {filters.name}
                     </Link>
                  </Button>
               ))}
            </div>
         </div>
         <div className="overflow-x-auto">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Image</TableHead>
                     {SORT_ITEM.map((sort) => (
                        <TableHead key={sort.id}>
                           <Link href={pathname + '?' + generateQueryString(sort.query, sort.key)} className="flex items-center">
                              {sort.name}
                              {sort.name === sort.name && (
                                 sortConfig.direction === 'ascending' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
                              )}
                           </Link>
                        </TableHead>
                     ))}
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {paginatedProducts.map((product) => (
                     <TableRow key={product.id}>
                        <TableCell>
                           <Image src={product.image} width={50} height={50} alt={product.name} className="object-cover rounded-md" />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>
                           <div className="flex space-x-2">
                              <Link href='update-product' className='border border-slate-200 rounded-lg' aria-label={`Editar ${product.name}`}><Edit className="h-4 w-4" /></Link>

                              <SheetModal label={`Edit ${product.name}`} trigger={<Eye className="h-4 w-4" />} side='right' className='sm:min-w-[34rem]'>
                                 <ScrollArea className='h-[700px]'>
                                    <ProductDetails props={product} />
                                 </ScrollArea>
                                 hello
                              </SheetModal>
                              {/* <AlertModal className='border border-slate-200 rounded-lg' onSubmit={() => handleDelete(product.id)} trigger={<Trash2 className="h-4 w-4" />} label={`Delete ${product.name}`} /> */}
                              <Trash2 className="h-4 w-4" />
                           </div>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
         <div className="mt-4 flex justify-between items-center">
            <div>
               Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
            </div>
            <div className="flex items-center space-x-2">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
               >
                  <ChevronLeft className="h-4 w-4" />
               </Button>
               <span>{currentPage} of {pageCount}</span>
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                  disabled={currentPage === pageCount}
                  aria-label="Next page"
               >
                  <ChevronRight className="h-4 w-4" />
               </Button>
            </div>
         </div>
      </div>
   )
}
export default ProductTable;