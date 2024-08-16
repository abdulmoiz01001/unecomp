"use client"
import React, { useRef , useState , ChangeEvent, useEffect } from 'react'
import { storage } from '@/lib/firebaseConfig'
import { ref , uploadBytesResumable , getDownloadURL , UploadTaskSnapshot } from 'firebase/storage'
import DashboardSidebarComp from './DashboardSidebar'
import { Input, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import productsAction from '@/actions/productsAction'
import Image from 'next/image'
import DashboardHeader from './dashboardHeader'

// make this dunction to get Enviroment variable 

export const getServerSideProps = async () => {
  return {
    props: {
      API_URL: process.env.NEXTAUTH_URL
    }
  }
}


const ProductsComp = () => {


    const { isOpen, onOpen, onClose } = useDisclosure()

          // get from server side prop

    const DEV_API = 'http://localhost:3000'
    const PROD_API = 'https://unecomp.vercel.app'

    const API_URL = process.env.NODE_ENV === 'development' ? DEV_API : PROD_API

    console.log(API_URL)


    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [ productName , setProductName ] = useState<string>('')
    const [ productPrice , setProductPrice ] = useState<string>('')
    const [ productDescription , setProductDescription ] = useState<string>('')
    const [ productCategory , setProductCategory ] = useState<string>('')
    const [ products , setProducts ] = useState<any>([])


    const [ image , setImage ] = useState<File | null>(null)
    const [ fileURL , setFileURL ] = useState<string | null>(null)

    useEffect(() => {
      fetchProducts()
    }, [])

    const fetchProducts = async () => {
      setProductName('')
      setProductPrice('')
      setProductDescription('')
      setProductCategory('')
      setFileURL('')
      try {
        console.log(API_URL)
        const res  = await fetch(`${API_URL}/api/products`)
        const data = await res.json()
        setProducts(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      
      if (file) {
        console.log(file);
        setImage(file);
    
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setFileURL(downloadURL);
            });
          }
        );
      }
    };

    const handleUpload = async (e : React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault()
    
      let products = { productName , productPrice , productDescription , productCategory , fileURL };

      console.log(products)

      try {
          productsAction(products).then((data) => {
            console.log(data)
            fetchProducts()
          })
      } catch (error) {
        console.log(error)
      }
    }

    const deleteProduct = async( category : string , id : string) => {

      try {
        const res = await fetch(`${API_URL}/api/products?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!res.ok) {
          console.error('Failed to delete product');
        }
        fetchProducts()
      
    }
    catch (error) {
      console.error('Error:', error);
    }
  }
    
  
  return (
    <>
   
    <div className='w-[100vw] min-h-[90vh] flex flex-col justify-between items-start '>
  
   
  <DashboardHeader onOpen={onOpen} />
  <div className='w-full h-[90vh] flex justify-between items-start '>
  <DashboardSidebarComp />
  <div className='w-full bg-gray-100 minh-[100vh] flex flex-col justify-center items-start '>
  <div className='w-[100%] h-full flex flex-col justify-start items-start '>
    <div className='w-full h-[10%] flex justify-evenly items-center bg-[#285d31]'>
        {/* <h1  className='text-6xl text-center text-white' >Products</h1> */}
      
        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleUpload}>

          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input value={productName} onChange={(e)=>{setProductName(e.currentTarget.value)}} required ref={initialRef} placeholder='Product Name' />
            </FormControl>

            <FormControl>
              <FormLabel>Product Price</FormLabel>
              <Input value={productPrice} onChange={(e)=>{setProductPrice(e.currentTarget.value)}} required ref={initialRef} placeholder='Product Price' />
            </FormControl>

            <FormControl>
              <FormLabel>Product Description </FormLabel>
              <Input value={productDescription} onChange={(e)=>{setProductDescription(e.currentTarget.value)}} required ref={initialRef} placeholder='Product Description' />
            </FormControl>

            <FormControl>
              <FormLabel>Product Category</FormLabel>
              <Input value={productCategory} onChange={(e)=>{setProductCategory(e.currentTarget.value)}} required ref={initialRef} placeholder='Product Category' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Image</FormLabel>
              <Input required type='file'  onChange={handleChange}  />
            </FormControl>
            {fileURL && (
        <div>
          <p>File uploaded successfully. URL:</p>
          <a href={fileURL} target="_blank" rel="noopener noreferrer">
            {fileURL}
          </a>
        </div>
      )}          </ModalBody>

          <ModalFooter>
            <Button type='submit'  colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
    <div className='w-full flex justify-center flex-wrap items-center border-2 '>
    {
  products.map((product: any) => (
    <div key={product._id} className='w-[250px]  m-5 flex flex-col justify-between rounded-3xl items-start p-4 gap-2 border border-gray-200 shadow-lg transition-transform transform hover:scale-105'>
      <Image src={product.fileURL} alt="Product Image" width={500} height={500} className='w-full h-[60%] rounded-3xl object-cover' />
      <h1 className='text-lg font-semibold'>{product.productName}</h1>
      <h1 className='text-gray-500'>Price: {product.productPrice}-RS</h1>
      <details className='w-full text-sm text-gray-600'>
        <summary>{product.productDescription.substring(0, 50)}...</summary>
        <p>{product.productDescription}</p>
      </details>
      <h1 className='text-sm text-gray-400'>{product.productCategory}</h1>
      <div className='w-full flex justify-evenly items-center mt-2'>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Edit
        </button>
        <button onClick={() => deleteProduct(product.productCategory, product._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  ))
}

        
    </div>
    </div>
 
  </div>
  </div>
  </div>


    </>
  )
}

export default ProductsComp