"use client"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { updateProductSchema } from '@/lib/form-validation'
import TextEditor from '@/components/shared/TextEditor'
import { BRAND, CATEGORIES, GENDER, PRODUCT_TYPE, C_SIZES, SIZES_NUMBER, initialState } from '@/constants/site-content'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Modal from '@/components/shared/Moadal'
import { Button } from '@/components/ui/button'
import Selector from '@/components/shared/Selector'
import { toast } from 'sonner'
import { Toggle } from '@/components/ui/toggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { deleteProduct, updateProduct } from '@/lib/actions/product'
import SubmitButton from '@/components/shared/SubmitButton'
import ModalButton from '../product/ModalButton'
import ColorPiker from '@/components/shared/ColorPiker'
import { TProductProps } from '@/components/shared/product/types'
import { useEffect } from 'react'
import UpdateFileUploader from '@/components/shared/file-uplode/UpdateFile'
import MultipleSelect from '@/components/shared/MultipleSelect'
import ActionDialog from '@/components/shared/ActionModal'
import { Trash } from 'lucide-react'
import FileUploader from '@/components/shared/file-uplode/FileUploder'

const UpdateProduct = ({ props }: TProductProps) => {

   const form = useForm<z.infer<typeof updateProductSchema>>({
      resolver: zodResolver(updateProductSchema),
      defaultValues: {
         name: "",
         description: "",
         details: "",
         brand: props.brand || "",
         category: [],
         gender: props.gender || "",
         // status: "Publicado",
         image: "",
         colors: [{ color: '', images: [] }],
         type: "Sapatos",
         sizes: [],
         price: "",
         stock: ""
      },
   })

   async function onSubmit(value: z.infer<typeof updateProductSchema>) {
      console.log(value);

      const result = await updateProduct(initialState, value, props.id)
      if (result?.error) {
         toast.error(result.message)
      }
      if (result?.success) {
         toast.success(result.message)
      }
   }
   async function handleDelete() {
      const result = await deleteProduct(initialState, props.id)
      if (result?.error) {
         toast.error(result.message)
      }
      if (result?.success) {
         toast.success('Produto eliminado')
         // Handle form submission
      }
   }
   const { control, reset } = form;
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'colors',
   })
   useEffect(() => {
      if (props) {
         reset({
            name: props.name || "",
            description: props.description || "",
            details: props.details || "",
            brand: props.brand || "",
            category: props.category || [],
            gender: props.gender || "",
            image: props.image,
            colors: props.images || [{ color: '', images: [] }],
            // type: props.type || "",
            type: "Sapatos",
            sizes: props.size || [],
            price: props.price.toString(),
            stock: "50"
         });
      }
   }, [props, reset]);
   const type = form.watch("type");
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way error
      console.error("Validation Errors:", errors);
   };

   console.log("Form State Errors:", form.formState.errors);

   return (
      <Form {...form}>
         <ScrollArea className='h-[800px]'>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
               <Card>
                  <CardHeader>
                     <CardTitle className='flex items-center justify-between'>
                        Geral
                        <ActionDialog action={handleDelete} trigger={<Trash color="red" />} />
                     </CardTitle>
                     <Separator />
                  </CardHeader>
                  <CardContent className='space-y-5'>
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className='text-slate-500'>Nome do produto</FormLabel>
                              <FormControl>
                                 <Input placeholder="shadcn" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <div className='space-y-3'>
                        <FormField
                           control={form.control}
                           name="description"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className='text-slate-500'>Descriçao</FormLabel>
                                 <FormControl>
                                    <TextEditor formField={field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <div className='flex items-center gap-4'>
                        <FormField
                           control={form.control}
                           name="category"
                           render={({ field }) => (
                              <FormItem className='w-full'>
                                 <FormLabel className='text-slate-500'>Categoria</FormLabel>
                                 <FormControl>
                                    <MultipleSelect multiple={true} placeholder='Categoria' options={CATEGORIES} formField={field} className='w-full' />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="gender"
                           render={({ field }) => (
                              <FormItem className='w-full'>
                                 <FormLabel className='text-slate-500'>Género</FormLabel>
                                 <FormControl>
                                    <Selector placeholder='Sexo' options={GENDER} formField={field} className='w-full' />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <div>
                        <div className="space-y-2">
                           <FormField
                              control={form.control}
                              name="image"
                              render={({ field }) => (
                                 <FormItem className='w-full'>
                                    <FormLabel className='text-slate-500'>Imagem</FormLabel>
                                    <FormControl>
                                       <UpdateFileUploader formField={field} maxFiles={1} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <div className="space-y-2 grid">
                              <Label className='text-slate-500'>Cores</Label>
                              <div>
                                 {/* <Modal btn={<Image src={}}/> */}
                                 <div className='flex items-center justify-center gap-3'>
                                    <Modal
                                       btn={<ModalButton />}
                                       title="Cores do producto">
                                       <ScrollArea className='h-[500px]'>
                                          {fields.map((color, index) => (
                                             <div className='space-y-5' key={color.id}>
                                                <FormField
                                                   control={control}
                                                   name={`colors.${index}.color`}
                                                   render={({ field }) => (
                                                      <FormItem className="w-full">
                                                         <FormLabel className="text-slate-500">Cor</FormLabel>
                                                         <FormControl>
                                                            <div className="flex space-x-2">
                                                               <ColorPiker formField={field} />
                                                            </div>
                                                         </FormControl>
                                                      </FormItem>
                                                   )}
                                                />
                                                <FormField
                                                   control={control}
                                                   name={`colors.${index}.images`}
                                                   render={({ field }) => {
                                                      return (
                                                         <FormItem className="w-full">
                                                            <FormLabel className="text-slate-500">Imagens</FormLabel>
                                                            <FormControl>
                                                               <FileUploader formField={field} maxFiles={9} />
                                                            </FormControl>
                                                            <FormMessage />
                                                         </FormItem>
                                                      )
                                                   }}
                                                />
                                                <div className='flex items-center justify-center'>
                                                   <Button type="button" className='bg-red-500 mb-4 w-full transition-colors hover:bg-red-600' onClick={() => remove(index)}>
                                                      Remove Cor
                                                   </Button>
                                                </div>
                                             </div>
                                          ))}
                                          <Button
                                             type="button"
                                             className='bg-green-500 transition-colors hover:bg-green-600 w-full'
                                             onClick={() => append({ color: '', images: undefined })} // Append a new color field
                                          >
                                             Adicionar Cor
                                          </Button>
                                       </ScrollArea>
                                    </Modal>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
               <Card className='mt-4'>
                  <CardHeader>
                     <CardTitle>Detalhes</CardTitle>
                     <Separator />
                  </CardHeader>
                  <CardContent className='space-y-5'>
                     <div className='space-y-4'>
                        <FormField
                           control={form.control}
                           name="details"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className='text-slate-500'>Detalhes do producto</FormLabel>
                                 <FormControl>
                                    <TextEditor formField={field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <div className='space-y-4'>
                        <div className='flex gap-4'>
                           <FormField
                              control={form.control}
                              name="brand"
                              render={({ field }) => (
                                 <FormItem className='w-full'>
                                    <FormLabel className='text-slate-500'>Marca</FormLabel>
                                    <FormControl>
                                       <Selector placeholder='Marca' options={BRAND} formField={field} className='w-full' />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                 <FormItem className='w-full'>
                                    <FormLabel className='text-slate-500'>Tipo de producto</FormLabel>
                                    <FormControl>
                                       <Selector placeholder='producto' options={PRODUCT_TYPE} formField={field} className='w-full' />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                        <div>
                           <FormField
                              control={form.control}
                              name="sizes"
                              render={({ field }) => (
                                 <FormItem className="w-full flex-auto">
                                    <FormLabel className="text-slate-500">Tabela de tamanhos</FormLabel>
                                    <FormControl>
                                       <div className="flex justify-center flex-wrap w-[27rem] mx-auto">
                                          {(type === "Sapatos" ? SIZES_NUMBER : C_SIZES).map((size) => (
                                             <Toggle
                                                key={size}
                                                type="button"
                                                onClick={() => {
                                                   const currentSizes = field.value || [];
                                                   if (currentSizes.includes(size)) {
                                                      // Remove size if already selected
                                                      field.onChange(currentSizes.filter((s: unknown) => s !== size));
                                                   } else {
                                                      // Add size if not already selected
                                                      field.onChange([...currentSizes, size]);
                                                   }
                                                }}
                                                className={`${form.getValues("sizes")?.includes(size)
                                                   ? "bg-blue-500 text-white"
                                                   : "bg-white text-black"
                                                   }`}
                                             >
                                                {size}
                                             </Toggle>
                                          ))}
                                       </div>
                                    </FormControl>
                                 </FormItem>
                              )}
                           />
                           <div className='flex gap-4'>
                              <FormField
                                 control={form.control}
                                 name="price"
                                 render={({ field }) => (
                                    <FormItem className='w-full'>
                                       <FormLabel>Price</FormLabel>
                                       <FormControl>
                                          <Input {...field} placeholder="Enter product price" />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="stock"
                                 render={({ field }) => (
                                    <FormItem className='w-full'>
                                       <FormLabel>Stock</FormLabel>
                                       <FormControl>
                                          <Input {...field} placeholder="Quantidade em stock" />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                        <SubmitButton disabled={form.formState.isSubmitting} />
                     </div>
                  </CardContent>
               </Card>
            </form>
         </ScrollArea>
      </Form>
   )
}

export default UpdateProduct
