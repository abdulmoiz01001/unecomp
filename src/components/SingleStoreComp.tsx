"use client"
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/store/hooks';
import { addOrder } from '@/lib/store/features/orders/ordersSlice';
import axios from 'axios';
import { Button, Text } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';


interface Product {
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  fileURL: string;
}

const SingleStoreComp = () => {
  const router = useRouter();
  const [storeId, setStoreId] = useState<string>();
  const [category, setCategory] = useState<string>()
  const [products, setProducts] = useState<Product[]>([]) // Correct initialization
  const [ color , setColor ] = useState('')
  const [ type , setType ] = useState('')

  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split('/');
      console.log('Path parts:', parts);
      setCategory(parts[2] || '');
      setStoreId(parts[3] || '');

      console.log('Category:', parts[4]);
      console.log('Store ID:', parts[5]);
    }
  }, [pathname]);
  
  const fetchData = async () => {
    if (!storeId || !category) {
      console.error('Invalid storeId or category:', storeId, category);
      return;
    }

    try {
      // const res = await fetch(`/api/products?categories=${category}&id=${storeId}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });

      const res = await axios.get(`/api/products?categories=${category}&id=${storeId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      console.log('Fetch response:', res);

      // if (!res.ok) {
      //   throw new Error(`HTTP error! status: ${res.status}`);
      // }

      const data = await res.data;
      console.log('Product data:', data);
      setProducts([data]);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  useEffect(() => {
    if (storeId && category) {
      fetchData();
    }
  }, [storeId, category]); // Fetch data when storeId and category change

  const gotoDeliveryDetails = (index: number) => {
    console.log('Product:', products[index]);
    products[0].productQuantity = productQuantity;
    dispatch(addOrder(products[0])); // Convert products array to JSON string
    router.push('/deliverydetails');
  }


  const [productQuantity, setProductQuantity] = useState(1);

  const handleIncrement = () => {
    setProductQuantity(productQuantity + 1);
  };

  const handleDecrement = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const goBack = () => {
    router.back();
  }

  console.log('color', color)
  console.log('type', type)


  return (
    <>
      {/* <div className="flex w-[100vw] items-center justify-center min-h-screen bg-gray-100 xxs:p-0 xs:p-0 p-8">
        {products.map((product ,  index) => (
      
          <div key={index} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl w-full xs:w-full xxs:w-full">
       
            <div className="w-full h-[500px] md:w-1/2">
              <Image
                src={product.fileURL}
                alt={product.productName}
                width={500}
                height={500}
                className="object-cover m-auto h-[500px] w-[700px]"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col xxs:w-full">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.productName}</h1>
              <p className="text-gray-600 mb-6">{product.productDescription}</p>
              <Text color='green.600' fontWeight='bold' fontSize='2xl'>
                     RS-{product.productPrice}
                 </Text>
              <div className="text-2xl font-semibold text-gray-800 mb-6">Total Price According to Quantity-{product.productPrice*productQuantity}</div>

    
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={handleDecrement}
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                  -
                </button>
                <span className="text-gray-700 font-bold text-xl">{productQuantity}</span>
                <button
                  onClick={handleIncrement}
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                  +
                </button>
              </div>
    
              <div className="flex space-x-4">
                <Button variant='solid' colorScheme='green' onClick={() => { gotoDeliveryDetails(index) }} className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
                  Buy Now
                </Button>
            
    
                <Button variant='ghost' colorScheme='red' onClick={()=>{goBack()}} >
                  Discard
                </Button>
              </div>
            </div>
          </div>
  
        ))}
      </div> */}
      <section className="text-gray-600 body-font overflow-hidden">
        {products.map((product : any, index : number) => (
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 xl:w-4/5 2xl:w-4/5 mx-auto flex flex-wrap">
              <Image src={product.fileURL}
                alt={product.productName}
                width={500}
                height={500} className="lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full xl:h-auto 2xl:h-auto lg:h-auto h-64 object-cover object-center rounded" />
              <div className="lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full lg:pl-10 xl:pl-10 2xl:pl-10 lg:py-6 xl:py-6 2xl:py-6 mt-6 xl:mt-0 2xl:mt-0 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">Une Comp</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.productName}</h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{product.productDescription}</p>
                {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  
                  <div className="flex">
                  
                    <span className="mr-3">Color</span>
                    <button onClick={()=>{setColor('white')}} className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button onClick={()=>{setColor('gray')}} className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button onClick={()=>{setColor('green')}} className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Type</span>
                    <div className="relative">
                      <select onChange={(e)=>{
                        setType(e.target.value)
                      }}   className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div> */}
                <div className="flex mt-4 items-center space-x-4 mb-6">
                <button
                  onClick={handleDecrement}
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                  -
                </button>
                <span className="text-gray-700 font-bold text-xl">{productQuantity}</span>
                <button
                  onClick={handleIncrement}
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                  +
                </button>
              </div>
              
              <div className="text-2xl font-semibold text-gray-800 mb-6">Total Price According to Quantity-{product.productPrice*productQuantity}</div>
                <div className="flex xxs:flex-col xxs:justify-center xs:gap-4 xs:justify-center sm:gap-4 sm:justify-center items-end  ">
                  <span className="title-font font-medium text-2xl text-gray-900">RS-{product.productPrice}</span>
                  
                  <button onClick={() => { gotoDeliveryDetails(index) }} className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Order Now</button>
                  <Button variant='ghost' colorScheme='red' onClick={()=>{goBack()}} >
                  Discard
                </Button>
                  {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default SingleStoreComp
