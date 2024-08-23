"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CircularProgress, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import axios from 'axios'
import { setProducts } from '@/lib/store/features/products/productsSlice'
import { RootState, AppDispatch } from '@/lib/store/store'
import cartCount from '@/actions/cartCountAction'
import sessionAction from '@/actions/sessionAction'
import cartAction from '@/actions/cartAction'
import StoreLoading from "@/components/StoreLoading"
import { cartsCount } from '@/lib/store/features/carts/cartsSlice'
import globalCartCountAction from '@/actions/globalCartCountAction'
import { useRouter } from 'next/navigation'


const StoreComp = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useRouter()
  const searchItem = useSelector((state: RootState) => state.products.filteredProducts) ?? []
  const products = useSelector((state: RootState) => state.products.products)
  const [filteredProducts, setFilteredProducts] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [loadingState, setLoadingState] = useState<string | null>(null)
  const [ session, setSession ] = useState<any>(null)

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

  useEffect(()=>{
    const getSession = async () =>{
      
      const res = await  sessionAction()
      console.log(res)
      setSession(res)
    }
    getSession();
  },[])

  const addToCart = async (category: string, id: string) => {
    if (!session) {
      navigate.push('/auth/login')
      return
    }
    setLoadingState(id); // Start spinner for this product
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
      // toast("Product Added to Cart")
      countCarts()
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setLoadingState(null); // Stop spinner
    }
  }

  useEffect(() => {
    countCarts()
  }, [])

  const gotoDetails = (link: any) => {
    if(session){
       navigate.push(link)
    } else{
      navigate.push('/auth/login')
    }

  }

  return (
    <>
      <div className='w-full flex flex-col mt-10 justify-evenly gap-16 overflow-y-scroll items-center flex-wrap min-h-[100vh] p-2'>
          <ToastContainer className="z-50 mt-[100px]" />
        <div className='w-full flex mt-10 justify-evenly gap-16 items-center flex-wrap h-full p-2'>
          {loading ? (
            <StoreLoading />
          ) : searchItem.length > 0 ? (
            searchItem.map((product) => (
              <React.Fragment key={product._id}>
                <div className='m-0 w-[300px] border border-red-200 shadow-lg p-4 lg:w-[200px]'>
                  <div>
                    <Image
                      src={product.fileURL}
                      alt={product.productName}
                      width={500}
                      height={500}
                    />
                    <div className='mt-6 space-y-3'>
                      <h3 className='text-md font-semibold'>{product.productName}</h3>
                      <details>
                        <summary className='text-sm font-semibold'>Description of Product</summary>
                        <p className='text-sm'>{product.productDescription}</p>
                      </details>
                      <p className='text-green-600 text-2xl'>RS-{product.productPrice}</p>
                    </div>
                  </div>
                  <hr className='my-4' />
                  <div className='flex flex-col space-y-2'>
                    {/* <Link href={`/store/${product.productCategory}/${product._id}`}> */}
                      <button onClick={()=>{gotoDetails(`/store/${product.productCategory}/${product._id}`)}} className='bg-green-500 text-white py-2 px-4 rounded'>
                        <span className='text-sm'>Product Details</span>
                      </button>
                    {/* </Link> */}
                    <button
                      onClick={() => addToCart(product.productCategory, product._id)}
                      className='bg-transparent text-green-500 border border-green-500 py-2 px-4 rounded'
                      disabled={loadingState === product._id}
                    >
                      {loadingState === product._id ? (
                        <CircularProgress isIndeterminate size='20px' color='green.500' />
                      ) : (
                        <span className='text-sm'>Add to cart</span>
                      )}
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))
          ) : (
            filteredProducts.map((product: any) => (
              <div key={product._id}>
                {/* <ToastContainer className="z-50 mt-[100px]" /> */}
                <div className='m-0 border w-[300px] border-gray-200 shadow-lg p-4 lg:w-[200px]'>
                  <div>
                    <Image
                      src={product.fileURL}
                      alt={product.productName}
                      width={500}
                      height={500}
                    />
                    <div className='mt-6 space-y-3'>
                      <p className='text-md font-semibold'>{product.productName}</p>
                      <details>
                        <summary className='text-sm font-semibold'>Description of Product</summary>
                        <p className='text-sm'>{product.productDescription}</p>
                      </details>
                      <p className='text-green-600 text-2xl'>RS-{product.productPrice}</p>
                    </div>
                  </div>
                  <hr className='my-4' />
                  <div className='flex flex-col space-y-2'>
                    {/* <Link href={`/store/${product.productCategory}/${product._id}`}> */}
                      <button onClick={()=>{gotoDetails(`/store/${product.productCategory}/${product._id}`)}} className='bg-green-500 text-white py-2 px-4 rounded'>
                        <span className='text-sm'>Product Details</span>
                      </button>
                    {/* </Link> */}
                    <button
                      onClick={() => addToCart(product.productCategory, product._id)}
                      className='bg-transparent text-green-500 border border-green-500 py-2 px-4 rounded'
                      disabled={loadingState === product._id}
                    >
                      {loadingState === product._id ? (
                        <CircularProgress isIndeterminate size='20px' color='green.500' />
                      ) : (
                        <span className='text-sm'>Add to cart</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default StoreComp
