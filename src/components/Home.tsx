"use client";
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import back from '@/assets/homeBackImage.jpeg'
import diode from '@/assets/Diode 1N4007.jpg'
import { TbHandFinger, TbTruckDelivery } from "react-icons/tb";
import ProfileCarouselComp from './ProfileCarouselComp';
import { FaRegQuestionCircle } from "react-icons/fa";
import CarouselComp from './CarouselComp'
import { FaFacebookF } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";
import { GrLinkedin } from "react-icons/gr";
import FacultyReviewCarousel from './FacultyReviewCarousel'
import Link from 'next/link'
import { MdOutlinePriceCheck, MdOutlineSupportAgent } from 'react-icons/md'
import touch from '@/assets/getintouch.jpeg'
// import { io } from "socket.io-client";
const HomeComp = () => {

  
//   const socket = useMemo(() => io("http://localhost:4000"), []);
  
//   socket.on("connect", () => {
//     console.log('User connected')
//   })
//   socket.on('message',(message)=>{
//     console.log(message)
// })

  

  const [isLoading, setIsLoading] = useState(true);

  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index: any) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (

    <>

      <section className='flex w-[100vw] flex-col justify-center items-center' >
        <main className='w-[100%] py-8  flex xs:flex-col xxs:flex-col  sm:flex-col md:flex-col justify-end xxs:justify-center xs:justify-center sm:justify-center md:justify-center gap-40 xxs:gap-2 xs:gap-2 items-center ' >
          <section className='w-[45%] lg:ml-4 xxs:mt-10 xxs:w-full xs:w-full sm:w-[95%] md:w-[95%] sm:pl-0 md:pl-0  xxs:h-[60%] xs:h-[60%] sm:h-[60%] md:h-[60%] pl-4 flex flex-col gap-8 justify-center items-start' >
            <div className='w-full  flex justify-start items-center  ' >
              <p className='text-sm font-semibold' >Une Comp</p>
            </div>
            <div className='w-full font-bold xxs:text-2xl xs:text-2xl sm:text-4xl md:text-6xl lg:text-6xl text-8xl flex justify-evenly items-center  ' >
              <p>Empowering Your Innovations</p>
            </div>
            <div className='w-full  flex justify-start items-center  ' >
              <p className='text-lg xxs:text-sm xs:text-lg sm:text-lg md:text-lg lg:text-sm  font-bold text-justify xxs:p-2 xs:p-2 sm:pr-0 md:pr-0 pr-40' >Welcome to UneComp, your go-to destination for top-quality electronic components and project supplies designed for students. Our mission is to empower future engineers, developers, and innovators with the essential parts they need for their academic projects.

                At UneComp, we recognize the challenges students face in sourcing components, which is why we offer a wide selection, competitive prices, and exceptional customer service..</p>
            </div>
            <div className='w-full gap-12 xxs:gap-4  xs:gap-4 sm:gap-4 md:gap-4 flex xxs:flex-col xs:flex-col sm:flex-col md:flex-col justify-start items-center  ' >
          <Link href="/store" >
          
             <button className='text-white font-bold xxs:text-sm xs:text-sm sm:text-sm md:text-sm   lg:text-sm text-2xl hover:bg-opacity-55 bg-[#285d31] px-8 py-2 rounded-lg border-2 hover:border-[#285d31] hover:bg-transparent hover:text-[#285d31]' >Visit Our Store</button>
          </Link> 
          <Link href="/auth/login" >
              <button className=' font-bold xxs:text-sm xs:text-sm text-2xl sm:text-sm md:text-sm lg:text-sm hover:bg-opacity-55 text-[#285d31] border-2 border-[#285d31] hover:bg-slate-200 px-8 py-2 rounded-lg hover:border-2 hover:border-[#285d31] hover:bg-transparent hover:text-[#285d31]' >Get in Touch</button>
          </Link>
            </div>
          </section>
          <section className='w-[40%]  relative xxs:w-full xs:w-full sm:w-full md:w-full h-full xss:h-[60%] sm:h-[60%] md:h-[60%] flex justify-center items-center' >
            <div className="absolute -left-40 xxs:left-2 xs:left-2 sm:left-16 sm:left-20  bg-white lg:w-[500px] w-[600px] xxs:w-[340px] xxxs:h-[120px] xs:w-[340px] rounded-lg shadow-3 p-6">
              <div className="flex justify-start  items-center gap-8 xxs:mb-0 mb-4">
                <Image src={diode} alt="" width={500} height={500} className="w-[120px] h-[120px] xxs:w-[60px] xxs:h-[60px] object-cover rounded-full shadow-md" />
                <p className="text-xl xxs:text-sm xs:text-sm lg:text-lg font-semibold text-gray-800">Wide Range of Components</p>
              </div>
              <div className="flex bg-slate-200  flex-col justify-between items-start xxs:p-2 p-4 rounded-lg shadow-inner">
                <p className="text-lg xxs:text-sm xs:text-sm sm:text-sm  md:text-sm lg:text-sm font-bold text-gray-700 mb-2">Electronic Components</p>
                <div className=" xxs:text-sm sm:text-sm md:text-sm lg:text-sm xs:text-sm text-gray-600">
                  Partner with us to access top-quality electronic components for your projects.
                </div>
              </div>
            </div>

            <div className='w-full  flex justify-center items-center h-[80%] bg-[#285d31]' >

              <Image src={back} alt='home' width={500} height={500} className='w-[90%] rounded-full h-[90%]' />
            </div>
          </section>
        </main>
        <section className="w-full py-8 xxs:flex-col xs:flex-col sm:flex-col md:flex-col flex justify-between items-center border-2 border-gray-300 p-4 bg-white rounded-lg shadow-lg">
          <div className="w-1/3 xxs:w-full xs:w-full flex justify-center items-center">
            <p className="text-lg xxs:text-sm xs:text-sm font-semibold text-gray-700">Partners that trust us</p>
          </div>
          <div className="w-2/3 xxs:w-full xs:w-full flex justify-evenly items-center">
            <p className="text-gray-600 lg:text-sm hover:text-gray-900 transition duration-200">MUET Faculty</p>
            <p className="text-gray-600 lg:text-sm hover:text-gray-900 transition duration-200">Previous Customers</p>
             </div>
        </section>

        <section className='w-[98%] py-8  xs:w-full sm:w-full md:w-full bg-gray-200 rounded-xl flex flex-col justify-start items-end' >

          <div className='w-[90%] h-[10%] xxs:h-[5%] sm:h-[5%] md:h-[5%] xs:h-[5%] flex justify-start items-center ' >
            <div className='w-[10px] h-[10px] bg-green-800 rounded-full' ></div> <p className='text-xl lg:text-lg xxs:text-sm font-semibold ml-2 text-gray-700 xxs:p-0 p-4' >Our Services & benefits</p>
          </div>
          <div className='w-[90%] h-[20%] xxs:h-[5%] sm:h-[10%] md:h-[10%] xs:h-[5%] flex justify-start items-center' >
            <h1 className='text-6xl lg:text-4xl xxs:text-xl xs:text-xl font-semibold text-gray-700 xxs:p-0 xs:p-0 p-4' >Our Services</h1>
          </div>
          <div className='w-[90%] h-[70%] flex justify-start flex-wrap items-center' >
            <div className='w-[49%] xxs:w-full sm:w-full md:w-full xs:w-full flex flex-col justify-evenly xxs:items-start sm:items-start md:items-start  items-center' >
              <TbTruckDelivery size={50} />
              <h1 className='text-4xl lg:text-lg xxs:text-xl sm:text-xl md:text-xl xs:text-xl font-semibold text-gray-700 p-4' >Fast Delivery</h1>
              <p className='text-lg lg:text-sm xxs:text-sm font-semibold text-gray-700 p-4' >We deliver your products within 2-3 days of ordering.</p>

            </div>
            <div className='w-[49%] xxs:w-full sm:w-full md:w-full xs:w-full flex flex-col justify-evenly xxs:items-start sm:items-start md:items-start  items-center' >
              <TbHandFinger size={50} />
              <h1 className='text-4xl lg:text-lg xxs:text-xl sm:text-xl md:text-xl xs:text-xl font-semibold text-gray-700 p-4' >Comprehensive Product Selection</h1>
              <p className='text-lg lg:text-sm xxs:text-sm xs:text-sm font-semibold text-gray-700 p-4' >Explore a diverse range of high-quality electronic components tailored for student projects.</p>

            </div>
            <div className='w-[49%] xxs:w-full sm:w-full md:w-full xs:w-full  flex flex-col justify-evenly xxs:items-start sm:items-start md:items-start  items-center' >
              <MdOutlineSupportAgent size={50} />
              <h1 className='text-4xl lg:text-lg xxs:text-xl sm:text-xl md:text-xl xs:text-xl font-semibold text-gray-700 p-4' >Technical Support</h1>
              <p className='text-lg lg:text-sm xxs:text-sm xs:text-sm font-semibold text-gray-700 p-4' >Access expert advice and technical assistance to ensure your projects are successful.</p>

            </div>
            <div className='w-[49%] xxs:w-full sm:w-full md:w-full xs:w-full flex flex-col justify-evenly xxs:items-start sm:items-start md:items-start  items-center' >
              <MdOutlinePriceCheck size={50} />
              <h1 className='text-4xl lg:text-lg xxs:text-xl sm:text-xl md:text-xl xs:text-xl font-semibold text-gray-700 p-4' >Competitive Pricing</h1>
              <p className='text-lg lg:text-sm xxs:text-sm xs:text-sm font-semibold text-gray-700 p-4' >Enjoy competitive prices on all our products, designed to fit your budget without compromising on quality.</p>

            </div>
          </div>

        </section>

        <section className='w-[80%] xxs:w-[95%] xs:w-[95%] sm:w-[95%] md:w-[95%] py-10 flex xxs:flex-col  xs:flex-col sm:flex-col md:flex-col justify-between xxs:justify-center sm:justify-center md:justify-center items-center ' >

          <div className='w-[50%] h-[300px] xxs:h-[10%] sm:h-[10%] md:h-[10%] xs:h-[10%] flex justify-start xxs:justify-center sm:justify-center md:justify-center xs:justify-center xxs:items-center xs:items-center sm:items-center md:items-center items-start ' >
            <h1 className='text-6xl lg:text-4xl xxs:text-2xl xs:text-2xl sm:text-4xl med:text-4xl  font-semibold text-gray-700 p-4' >About us</h1>

          </div>

          <div className='w-[50%] xxs:w-full xs:w-full sm:w-full md:w-full gap-4 flex flex-col justify-center items-start xxs:items-center sm:items-center md:items-center ' >
            <p className='text-lg lg:text-sm xxs:text-sm xs:text-sm sm:text-lg md:text-lg font-semibold text-justify text-gray-700 p-4' >Welcome to UneComp, your premier online store for high-quality electronic components delivered to your doorstep. We specialize in meeting the diverse needs of students and customers with curated products sourced from trusted local manufacturers. Founded with a commitment to supporting educational and project needs, UneComp offers hassle-free shopping, competitive pricing, and prompt delivery. Join us and empower your projects with UneComp — where local convenience meets top-quality service. </p>
           <Link href="/about" >
            <button className='text-white font-bold text-2xl lg:text-sm xxs:text-sm sm:text-sm md:text-lg xs:text-sm hover:bg-opacity-55 bg-[#285d31] px-8 py-2 rounded-lg border-2 hover:border-[#285d31] hover:bg-transparent hover:text-[#285d31]' >Learn More</button>
           </Link>
          </div>

        </section>

        {/* <section className='w-full flex justify-center items-center' > */}
          {/* {isLoading ? <CarouselSkeleton /> : <ProfileCarouselComp />} */}
          {/* <ProfileCarouselComp /> */}
        {/* </section> */}

        {/* <section className="w-full h-[50vh] xxs:h-full xs:h-full xxs:gap-8 xs:gap-8 flex flex-wrap justify-evenly items-center bg-white p-4 rounded-lg shadow-lg">
          <div className="w-56 lg:w-38 flex flex-col justify-center items-center border-2 border-gray-300 p-4 rounded-lg shadow-md">
            <h1 className="text-2xl lg:text-lg font-bold text-gray-800 mb-2">5,000 + M</h1>
            <p className="text-center lg:text-sm text-gray-600">Renewable Energy Generated</p>
          </div>
          <div className="w-56 lg:w-38 flex flex-col justify-center items-center border-2 border-gray-300 p-4 rounded-lg shadow-md">
            <h1 className="text-2xl lg:text-lg font-bold text-gray-800 mb-2">5,000 + M</h1>
            <p className="text-center lg:text-sm text-gray-600">Renewable Energy Generated</p>
          </div>
          <div className="w-56 lg:w-38 flex flex-col justify-center items-center border-2 border-gray-300 p-4 rounded-lg shadow-md">
            <h1 className="text-2xl lg:text-lg font-bold text-gray-800 mb-2">5,000 + M</h1>
            <p className="text-center lg:text-sm text-gray-600">Renewable Energy Generated</p>
          </div>
          <div className="w-56 lg:w-38 flex flex-col justify-center items-center border-2 border-gray-300 p-4 rounded-lg shadow-md">
            <h1 className="text-2xl lg:text-lg font-bold text-gray-800 mb-2">5,000 + M</h1>
            <p className="text-center lg:text-sm text-gray-600">Renewable Energy Generated</p>
          </div>
        </section> */}

        <section className='w-[90%]  flex flex-col justify-evenly items-center' >

          <div>
            <h1 className='text-6xl lg:text-4xl xxs:text-2xl xs:text-2xl sm:text-4xl md:text-4xl xxs:text-center xs:text-center font-semibold text-gray-700 p-4' >Meet Our Muet Faculty Reviews</h1>
            <p className='text-lg xxs:text-sm xs:text-sm sm:text-lg md:text-lg xxs:text-center sm:text-center md:text-center xs:text-center font-semibold text-gray-700 p-4' >Discover what educators and experts are saying about UneComp</p>
          </div>
          <FacultyReviewCarousel />
        </section>

        <section className='w-full  xxs:flex-col sm:flex-col md:flex-col xs:flex-col flex items-center justify-center'>
          <div className='w-[70%] py-8 xxs:w-full sm:w-full md:w-full xs:w-full flex  xxs:py-4 sm:py-4 md:py-4 xs:py-4 gap-40 justify-end items-center h-full bg-green-800' >
            <div className='h-full w-[50%] xxs:w-full sm:w-full md:w-full xs:w-full flex flex-col justify-center items-start xxs:items-center sm:items-center md:items-center xs:items-center ' >
              <h1 className='text-6xl lg:text-2xl   xxs:text-2xl sm:text-4xl md:text-2xl xs:text-2xl font-semibold text-white p-4' >Get in Touch</h1>
              <p className='text-lg lg:text-lg xxs:text-sm xs:text-sm sm:text-sm md:text-sm xxs:text-center xs:text-center sm:text-center md:text-center font-semibold text-white p-4' >Have any questions or concerns? Feel free to reach out to us. We're here to help!</p>
            <Link className='w-full flex justify-center items-center' href="/auth/login" > 
              <button className='text-white w-[60%] lg:text-sm xxs:w-[50%] sm:w-[50%] md:w-[50%] xs:w-[50%] font-bold xxs:text-sm sm:text-sm md:text-lg  xs:text-sm text-2xl hover:bg-opacity-55 bg-[#285d31] px-8 py-2 rounded-lg border-2  hover:bg-transparent ' >Get In Touch</button>
            </Link>
            </div>
            <div className='h-full overflow-hidden xxs:hidden xs:hidden sm:hidden md:hidden w-[20%] rounded-tl-full rounded-bl-full bg-white' >
<Image    src={touch} alt="ds" width={500} height={500} className=" w-full h-full  object-cover  shadow-md" />     
            </div>
          </div>
          <div className='w-[30%] xxs:hidden xs:hidden sm:hidden md:hidden h-full bg-gray-200' >
            <div className='h-full xxs:hidden xs:hidden sm:hidden md:hidden w-[45%] rounded-tr-full rounded-br-full bg-green-800' >

            </div>
          </div>

        </section>



        <section className="w-full  xxs:overflow-y-scroll sm:overflow-y-scroll md:overflow-y-scroll xs:overflow-y-scroll  bg-gray-200 flex flex-col items-center p-8">
          <div className="w-full flex flex-col justify-center items-center mb-8">
            <h1 className="text-6xl lg:text-4xl xxs:text-4xl sm:text-5xl md:text-5xl xs:text-4xl font-semibold text-gray-700 p-4">FAQ</h1>
            <p className="text-lg lg:text-sm xxs:text-sm sm:text-lg md:text-lg xs:text-sm font-semibold text-gray-700 p-4 text-center">
              Have any questions or concerns? Feel free to reach out to us. We're here to help!
            </p>
          </div>
          <div className="w-[90%]  xxs:w-full sm:w-full md:w-full xs:w-full flex flex-wrap justify-between items-start gap-8">
  {[
    {
      question: 'What is UneComp?',
      answer: 'UneComp is your premier online store for high-quality electronic components, offering convenient doorstep delivery. We specialize in providing a curated selection sourced from trusted manufacturers, prioritizing ease of access and reliability.'
    },
    {
      question: 'How does it work?',
      answer: 'Ordering from UneComp is simple: browse our selection, add items to your cart, proceed to checkout, and enjoy prompt doorstep delivery. We ensure a hassle-free experience with our commitment to quality and customer satisfaction.'
    },
    {
      question: 'What are the benefits?',
      answer: 'Benefits of choosing UneComp include high-quality products, convenient doorstep delivery, reliable customer service, and a seamless shopping experience tailored for students and professionals.'
    },
    {
      question: 'How to get started?',
      answer: 'Getting started with UneComp is easy: browse our products, select what you need, and proceed to checkout. Our user-friendly platform ensures a smooth shopping experience from start to finish.'
    },
    {
      question: 'Is it secure?',
      answer: 'Yes, UneComp prioritizes security in every transaction. We use industry-standard encryption and secure payment gateways to protect your personal and financial information.'
    },
    {
      question: 'How can I contact support?',
      answer: 'For any assistance or queries, our dedicated support team is available via email at asadchipa15@gmail.com || abdulmoizawan@acm.org or through our contact form on the website. We strive to provide timely and helpful responses to all inquiries.'
    }
  ].map((item, index) => (
    <div
      key={index}
      className="w-[45%] xxs:w-full xs:w-full sm:w-full md:w-full  bg-white border-2 border-gray-300 rounded-lg shadow-md overflow-hidden transition-all"
    >
      <div
        className="px-4 xxs:px-2 sm:px-2 md:px-2 xs:px-2 xxs:py-4 xs:py-2 py-6 flex justify-between items-center cursor-pointer bg-slate-300 hover:bg-slate-400 transition-colors"
        onClick={() => toggleQuestion(index)}
      >
        <h1 className="text-2xl lg:text-xl xxs:text-xl sm:text-2xl md:text-2xl xs:text-xl font-semibold text-gray-700">{item.question}</h1>
        <p className="text-4xl xxs:text-2xl xs:text-2xl font-semibold text-gray-700">
          {openQuestion === index ? '-' : '+'}
        </p>
      </div>
      <div
        className={`px-4 py-6 text-gray-600 transition-max-height duration-500 ease-in-out ${openQuestion === index ? 'max-h-screen' : 'max-h-0'
          } overflow-hidden`}
      >
        <p className='xxs:text-sm lg:text-lg xs:text-sm'>{item.answer}</p>
      </div>
    </div>
  ))}
</div>

          <div className=" w-[50%] xxs:w-full xs:w-full sm:w-full md:w-full flex xxs:mt-4 xs:mt-4 flex-col justify-center items-center">
            <FaRegQuestionCircle size={50} />
            <h1 className="text-4xl lg:text-2xl xxs:text-xl xs:text-xl sm:text-xl md:text-xl font-semibold text-gray-700 p-4">Still have a Question?</h1>
            <p className="text-lg lg:text-sm xxs:text-sm xs:text-sm sm:text-xl md:text-xl font-semibold text-gray-700 p-4 text-center">
              Feel free to reach out to us. We're here to help!
            </p>
            <button className="text-white lg:text-sm w-[40%] xxs:w-[80%] sm:text-xl md:text-xl xs:w-[80%] xxs:text-sm xs:text-sm active:scale-95 font-bold text-2xl bg-[#285d31] px-8 py-2 rounded-lg border-2 transition-transform">
          <Link href="/contact" >
              Contact Us
          </Link>
            </button>
          </div>
        </section>

        <section className='w-full py-8 xxs:py-4 sm:py-4 md:py-4 xs:py-4 flex flex-col justify-center items-center' >
          <h1 className='text-6xl lg:text-4xl xxs:text-2xl sm:text-4xl md:text-4xl xs:text-2xl xxs:text-center sm:text-center md:text-center xs:text-center font-semibold text-gray-700 p-4' >What our customers say</h1>
          <p className='text-lg lg:text-sm w-[50%] xxs:w-[90%] sm:w-[90%] md:w-[90%] text-justify xxs:text-sm xs:text-sm xxs:text-center xs:text-center font-semibold text-gray-700 p-4' >At UneComp, we empower innovation with our premium selection of electronic components. Trusted by professionals and students alike, our commitment to quality ensures that every purchase meets your highest standards for reliability and performance..</p>
          <CarouselComp />
        </section>

        {/* <section className='' >

    </section> */}

        <footer className="w-[100vw]  flex flex-col justify-between xxs:justify-between sm:justify-between md:justify-between items-center bg-gray-100">
          <div className="w-full  flex xxs:flex-col xs:flex-col sm:flex-col md:flex-col justify-evenly items-start  p-8">
            <div className="w-[20%] xxs:w-full xs:w-full sm:w-full md:w-full xxs:h-40 xs:h-80 h-[80%] flex flex-col justify-start items-center">
              <h1 className="text-4xl lg:text-2xl xxs:text-4xl sm:text-4xl md:text-4xl xs:text-4xl font-semibold text-gray-700 select-none p-4">Une Comp</h1>
            </div>
            <div className="w-[20%] xxs:w-full xs:w-full sm:w-full md:w-full xxs:h-40 xs:h-80 h-[80%] flex flex-col justify-start items-center">
              <h1 className="text-4xl lg:text-xl xxs:text-2xl sm:text-2xl md:text-2xl xs:text-2xl  font-semibold text-gray-700 select-none p-4">Platform</h1>
              <p className="text-lg lg:text-sm xxs:text-sm sm:text-lg md:text-lg font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">Delivery Solutions</p>
              <p className="text-lg lg:text-sm xxs:text-sm sm:text-lg md:text-lg font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">Project related Products</p>
              <p className="text-lg lg:text-sm xxs:text-sm sm:text-lg md:text-lg font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">Project Deals</p>
            </div>
            <div className="w-[20%] xxs:w-full xs:w-full xxs:h-48 xs:h-48 h-[80%] flex flex-col justify-start items-center">
              <h1 className="text-4xl lg:text-xl xxs:text-2xl sm:text-2xl md:text-2xl xs:text-2xl font-semibold text-gray-700 select-none p-4">Company</h1>
              <Link href={"/about"} >
              <p className="text-lg lg:text-sm xxs:text-sm  xs:text-sm sm:text-lg md:text-lg font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">About</p>
              </Link>
              <Link href={"/ourmission"} >
              <p className="text-lg lg:text-sm xxs:text-sm  xs:text-sm sm:text-lg md:text-lg font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">Our Mission</p>
              </Link>
              <Link href={"/contact"} >
              <p className="text-lg lg:text-sm xxs:text-sm  xs:text-sm sm:text-lg md:text-lg font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">Contact</p>
              </Link>
              <Link href={"/term&policies"} >
              <p className="text-lg lg:text-sm xxs:text-sm  xs:text-sm sm:text-lg md:text-lg font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">Terms & Conditions</p>
              </Link>
              {/* <p className="text-lg lg:text-sm xxs:text-sm xs:text-sm font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">Contact</p> */}
            </div>
            <div className="w-[30%] xxs:w-full xs:w-full sm:w-full md:w-full xxs:h-44   flex flex-col justify-start items-center">
              <h1 className="text-4xl lg:text-xl xs:text-2xl sm:text-2xl md:text-2xl xxs:text-2xl font-semibold text-gray-700 select-none p-4">Contact Support</h1>
              <p className="text-lg lg:text-sm xxs:text-sm xs:text-sm font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">Number</p>
              <p className="text-lg lg:text-sm xxs:text-sm xs:text-sm font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">Email</p>
              <p className="text-lg lg:text-sm xxs:text-sm xs:text-sm font-semibold text-gray-700 p-2 transition-transform duration-300 cursor-pointer hover:scale-105">Whatsapp number</p>
            </div>
            <div className="w-[20%] xxs:w-full xs:w-full sm:w-full md:w-full flex flex-col justify-start items-center">
             <Link target='_blank' href={"/"} >
              <div className="w-full flex justify-around items-center p-4 lg:p-3 flex-wrap transition-transform duration-300 hover:scale-105">
                <FaFacebookF  className=" w-[50px] lg:w-[20px] lg:h-[20px] h-[50px] text-blue-600" />
                <p className="text-lg lg:text-sm font-semibold text-gray-700 p-4 lg:p-3">Follow us on Facebook</p>
              </div>
             </Link>
             <Link target='_blank' href={"https://www.instagram.com/unec0mp?igsh=MXZnMXIxdWR2YjNrMA=="} >
              <div className="w-full flex justify-around items-center p-4 lg:p-3 flex-wrap transition-transform duration-300 hover:scale-105">
                <SiInstagram  className=" w-[50px] lg:w-[20px] lg:h-[20px] h-[50px] text-pink-500" />
                <p className="text-lg lg:text-sm font-semibold text-gray-700 p-4 lg:p-3">Follow us on Instagram</p>
              </div>
             </Link>
             <Link target='_blank' href={"https://www.linkedin.com/in/unecomp-creative-students-take-creative-decisions-aa7046283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"} >
              <div className="w-full flex justify-around items-center p-4 lg:p-3 flex-wrap transition-transform duration-300 hover:scale-105">
                <GrLinkedin  className=" w-[50px] lg:w-[20px] lg:h-[20px] h-[50px] text-blue-700" />
                <p className="text-lg lg:text-sm font-semibold text-gray-700 p-4 lg:p-3">Follow us on LinkedIn</p>
              </div>
             </Link>
            </div>
          </div>
          <div className="w-full h-[20%]  flex xxs:justify-center xs:justify-center justify-end items-center bg-gray-200 p-4">
            <p className="text-lg lg:text-sm xxs:text-sm xs:text-sm xxs:text-center xs:text-center font-semibold text-gray-700">© 2024 UneComp. All rights reserved.</p>
          </div>
        </footer>


      </section>


    </>
  )
}

export default HomeComp