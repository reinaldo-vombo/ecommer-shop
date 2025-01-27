'use client'
import { z } from "zod"
import { BRAND, C_SIZES, CATEGORIES, GENDER, initialState, PRODUCT_TYPE, SIZES_NUMBER } from '@/constants/site-content'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FileUploader from '@/components/shared/file-uplode/FileUploder'
import { TProduct } from '@/components/shared/product/types'
import SubmitButton from '@/components/shared/SubmitButton'
import { useFieldArray, useForm } from "react-hook-form"
import { ScrollArea } from '@/components/ui/scroll-area'
import { productSchema } from '@/lib/validation/product'
import ColorPiker from '@/components/shared/ColorPiker'
import TextEditor from '@/components/shared/TextEditor'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from "@hookform/resolvers/zod"
import { createProduct } from '@/lib/actions/product'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import Modal from '@/components/shared/Moadal'
import Selector from '@/components/shared/Selector'
import { toast } from 'sonner'
import { Toggle } from '@/components/ui/toggle'
import ModalButton from '../product/ModalButton'
import { MultiSelect } from "@/components/ui/multi-select"
import ListProducts from "../product/ListProduct"

type TProps = {
   products: TProduct[]
}

const CreateProduct = ({ products }: TProps) => {
   const form = useForm<z.infer<typeof productSchema>>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: "",
         description: "",
         details: "",
         brand: "",
         category: [],
         gender: "",
         // status: "Publicado",
         image: [],
         colors: [{ color: '', images: [] }],
         type: "Sapatos",
         sizes: [],
         price: "",
         stock: ""
      },
   })

   async function onSubmit(value: z.infer<typeof productSchema>) {
      const result = await createProduct(initialState, value)
      if (result?.error) {
         toast.error('Ocorreu um error ao publicar o producto')
      }
      if (result?.success) {
         toast.success('Produto cadastrado com sucesso')
         form.reset()
      }
   }
   const { control } = form;
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'colors',
   })
   const type = form.watch("type");
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };

   console.log("Form State Errors:", form.formState.errors);

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
            <div className="grid grid-cols-12 gap-4 relative">
               <ListProducts products={products} />
               <div className='col-span-8'>
                  <Tabs defaultValue="general" className="w-full">
                     <TabsList className='flex items-center justify-between'>
                        <div className='flex gap-3'>
                           <TabsTrigger value="general">Geral</TabsTrigger>
                           <TabsTrigger value="advance">Avançado</TabsTrigger>
                        </div>
                     </TabsList>
                     <TabsContent value="general">
                        <Card>
                           <CardHeader>
                              <CardTitle>Geral</CardTitle>
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
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                       <MultiSelect
                                          options={CATEGORIES}
                                          onValueChange={field.onChange} // Connect onChange to react-hook-form
                                          defaultValue={field.value} // Set initial value from react-hook-form
                                          placeholder="Select frameworks"
                                          variant="inverted"
                                          animation={2}
                                          maxCount={3}
                                       />
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
                                                <FileUploader formField={field} maxFiles={1} />
                                             </FormControl>
                                             <FormMessage />
                                          </FormItem>
                                       )}
                                    />

                                    <div className="space-y-2 grid">
                                       <Label className='text-slate-500'>Cores</Label>
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
                                                         render={({ field }) => (
                                                            <FormItem className="w-full">
                                                               <FormLabel className="text-slate-500">Imagens</FormLabel>
                                                               <FormControl>
                                                                  <FileUploader formField={field} maxFiles={9} />
                                                               </FormControl>
                                                               <FormMessage />
                                                            </FormItem>
                                                         )}
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
                                                            const currentSizes: (string | number)[] = field.value || [];
                                                            if (currentSizes.includes(size)) {
                                                               // Remove size if already selected
                                                               field.onChange(currentSizes.filter((s) => s !== size));
                                                            } else {
                                                               // Add size if not already selected
                                                               field.onChange([...currentSizes, size]);
                                                            }
                                                         }}
                                                         className={`${(form.getValues("sizes") as (string | number)[])?.includes(size)
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
                                             <FormItem>
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
                     </TabsContent>
                     <TabsContent value="advance">
                        <Card>
                           <CardHeader>
                              <CardTitle>Detalhes</CardTitle>
                              <Separator />
                           </CardHeader>
                           <CardContent className='space-y-5'>


                              <div className='flex items-center justify-between'>

                                 {/* <Selector placeholder='Codigo do pupão' options={GENDER} className={`w-full ${enableCupon ? 'cursor-pointer' : 'cursor-not-allowed'}`} /> */}
                              </div>
                              {/* <Button type='submit'>Cadastrar</Button> */}
                           </CardContent>
                        </Card>
                     </TabsContent>
                  </Tabs>
               </div>
            </div>

         </form>
      </Form>
   )
}


export default CreateProduct;