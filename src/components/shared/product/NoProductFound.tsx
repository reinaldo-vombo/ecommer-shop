import { BookX } from 'lucide-react';
import React from 'react'

const NoProductFound = () => {
  return (
    <div className='flex justify-center items-center flex-col space-y-4 col-span-12'>
      <h2 className='h2-bold text-center'>Oops Parece que não temos <br /> O que procura...</h2>
      <span>Por-favor tente outra pesquisa</span>
      <BookX className='size-10' />

    </div>
  )
}

export default NoProductFound;
