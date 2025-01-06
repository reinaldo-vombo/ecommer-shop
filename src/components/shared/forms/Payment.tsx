import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Payment = ({ totalQuantity }: { totalQuantity: number }) => {
   return (
      <div>
         <form>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                     id="cardNumber"
                     name="cardNumber"
                     placeholder="1234 5678 9012 3456"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="cardHolder">Card Holder</Label>
                  <Input
                     id="cardHolder"
                     name="cardHolder"
                     placeholder="John Doe"
                  />
               </div>
               <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="expirationMonth">Expiration Month</Label>
                     <Input />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="expirationYear">Expiration Year</Label>
                     <Input />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="cvv">CVV</Label>
                     <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                     />
                  </div>
               </div>
            </CardContent>
            <CardFooter>
               <Button type="submit" className="w-full bg-green-500">
                  {totalQuantity} (akz) Confirmar
               </Button>
            </CardFooter>
         </form>
      </div>
   )
}

export default Payment
