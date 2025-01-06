'use client'
import { MESSAGE_DELETE_ANIMATION, MESSAGE_DELETE_TRANSITION } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";
import { CartItem } from "@/lib/store/type";
import QuantityButton from "../product/QuantityButton";
type TProps = {
   cart: CartItem[]
}

const DELETE_BTN_WIDTH = 70;
const CartMobileList = ({ cart }: TProps) => {
   const removeFromCart = useCartStore((state) => state.removeFromCart);

   const handleDragEnd = (info: any, messageId: string) => {
      const dragDistance = info.point.x
      if (dragDistance < -DELETE_BTN_WIDTH) {
         removeFromCart(messageId)
      }
   }
   return (
      <div className="sm:hidden ios-swiper">
         <ul>
            <AnimatePresence>
               {cart.length > 0 ? cart.map(message => (
                  <motion.li
                     className="li"
                     key={message.id}
                     exit={MESSAGE_DELETE_ANIMATION}
                     transition={MESSAGE_DELETE_TRANSITION}
                  >
                     <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(_, info) => handleDragEnd(info, message.id)}
                        className="msg-container"
                     >
                        <Image
                           className="user-icon"
                           src={message.image}
                           width={90}
                           height={90}
                           alt={message.name}
                        />
                        <div className="message-text base-semibold">
                           <h3>{message.name}</h3>
                           <p>{message.price} (kz)</p>
                        </div>

                        <QuantityButton initialQuantity={message.quantity} id={message.id} />
                     </motion.div>
                     <div className="delete-btn bg-red-500">
                        <span className="text-right text-white">Remover</span>
                     </div>
                  </motion.li>
               )) : (
                  <li className="mt-[50%] text-center">
                     <h2 className="base-semibold">Seu carrinho está vazio</h2>
                     <div className="flex mt-4">
                        <ShoppingCart fill="#000" className="size-9 mx-auto" />
                     </div>
                  </li>
               )}
            </AnimatePresence>
         </ul>
      </div>
   )
}

export default CartMobileList;
