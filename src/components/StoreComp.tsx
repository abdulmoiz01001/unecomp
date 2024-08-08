

"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CircularProgress, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { setProducts } from '@/lib/store/features/products/productsSlice'
import { RootState, AppDispatch } from '@/lib/store/store'
import cartCount from '@/actions/cartCountAction'
import sessionAction from '@/actions/sessionAction'
import cartAction from '@/actions/cartAction'
import StoreLoading from "@/components/StoreLoading"
import { cartsCount } from '@/lib/store/features/carts/cartsSlice'
import globalCartCountAction from '@/actions/globalCartCountAction'

const StoreComp = () => {
  const dispatch: AppDispatch = useDispatch()
  const searchItem = useSelector((state: RootState) => state.products.filteredProducts) ?? []
  const products = useSelector((state: RootState) => state.products.products)
  const [filteredProducts, setFilteredProducts] = useState<any>([])
  const [loading, setLoading] = useState(true)

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products', {
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("Response data:", response.data)
      if (response.data.length === 0) {
        console.log('No products found')
        setLoading(false)
        return
      }
      setFilteredProducts(response.data)
      dispatch(setProducts(response.data))
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Filter products based on searchItem
  useEffect(() => {
    if (searchItem.toString() === '' || searchItem == null) {
      setFilteredProducts(products)
      return
    }
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(searchItem.toString().toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchItem, products])

  const countCarts = async () => {
    try {
      const cart = await globalCartCountAction();
      if (cart == null) {
        console.log('Cart is empty')
        return
      }
      dispatch(cartsCount(cart))
    } catch (error) {
      console.error('Failed to fetch cart count:', error)
    }
  }

  const addToCart = async (category: string, id: string) => {
    try {
      const res = await sessionAction()
      console.log((res?.user as any)._id)
      if (!res) {
        console.error('Failed to fetch session')
        return
      }
      if (!res?.user?.email) {
        console.error('No user email found')
        return
      }
      console.log("here I am")
      const response = await cartAction(category, id, (res?.user as any)._id)
      console.log(response)
      toast.success(response === null ? 'Product is Already in Cart' : 'Product Added to Cart', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      countCarts()
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  useEffect(() => {
    countCarts()
  }, [])

  return (
    <>
      <div className='w-full flex flex-col mt-10 justify-evenly gap-16 overflow-y-scroll items-center flex-wrap min-h-[100vh] p-2'>
        <div className='w-full flex mt-10 justify-evenly gap-16 items-center flex-wrap h-full p-2'>
          {loading ? (
            <StoreLoading />
          ) : searchItem.length > 0 ? (
            searchItem.map((product) => (
              <React.Fragment key={product._id}>
                <ToastContainer className="z-50 mt-[100px]" />
                <Card className='m-0 lg:w-[200px]'>
                  <CardBody>
                    <Image
                      src={product.fileURL}
                      alt={product.productName}
                      width={500}
                      height={500}
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{product.productName}</Heading>
                      <details>
                        <summary>Description of Product</summary>
                        <Text>{product.productDescription}</Text>
                      </details>
                      <Text color='green.600' fontSize='2xl'>
                        RS-{product.productPrice}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup className='lg:flex lg:flex-col' spacing='2'>
                      <Link href={`/store/${product.productCategory}/${product._id}`}>
                        <Button variant='solid' colorScheme='green'>
                          <span className='lg:text-sm'>Product Details</span>
                        </Button>
                      </Link>
                      <Button onClick={() => addToCart(product.productCategory, product._id)} variant='ghost' colorScheme='green'>
                        <span className='lg:text-sm'>Add to cart</span>
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </React.Fragment>
            ))
          ) : (
            filteredProducts.map((product : any) => (
              <div key={product._id}>
                <ToastContainer className="z-50 mt-[100px]" />
                <Card className='m-0 lg:w-[200px]'>
                  <CardBody>
                    <Image
                      src={product.fileURL}
                      alt={product.productName}
                      width={500}
                      height={500}
                    />
                    <Stack mt='6' spacing='3'>
                      <p className='lg:text-sm font-semibold'>{product.productName}</p>
                      <details>
                        <summary className='lg:text-sm font-semibold'>Description of Product</summary>
                        <p className='lg:text-sm font-semibold'>{product.productDescription}</p>
                      </details>
                      <Text color='green.600' fontSize='2xl'>
                        RS-{product.productPrice}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup className='lg:flex lg:flex-col' spacing='4'>
                      <Link href={`/store/${product.productCategory}/${product._id}`}>
                        <Button variant='solid' colorScheme='green'>
                          <span className='lg:text-sm'>Product Details</span>
                        </Button>
                      </Link>
                      <Button onClick={() => addToCart(product.productCategory, product._id)} variant='ghost' colorScheme='green'>
                        <span className='lg:text-sm'>Add to cart</span>
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default StoreComp
