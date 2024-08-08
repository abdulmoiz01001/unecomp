"use client"
import React, { useEffect , useState } from 'react'
import { AbsoluteCenter, Avatar, Box, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react'
import HeaderComp from './Header'
import { useAppSelector } from '@/lib/store/hooks'
import sessionAction from '@/actions/sessionAction'
import Link from 'next/link'
import LandingPageHeaderComp from './LandingPageHeader'
import logoutAction from '@/actions/logoutAction'
import LogoutButton from '@/components/LogoutButton'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
const DrawerComp = () => {
  const path = usePathname()
  const router = useRouter()

  const [ userName , setUserName ] = useState('')
  const [ userEmail , setUserEmail ] = useState('')



    // const getUser = useAppSelector((state) => state.user.user)
    // console.log("USer from redux store "+ getUser)

    useEffect(() => {
        sessionAction().then((res) => {
            // console.log(res)
            setUserName(res?.user?.name || '')
            setUserEmail(res?.user?.email || '')
        }).catch((e) => {
            console.log(e)
        })
    }, [])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleClick = () => {
        // setSize(newSize)
        onOpen()
      }

      const handleLogout = async () => {
        try{
         const res = await logoutAction()
             if(res){

               if(res?.message === 'User logged out successfully'){
                 router.push('/auth/login')
                }
              }

        } catch(e){
          console.log(e)
        }
      }
  return (

   <>
   {/* {
    path == '/' ?   <LandingPageHeaderComp handleClick={handleClick} /> : <HeaderComp handleClick={handleClick}  />
   } */}
   <HeaderComp handleClick={handleClick}  />
   
  
    <Drawer onClose={onClose} isOpen={isOpen} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton  />
          <DrawerHeader className='flex flex-col justify-start items-center' ><Avatar onClick={() => handleClick()} m={4} className='cursor-pointer' src='https://bit.ly/broken-link' /> <div className='flex flex-col items-center justify-center' ><p className='lg:text-lg' >{userName}</p>   <p className='lg:text-lg' >{userEmail}</p></div> </DrawerHeader>
          <DrawerBody>
            <Box position='relative' padding='10'>
              <Divider />
              <AbsoluteCenter bg='white' px='4'>
               <span className='flex justify-center items-center lg:text-lg' >
                
                Menu
                </span> 
              </AbsoluteCenter>
            </Box>
          

              <div className='w-full h-full' >
                <ul className='flex flex-col justify-evenly items-start lg:h-[65%] h-[400px]' >
                  
               <Link href={"/profile"} >
               
                 <li className='cursor-pointer lg:text-sm text-[#285d31] active:border-b-2 border-[#285d31] font-bold text-xl active:scale-110 select-none' >Profile</li>
               </Link> 
               <Link href={"/orders"}>
                  <li className='cursor-pointer lg:text-sm text-[#285d31] font-bold text-xl active:scale-110 select-none' >Orders</li>
               
               </Link>
               <Link href={"/addtocart"}>
                  <li className='cursor-pointer lg:text-sm text-[#285d31] font-bold text-xl active:scale-110 select-none' >Add To Cart</li>
               
               </Link>
                  <li className='cursor-pointer lg:text-sm text-[#285d31] font-bold text-xl active:scale-110 select-none' >Settings</li>
                </ul>
                 <LogoutButton  />
                  </div>




                      
          </DrawerBody>
        </DrawerContent>
      </Drawer>
   </>
  )
}

export default DrawerComp