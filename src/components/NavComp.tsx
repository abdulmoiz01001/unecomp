import Link from 'next/link'
import React from 'react'

const NavComp = ({makeActive, homeActive, storeActive, aboutActive, contactActive}: {makeActive: any, homeActive: boolean, storeActive: boolean, aboutActive: boolean, contactActive: boolean}) => {
    
  return (
    <>
    <ul className='flex justify-evenly items-center'>
          <Link href={'/'} >
            <li id='home' onClick={(e)=>{makeActive(e)}} className={`cursor-pointer ${ homeActive && 'border-b-2' } text-[#285d31] border-[#285d31] font-bold text-xl active:scale-110 select-none`} >Home</li>
          </Link>
          <Link href={'/store'} >
            <li id='store' onClick={(e)=>{makeActive(e)}} className={`cursor-pointer ${ storeActive && 'border-b-2' } text-[#285d31] border-[#285d31] font-bold text-xl active:scale-110 select-none`} >Store</li>
          </Link>
          <Link href={'/about'} >
            <li id='about' onClick={(e)=>{makeActive(e)}} className={`cursor-pointer ${ aboutActive && 'border-b-2' } text-[#285d31] border-[#285d31] font-bold text-xl active:scale-110 select-none`} >About</li>
          </Link>
          <Link href={'/contact'} >
            <li id='contact' onClick={(e)=>{makeActive(e)}} className={`cursor-pointer ${ contactActive && 'border-b-2' } text-[#285d31] border-[#285d31] font-bold text-xl active:scale-110 select-none`} >Contact</li>
          </Link>
          
          </ul>
          </>
  )
}

export default NavComp