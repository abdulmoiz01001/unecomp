"use client"
import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { Input, InputGroup, InputRightElement, Button, CircularProgress } from '@chakra-ui/react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
// import bcrypt from 'bcryptjs';
// import { RegisterSchema } from '../../../schema/zod';
import Link from 'next/link';
// import axios from 'axios';
import registerAction from '@/actions/registerAction';
import { useAppDispatch } from '@/lib/store/hooks';
import { addUser } from '@/lib/store/features/user/userSlice';
import { set } from 'mongoose';
// import Register from '../../../model/register';

const SignupComp = () => {

    const dispatch = useAppDispatch()

    const [show, setShow] = React.useState(false);
    const [ mail , setMail ] = useState(null)
    const [ name , setName ] = useState('')
     const [ email , setEmail ] = useState('')
     const [ password , setPassword ] = useState('')
     const [ gender , setGender ] = useState('')
     const [error, setError] = useState('')
     const [ spinner , setSpinner ] = useState(false)
 
     const handleClick = () => setShow(!show)
 
     // const makeObject = async () => {
     //     console.log(name)
     // }
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        setSpinner(true)
        try {
            const values = { name, email, password, gender };
            const res : any = await registerAction(values);
            if (res.error) {
                setError(res.error);
                return;
            }else{
                setMail(res.message);
            }
        } catch (e: any) {
            console.log(e);
            setError(e.message);
        } finally {
            setSpinner(false); // Stop spinner
        }
    }


  return (
    <div className='w-[100vw]  border-2 flex justify-center items-center text-[#285d31]  font-bold xs:w-full xxs:w-full ' >
            
    <div className='w-[35%] border-2 flex  flex-col items-center justify-start bg-[#ffffff] xs:w-full xxs:w-full ' >
       <Link href={"/auth/login"} >
       
       <Button  colorScheme='teal' variant='solid'>
                Go to SignIn
            </Button>
       </Link> 
        <div className=' w-full flex flex-col-reverse  justify-around items-center'><h1 className='text-4xl' >Sign Up Form</h1><CgProfile size={100} /></div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col mt-8 justify-start items-center gap-10 h-[400px]' >
            <Input value={name} onChange={(e)=>setName(e.currentTarget.value)}     variant='outline' placeholder='Enter Your Name' />
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
            <RadioGroup defaultValue='2'>
                <Stack spacing={5} direction='row'>
                    <h1>Gender :</h1> <br ></br>
                    <Radio  colorScheme='red' value='male' checked={gender === "male"} onChange={(e)=>{setGender(e.currentTarget.value)}} >
                        Male
                    </Radio>
                    <Radio colorScheme='green' value='female' checked={gender === "female"} onChange={(e)=>{setGender(e.currentTarget.value)}}>
                        Female
                    </Radio>
                </Stack>
            </RadioGroup>
            {error && <h1>{error}</h1>}
            {mail &&  <h2 className='text-green-500  text-center' >{mail} </h2> }
           {
                spinner ? <CircularProgress isIndeterminate color='green.300' />: (
                     <Button  type='submit' colorScheme='teal' variant='outline'>
                   SignUp
                </Button>
                )
           }
        
        </form>
    </div>
</div>
  )
}

export default SignupComp