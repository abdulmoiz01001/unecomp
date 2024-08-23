"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Logo from '@/assets/about-us.png';
import globalCartCountAction from '@/actions/globalCartCountAction';
import { cartsCount } from '@/lib/store/features/carts/cartsSlice';
import { useAppDispatch } from '@/lib/store/hooks';

gsap.registerPlugin(ScrollTrigger);

const AboutUsComp = () => {
  const dispatch = useAppDispatch();
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        );
  
    
        gsap.fromTo(
          textRef.current,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        );
      }, [Logo]);

            
  const countCarts = async () => {
    try{
      console.log('Counting carts')
    const cart =  await globalCartCountAction();
    if(cart == null){
      console.log('Cart is empty')
      return
    }
    dispatch(cartsCount(cart))

    }catch(error){
      console.error('Failed to fetch cart count:', error)
    }
 
  }

  useEffect(() => {
    console.log('Counting carts')
    countCarts()
  }, [])


  return (
<>
<div className="min-h-screen w-[100vw] bg-gray-100 flex flex-col items-center p-8">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full h-96 relative">
          <Image
            ref={imageRef}
            src={Logo}
            alt="About Us"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-8">
          <h1 ref={textRef} className="text-4xl font-bold text-gray-800 mb-4">
            About Us
          </h1>
          <p className="text-gray-600 mb-6">
          Welcome to our online store! We specialize in providing high-quality electronic components tailored specifically for university students at MUET. Our team is composed of passionate and skilled professionals who are dedicated to offering the best service possible.

</p>
          <p className="text-gray-600">
          Founded in 2024, we have quickly become a trusted resource for students seeking reliable components for their projects. We believe in innovation, quality, and customer satisfaction, and our mission is to deliver exceptional value through our products and services.

Thank you for choosing us to support your academic journey. We look forward to serving you and helping you achieve success in your studies and projects.   </p>
        </div>
      </div>
    </div>
</>
  )
}

export default AboutUsComp