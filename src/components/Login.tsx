"use client"
import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { Input, InputGroup, InputRightElement, Button, CircularProgress } from '@chakra-ui/react'
import Link from 'next/link';
import loginAction from '@/actions/loginAction';
import { useRouter } from 'next/navigation';





const LoginComp = () => {

    const router = useRouter()
    const [show, setShow] = React.useState(false);
    const [ email , setEmail ] = useState('')
    const [ password , setPassword ] = useState('')
    const [ mail , setMail ] = useState("")
    const [error, setError] = useState('')
    const [ spinner , setSpinner ] = useState(false)
 
    const handleClick = () => setShow(!show)
    const handleSubmit = async ( e : React.FormEvent<HTMLFormElement>  ) => {
         e.preventDefault();
         setSpinner(true)
         console.log( " we are in login Comp " + email , password )
         loginAction( email , password ).then((res) => {
            console.log(res)
        
            //    router.push('/profile')
            setMail(res.message)
            if(res.message === 'User logged in'){
                router.push('/')
            }
        }
        ).catch((e) => {
            console.log(e)
            setError(e.message)
        })  
        setSpinner(false)
        // console.log( email , password )s
    }
  return (
   <>
    <div className='w-[100vw] h-[100vh] border-2 flex justify-center items-center text-[#285d31]  font-bold xs:w-full xxs:w-full' >
            
            <div className='w-[35%] h-[80%] border-2 flex  flex-col items-center justify-start bg-[#ffffff] xs:w-full xxs:w-full' >
               <Link href={"/auth/signup"} >
               
               <Button  colorScheme='teal' variant='solid'>
                        Go to SignUp
                    </Button>
               </Link> 
                <div className=' w-full flex flex-col-reverse  justify-around items-center'><h1 className='text-4xl' >Sign In Form</h1><CgProfile size={100} /></div>
                <form  onSubmit={handleSubmit} className='w-full flex flex-col mt-8 justify-start items-center gap-10 h-[400px]' >
                   
                    <Input value={email} onChange={(e)=>setEmail(e.currentTarget.value)} variant='outline' placeholder='Enter Email' />
                    <InputGroup className='flex flex-col' size='md'>
                        <Input
                        value={password}
                        onChange={(e)=>setPassword(e.currentTarget.value)}
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />

                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {mail ? <p>{mail}</p> : <p>{error}</p>}
                  {
                        spinner ? <CircularProgress isIndeterminate color='green.300' /> : <Button  type='submit' colorScheme='teal' variant='outline'>
                        Sign In
                     </Button>
                  }  
                    
                </form>
            </div>
        </div>
   </>
  )
}

export default LoginComp