import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_logo} className='w-12 m-auto mb-5' alt="" />
            <p className=' font-semibold'>Easy Exchange Policy</p>
            <p>We offer hassle free exchange policy</p>
        </div>

        <div>
            <img src={assets.refund_policy} className='w-12 m-auto mb-5' alt="" />
            <p className=' font-semibold'>7 Days Return Policy</p>
            <p>We provide 7 days free return policy</p>
        </div>

        <div>
            <img src={assets.customer_support} className='w-12 m-auto mb-5' alt="" />
            <p className=' font-semibold'>Best customer support</p>
            <p>We provide 24/7 customer policy</p>
        </div>

    </div>
  )
}

export default OurPolicy