import { Form } from "@/components/ui/form";
import { initialState } from "@/constants/site-content";
import { createOrder } from "@/lib/actions/order";
import { paymentSchema } from "@/lib/validation/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import { User } from "@/lib/auth/user";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";


const ConfirmationForm = () => {
   const user = User()
   const cart = useCartStore((state) => state.cart);
   const loadCart = useCartStore((state) => state.loadCart);

   // Ensure the cart is loaded on component mount
   useEffect(() => {
      loadCart();
   }, [loadCart]);
   const form = useForm<z.infer<typeof paymentSchema>>({
      resolver: zodResolver(paymentSchema),
      defaultValues: {
         customerId: user?.id,
         couponId: 0,
         items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
         })),
         total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      },
   })

   async function onSubmit(value: z.infer<typeof paymentSchema>) {
      const result = await createOrder(initialState, value)
      if (result?.error) {
         toast.error('Ocorreu um error ao publicar o producto')
      }
      if (result?.success) {
         toast.success('Produto cadastrado com sucesso')
         form.reset()
      }
   }
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };
   return (
      <div>
         <div></div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
               <SubmitButton title="Confirmar" disabled={form.formState.isSubmitting} />
            </form>
         </Form>
      </div>
   )
}

export default ConfirmationForm;
