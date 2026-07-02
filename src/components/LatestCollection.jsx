import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products, loadingProducts, retryCount, } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    }, [products])



    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl '>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    This are new collections available for our new arrivals
                </p>

            </div>
            {/* Rendering products */}
            {loadingProducts ? (

                <div className="flex flex-col items-center justify-center py-20">

                    <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>

                    <h2 className="mt-6 text-xl font-semibold">
                        Loading our latest collections...
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Thanks for your patience.
                    </p>

                </div>

            ) : (

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {
                        latestProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                            />
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default LatestCollection