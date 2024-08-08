"üse client";
// import { Button, Card, CardBody, CardFooter, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import logo from '@/assets/R.jpeg'

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




  return (
    <div className="grid  place-content-center font-sans text-lg bg-primary-800 text-center">
      <div className="scroller" data-speed="fast" data-animated="true" >
        <ul  className="scroller__inner  m-0 p-0 list-none flex-wrap gap-4">
         
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
         <Image src={logo} alt='iamge' className='w-[200px] h-[300px] '  width={500} height={500} />
       
        </ul>
      </div>
    </div>
  );
};

export default ProfileCarouselComp;
