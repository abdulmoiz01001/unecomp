// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import Image from 'next/image';

// const ProfileCarouselComp = () => {
  
//   const carouselRef = useRef(null);
//   const slideWidth = 2000; // Adjust based on your slide width
//   const duration = slides.length * 10; // Adjust duration based on the number of slides

//   useEffect(() => {
//     const carousel = carouselRef.current;
//     const tl = gsap.timeline({ repeat: -1 });

//     tl.to(carousel, {
//       x: -slideWidth * slides.length, // Move to the end of all slides
//       duration: 8, // Adjust duration based on the number of slides
//       ease: 'linear',
//       onComplete: () => {
//         gsap.set(carousel, { x: 0 }); // Reset position to start
//       },
//     });
//   }, [slides]);

//   return (
//     <div className='w-full h-full flex justify-center items-center'>
//       <div ref={carouselRef} className=' px-2 h-full flex justify-evenly items-center border-2 border-black'>
//         {slides.map((slide, index) => (
//           <div key={index} className='w-[1000px] px-2 h-[350px] border-2 border-black flex justify-between gap-8 items-center overflow-hidden shadow-lg rounded-lg'>
//             <Image src={slide.image} width={500} height={500} alt={`Slide ${index}`} className='w-[280px] h-[280px] rounded-full' />
//             <div className='w-[60%]'>
//               <p className='text-lg font-bold'>{slide.name}</p>
//               <p className='text-lg font-bold'>{slide.department}</p>
//               <p className='text-md'>{slide.review}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProfileCarouselComp;
import { Button, Card, CardBody, CardFooter, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import logo from '@/assets/R.jpeg'

const FacultyReviewCarousel = () => {
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
    <div className="grid h-[70%]  place-content-center font-sans text-lg bg-primary-800 text-center">
      <div className="scroller" data-speed="fast" data-animated="true" >
        <ul  className="scroller__inner m-0 p-0  list-none flex-wrap gap-4">
         
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relativ xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
        <div className='relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]' >
             <Image src={logo} alt='iamge' className='w-full h-full '  width={500} height={500}  />
            <div className='w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2  absolute top-[80%] lg:top-[60%] xxs:top-[50%] backdrop-blur-xl ' >
            <p className='text-lg font-bold'>- John Doe</p>
             <p className='text-sm text-justify font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</p>
            </div>
            </div>
       
        </ul>
      </div>
    </div>
  );
};

export default FacultyReviewCarousel;
