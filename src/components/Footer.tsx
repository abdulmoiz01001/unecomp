import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { MdPolicy } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { PiPhoneDisconnectFill } from "react-icons/pi";
import { FaInstagramSquare } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { FaFacebookSquare } from "react-icons/fa";


const FooterComp = () => {

  return (
   <>
   <footer className=' w-full h-[500px] xxs:h-[2000px] xs:h-[2000px] sm:h-[2000px] flex flex-col bg-white justify-center items-center ' >
  <div className='w-full h-[90%] flex xxs:flex-col xs:flex-col sm:flex-col bg-white justify-center items-center ' >

  <div className='w-[33%] xxs:w-full xxs:h-[43%] xs:w-full xs:h-[43%] sm:w-full sm:h-[43%] h-full  ' >

  {/* <img src="" alt="" /> */}
  <div className='w-full h-[30%] flex justify-center items-center ' >
  {/* <h1 className='text-6xl' >UneComp</h1> */}
  <h1
      className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-300 to-green-500"
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      >
      UneComp
    </h1>

  </div>
  <div className=' w-full h-[70%] flex flex-col justify-evenly items-center '  >
    {/* <h1 className='text-4xl' >About Us</h1> */}
    <h1
      className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-300 to-green-500"
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      About Us
    </h1>
    {/* <p  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse repellendus provident doloribus vero officia, dolore tempore perferendis temporibus aspernatur perspiciatis quos illum cumque autem, eum et ratione, iusto similique fuga placeat ad ex ea recusandae! Soluta eum deserunt sed inventore alias aliquid explicabo tempore delectus!</p> */}
    <h1
      className="text-xl w-[80%] font-extrabold bg-clip-text text-transparent bg-green-500"
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, placeat illum. Nulla illo earum delectus dicta assumenda sit! Neque ipsa minus tempora aperiam voluptatibus. Dolor quae culpa, eaque, deserunt ipsum enim aliquam at dignissimos nulla distinctio numquam harum maiores consequuntur corrupti. Error nihil quas aliquid!
    </h1>
  </div>
  </div>
  <div className='w-[33%] xxs:w-full xxs:h-[33%] xs:w-full xs:h-[33%] sm:w-full sm:h-[33%] h-full  ' >
   <div className='w-full h-[40%] flex justify-center items-center' >
   <h1
      className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-300 to-green-500"
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      >
      Quick Links
    </h1>
   </div>
   <div className='w-full h-[60%] flex px-8 flex-col justify-evenly items-center ' >
    <div className='w-full flex justify-between transition-all bg-gradient-to-r from-green-500 via-green-300 to-green-500 text-white active:scale-105 duration-300 hover:bg-green-300 px-2 hover:scale-95 cursor-pointer  items-center' >
    <li className='w-full h-[20%] flex justify-start items-center ' >Home</li> <FaHome size={40} color='white' />

    </div>
    <div className='w-full flex justify-between transition-all bg-gradient-to-r from-green-500 via-green-300 to-green-500 text-white active:scale-105 duration-300 hover:bg-green-300 px-2 hover:scale-95 cursor-pointer  items-center' >
    <li className='w-full h-[20%] flex justify-start items-center ' >Store</li> <FaStore size={40} color='white' />
    </div>
    <div className='w-full flex justify-between transition-all bg-gradient-to-r from-green-500 via-green-300 to-green-500 text-white active:scale-105 duration-300 hover:bg-green-300 px-2 hover:scale-95 cursor-pointer  items-center' >
    <li className='w-full h-[20%] flex justify-start items-center ' >Terms & Conditions</li> <MdPolicy size={40} color='white' />
        </div>
    <div className='w-full flex justify-between transition-all bg-gradient-to-r from-green-500 via-green-300 to-green-500 text-white active:scale-105 duration-300 hover:bg-green-300 px-2 hover:scale-95 cursor-pointer  items-center' >
    <li className='w-full h-[20%] flex justify-start items-center ' >Contact Us</li> <PiPhoneDisconnectFill size={40} color='white' />
    </div>
    <div className='w-full flex justify-between transition-all bg-gradient-to-r from-green-500 via-green-300 to-green-500 text-white active:scale-105 duration-300 hover:bg-green-300 px-2 hover:scale-95 cursor-pointer  items-center' >
    <li className='w-full h-[20%] flex justify-start items-center ' >Profile</li> <IoMdContact size={40} color='white' /> 
    </div>
   </div>
  </div>
  <div className='w-[33%] xxs:w-full xxs:h-[23%] xs:w-full xs:h-[23%] sm:w-full sm:h-[23%] h-full flex flex-col justify-center items-center  ' >
   <div className='w-full h-[30%] flex justify-center items-center' >
    <h1
      className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-300 to-green-500"
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      Social Media Links
    </h1>
   </div>
   <div className='w-[50%] h-[70%] flex justify-evenly items-center flex-wrap' >
   <FaInstagramSquare className='cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 select-none' size={50} color='green' /> <GrLinkedin className='cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 select-none' size={50} color='green' /> <FaFacebookSquare className='cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 select-none' size={50} color='green' />
   </div>
  </div>
        </div>

  <div className='w-full flex justify-center items-center xxs:h-[10%] xxs:text-center xs:h-[10%] xs:text-center sm:h-[10%] sm:text-center h-[20%] bg-green-300 ' >
<h1 className='text-2xl font-bold' >&copy; 2024 UneComp. All rights reserved. Designed for UneComp   </h1>
  </div>

</footer>
   </>
  )
}

export default FooterComp