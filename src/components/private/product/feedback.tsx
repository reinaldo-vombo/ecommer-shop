'use client'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Angry, Check, Frown, Laugh, Loader2, Smile } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState, } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { feedbackSchema } from "@/lib/validation/feeback";
import { postReview } from "@/lib/actions/review";
import { initialState } from "@/constants/site-content";
import { toast } from "sonner";

const feedback = [
   { stars: 4, emoji: <Laugh size={16} className="stroke-inherit" /> },
   { stars: 3, emoji: <Smile size={16} className="stroke-inherit" /> },
   { stars: 2, emoji: <Frown size={16} className="stroke-inherit" /> },
   { stars: 1, emoji: <Angry size={16} className="stroke-inherit" /> }
]
type TFeedbackProps = {
   stars: null | number
   setStars: Dispatch<SetStateAction<number | null>>
   productId: string
}
export const Feedback = ({ stars, setStars, productId }: TFeedbackProps) => {
   const [isSubmitted, setIsSubmitted] = useState<null | boolean>(null);

   useEffect(() => {
      setIsSubmitted(false)
   }, [stars])

   const form = useForm({
      resolver: zodResolver(feedbackSchema),
      defaultValues: {
         message: "",
         stars: stars
      },
   });
   const onSubmit = async (data: z.infer<typeof feedbackSchema>) => {
      console.log(data)
      const result = await postReview(initialState, data, productId,);
      if (result?.error) {
         toast.error(result.message)
      }
      if (result.success) {
         toast.success(result.message)
      }
   }
   const isLoading = form.formState.isSubmitting
   console.log(form.formState.errors)
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <motion.div
               layout
               initial={{ borderRadius: '2rem' }}
               animate={stars ? { borderRadius: '0.5rem' } : { borderRadius: '2rem' }}
               className={twMerge(
                  'w-full overflow-hidden border py-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-950'
               )}>
               <span className="flex items-center justify-center gap-3 pl-4 pr-2">
                  <div className="text-sm text-black dark:text-neutral-400">Like our service?</div>
                  <div className="flex items-center text-neutral-400">
                     {feedback.map((e) => (
                        <FormField
                           key={e.stars}
                           control={form.control}
                           name="stars"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel></FormLabel>
                                 <FormControl>
                                    <button
                                       onClick={() => {
                                          setStars((prev) => (e.stars === prev ? null : e.stars))
                                          field.onChange(e.stars)
                                       }}
                                       className={twMerge(
                                          stars === e.stars
                                             ? 'bg-blue-100 stroke-blue-500 dark:bg-sky-900 dark:stroke-sky-500'
                                             : 'stroke-neutral-500 dark:stroke-neutral-400',
                                          'flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-blue-100 hover:stroke-blue-500 hover:dark:bg-sky-900 hover:dark:stroke-sky-500'
                                       )}
                                       key={e.stars}>
                                       {e.emoji}
                                    </button>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                     ))}
                  </div>
               </span>
               <motion.div
                  aria-hidden={stars ? false : true}
                  initial={{ height: 0, translateY: 15 }}
                  className="px-2"
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                  animate={stars ? { height: '195px', width: '100%' } : {}}>
                  <AnimatePresence>
                     {!isSubmitted ? (
                        <motion.span exit={{ opacity: 0 }} initial={{ opacity: 1 }}>
                           <FormField
                              control={form.control}
                              name="message"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Messagem</FormLabel>
                                    <FormControl>
                                       <textarea
                                          {...field}
                                          placeholder="Your app is awesoooome"
                                          className="min-h-32 w-full resize-none rounded-md border bg-transparent p-2 text-sm placeholder-neutral-400 focus:border-neutral-400 focus:outline-0 dark:border-neutral-800 focus:dark:border-white"
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <div className="flex h-fit w-full justify-end">
                              <button
                                 type="submit"
                                 className={cn(
                                    'mt-1 flex h-9 items-center justify-center rounded-md border bg-neutral-950 px-2 text-sm text-white dark:bg-white dark:text-neutral-950',
                                    {
                                       'bg-neutral-500 dark:bg-white dark:text-neutral-500': isLoading
                                    }
                                 )}>
                                 {isLoading ? (
                                    <>
                                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                       Carregando
                                    </>
                                 ) : (
                                    'Submeter'
                                 )}
                              </button>
                           </div>
                        </motion.span>
                     ) : (
                        <motion.div
                           variants={container}
                           initial="hidden"
                           animate="show"
                           className="flex h-full w-full flex-col items-center justify-start gap-2 pt-9 text-sm font-normal">
                           <motion.div
                              variants={item}
                              className="flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-full bg-blue-500 dark:bg-sky-500">
                              <Check strokeWidth={2.5} size={16} className="stroke-white" />
                           </motion.div>
                           <motion.div variants={item}>Seu feedbackfoi recebido!</motion.div>
                           <motion.div variants={item}>Obrigado pela ajuda.</motion.div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            </motion.div>
         </form>
      </Form>
   )
}

const container = {
   hidden: { opacity: 0, y: 20 },
   show: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.2,
         staggerChildren: 0.04
      }
   }
}

const item = {
   hidden: { y: 10 },
   show: { y: 0 }
}


