import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-1 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.diamondlogo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600' >Jewelry Mint — A legacy of elegance.</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-(910)-242-3682</li>
                    <li>contact@diamond.com</li>
                </ul>
            </div>

        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ Jewelry.com -All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer