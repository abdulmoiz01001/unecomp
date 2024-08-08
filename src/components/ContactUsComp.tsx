"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import contactImage from '@/assets/contact.jpeg';
import globalCartCountAction from '@/actions/globalCartCountAction';
import { cartsCount } from '@/lib/store/features/carts/cartsSlice';
import { useAppDispatch } from '@/lib/store/hooks';
gsap.registerPlugin(ScrollTrigger);

const ContactUsComp = () => {
  const dispatch = useAppDispatch();
  
        
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
    <div className="min-h-screen w-[100vw] bg-gray-100 flex flex-col items-center p-8">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full h-96 relative">
          <Image
            src={contactImage}
            alt="Contact Us"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-8 flex flex-col md:flex-row">
          <div  className="md:w-1/2 md:pr-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-4">
              We would love to hear from you! Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions. Please fill out the form on the right, and we will get in touch with you shortly.
            </p>
            <p className="text-gray-600 mb-4">
              You can also reach us at:
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Email:</strong> abdulmoizawan@acm.org
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Phone:</strong> 0123-456-789
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> 123 Company St, City, Country
            </p>
          </div>
          <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Message"
                className="px-4 py-2 border border-gray-300 rounded h-32"
              ></textarea>
              <button className="px-4 py-2 bg-green-600 text-white rounded active:scale-95 hover:bg-green-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsComp;