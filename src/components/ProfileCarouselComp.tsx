"use client";
import Image from 'next/image';
import React, { useEffect } from 'react';
import logo from '@/assets/R.jpeg';

// Function to generate random data
const generateRandomReviews = (count : any) => {
  return Array.from({ length: count }, (_, index) => ({
    name: `Person ${index + 1}`,
    review: `“This is a review text for person ${index + 1}.”`,
    image: logo,
  }));
};

const ProfileCarouselComp = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        if (scroller instanceof HTMLElement) {
          scroller.setAttribute("data-animated", "true");

          const scrollerInner = scroller.querySelector(".scroller__inner");
          if (!scrollerInner) return;
          const scrollerContent = Array.from(scrollerInner.children);

          scrollerContent.forEach((item) => {
            if (item instanceof HTMLElement) {
              const duplicatedItem = item.cloneNode(true) as HTMLElement;
              duplicatedItem.setAttribute("aria-hidden", "true");
              scrollerInner.appendChild(duplicatedItem);
            }
          });
        }
      });
    }
  }, []);

  const reviews = generateRandomReviews(5); // Generate 12 random reviews

  return (
    <div className="grid place-content-center font-sans text-lg bg-primary-800 text-center">
      <div className="scroller" data-speed="fast" data-animated="true">
        <ul className="scroller__inner m-0 p-0 list-none flex-wrap gap-4">
          {reviews.map((review, index) => (
            <li key={index} className="relative">
              <Image
                src={review.image}
                alt={`image-${index}`}
                className='w-[200px] h-[300px]'
                width={500}
                height={500}
              />
              <div className="absolute bottom-0 left-0 w-full p-2 bg-opacity-70 bg-black text-white text-center">
                <p className="text-lg font-bold">{review.name}</p>
                <p className="text-sm">{review.review}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCarouselComp;
