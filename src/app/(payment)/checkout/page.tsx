import Checkout from '@/components/layouts/Checkout'

export default async function CheckoutPage() {
   const response = await fetch('https://angolaapi.onrender.com/api/v1/geography/provinces');
   const provinces = await response.json();

   // Extract the capital cities into a new array
   // const states = provinces.map((province: { capital: string }) => province.capital);
   const states = provinces.map((province: { id: string; capital: string }) => ({
      id: province.id,
      capital: province.capital,
   }));
   return (
      <div>
         <Checkout province={provinces} states={states} />
      </div>
   )
}
