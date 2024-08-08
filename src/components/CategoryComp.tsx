"use client"

// import { Divider } from '@chakra-ui/react';
import React , { useEffect , useState } from 'react'
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CircularProgress, Divider, Heading, Select, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import getUserByEmailAction from '@/actions/getUserByEmailAction';
import cartAction from '@/actions/cartAction';
import sessionAction from '@/actions/sessionAction';
import { usePathname } from 'next/navigation';

const CategoryComp = () => {
    // const [urlParts, setUrlParts] = useState<string[]>([]);
    const [ category , setCategory ] = useState<string>('')
    const [categories, setCategories] = useState<string[]>([]);
    const [slide, setSlide] = useState<string[]>([]);
    const [ spinner , setSpinner ] = useState(false)

    const path = usePathname();
    let array = ['electronic component', 'architecture', 'fashion', 'food', 'furniture', 'jewelry', 'music', 'painting', 'photography', 'sculpture', 'textile', 'video', 'writing'];
  
    useEffect(() => {
      if(path){

        // This code will only run on the client side
        console.log(path);

        const parts = path.split('/').filter((part) => part !== '');

        console.log(parts);

        let category = parts[1];
      
        const decodePath = decodeURIComponent(category);
        // console.log(decodePath);
        console.log(decodePath);
        if(decodePath === 'electronic component') {
          setSlide(["electronic components ", "electronic components ", "electronic components ", "electronic components ", "electronic components ","electronic components ", "electronic components ", "electronic components ", "electronic components ", "electronic components ","electronic components ", "electronic components ", "electronic components ", "electronic components ", "electronic components "]);
        } else if(decodePath === 'architecture') {
          setSlide(["architecture ", "architecture ", "architecture ", "architecture ", "architecture ","architecture ", "architecture ", "architecture ", "architecture ", "architecture ","architecture ", "architecture ", "architecture ", "architecture ", "architecture ","architecture ", "architecture ", "architecture ", "architecture ", "architecture "]);
        }
        setCategory(decodePath)
        // setUrlParts(parts);
      }
      }, []);
      
      useEffect(()=>{
      fetchCategories();

    },[category])

   const fetchCategories = async() =>{

    try{
      console.log(category)

      const response = await fetch(`/api/products/categories/?category=${category}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(!response.ok){
        throw new Error('Something went wrong')
      }

      console.log(response)

      const data = await response.json();

      console.log(data)
      setCategories(data)

    } catch(e){
        console.log(e)
    }
   }

   const addToCart = async (category : string , id : string) => {
    try{
    
    
        console.log(id)
    
      
        // setSpinner(true)
    
        const res : any = await sessionAction()
         
    
          // const _id  = data._id;
    
      const response = await cartAction(category, id , res.user._id)
      console.log(response)
      
      if (response) {
      
        if (!response.ok || null) {
          toast.success('Product is Already into Cart', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success('Product Added to Cart', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }else{
        toast.success('Product is Already into Cart', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    
          // const  data  = await response.json();
          // console.log(data)
          // console.log(data._id)
          // if (!response?.ok || null) {
          //   toast.success('Product is Already into Cart', {
          //     position: "top-right",
          //   autoClose: 3000,
          //   // backgroundColor: 'green',
          //   // color: 'white',
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   });
          // }
          
          // else{
          //     // notify()
          //   toast.success('Product Added to Cart', {
          //     position: "top-right",
          //   autoClose: 3000,
          //   // backgroundColor: 'green',
          //   // color: 'white',
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   });
          // }
         
       
    
       
      } catch (error) {
        console.error('An error occurred while fetching the data:', error);
      } 
    }
    


  return (
    <>
     {/* <section className=' border-2 h-[100px] border-black overflow-hidden bg-white w-[100vw]'> */}

<div data-animated="true" className="scroller " data-speed="faster">
<ul  className="scroller__inner m-0  p-0 list-none flex flex-wrap gap-4">
{
  slide.map((category, index) => (
    // <li key={index} className="p-4 border-2 border-black bg-primary-400 rounded-lg shadow-md">{department}</li>
    <h1
    key={index}
    className="text-2xl xxs:text-sm xs:text-sm text-center border-2 border-green-500 rounded-lg shadow-md px-4 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-300 to-green-500"
    style={{
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    {/* <Divider orientation='horizontal' /> */}
    {category}
  </h1>
    ))
    }
    </ul>
    </div>
{/* </section> */}
<div key={Math.random()} className='w-full  flex mt-10 justify-evenly gap-16 items-center flex-wrap min-h-[100vh]  p-2 ' >
        {/* <div  className='w-full h-[100%] z-50 bg-[#285d31] absolute  ' ></div> */}
       
           
        {categories.map((product : any, index: number) => (
    
           
           <>
           <ToastContainer key={index} className={"z-50  mt-[100px]  "} />
<Card key={index}  maxH='2xl' maxW='xs'>
  <CardBody>
    <Image
      src={(product as any).fileURL}
      alt={(product as any).productName}
      width={500}
      height={500}
      // borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{(product as any).productName}</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
      <Text color='green.600' fontSize='2xl'>
        RS-{(product as any).productPrice}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
    <Link  href={`/store/${product.productCategory}/${product._id}`}>
      <Button variant='solid' colorScheme='green'>
      Product Details
      </Button>
      </Link>
      {
      spinner == true ? <CircularProgress isIndeterminate color='green.300' /> : <Button onClick={()=>addToCart(product.productCategory , product._id)} variant='ghost' colorScheme='green'>
      Add to cart
    </Button>
     } 
      
    </ButtonGroup>
  </CardFooter>
</Card>
   
     
  

      </>
    
         ))

        }

        

      </div>
    
    {/* </div> */}
    </>
  )
}

export default CategoryComp

