"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import MissionLogo from '@/assets/mission.jpg';
import globalCartCountAction from '@/actions/globalCartCountAction';
import { cartsCount } from '@/lib/store/features/carts/cartsSlice';
import { useAppDispatch } from '@/lib/store/hooks';

gsap.registerPlugin(ScrollTrigger);

const OurMissionComp = () => {
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
  }, [MissionLogo]);

  const countCarts = async () => {
    try {
      console.log('Counting carts')
      const cart = await globalCartCountAction();
      if (cart == null) {
        console.log('Cart is empty')
        return;
      }
      dispatch(cartsCount(cart));
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    }
  }

  useEffect(() => {
    console.log('Counting carts')
    countCarts();
  }, []);

  return (
    <div className="min-h-screen w-[100vw] bg-gray-100 flex flex-col items-center p-8">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full h-96 relative">
          <Image
            ref={imageRef}
            src={MissionLogo}
            width={500}
            height={500}
            alt="Our Mission"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-8">
          <h1 ref={textRef} className="text-4xl font-bold text-gray-800 mb-4">
            Our Mission
          </h1>
          <p className="text-gray-600 mb-6">
            Our mission is to innovate and lead in our industry, setting new standards for excellence. We are committed to providing outstanding value to our customers through our products and services.
          </p>
          <p className="text-gray-600">
            Since our founding, we have strived to make a positive impact on our community and beyond. Our team is dedicated to continuous improvement and upholding our core values of integrity, quality, and customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurMissionComp;
