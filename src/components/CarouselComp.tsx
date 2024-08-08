import { useInterval } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from '@/assets/Icon.svg'
import Image from 'next/image';

const CarouselComp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const slides = [
    {
      image: 'https://th.bing.com/th/id/R.d7892d4f9aa766b5bfcbfbac3eb8dac0?rik=9o2b8eDDkrcrQw&pid=ImgRaw&r=0',
      text: 'The Electric Compoenets are available here at UneComp Market Place',
      button: 'Start Exploring Now',
      category: 'electronic component'
    },
    {
      image: 'https://th.bing.com/th/id/R.a92aee1ea3d5226671f83ec87147cc0f?rik=Tjfu5fYesvoLkQ&pid=ImgRaw&r=0',
      text: 'The architecture Components which are need of University Students are available here at UneComp Market Place',
      button: 'Start Exploring Now',
      category: 'architecture'
    },

  ];
  
  // setInterval(goToNext, 5000);
  useInterval(()=>{
    goToNext();
  },5000)

  return (
    <div className="relative xs:w-full  xxs:w-full sm:w-full md:w-full shadow-2xl xxs:shadow-none rounded-xl w-[40%]  mx-auto overflow-hidden">
      <div className="flex xs:h-full xxs:h-full sm:h-full md:h-full transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full gap-8 flex flex-col xxs:flex-col items-center justify-evenly xs:p-0 xxs:p-0 sm:p-0 md:p-0 p-4">
           <div className='w-60 flex justify-evenly items-center' >
            <Image width={500} height={500} src={logo} alt={`Slide ${index}`} className="w-[20px]" />
            <Image width={500} height={500} src={logo} alt={`Slide ${index}`} className="w-[20px]" />
            <Image width={500} height={500} src={logo} alt={`Slide ${index}`} className="w-[20px]" />
            <Image width={500} height={500} src={logo} alt={`Slide ${index}`} className="w-[20px]" />
            <Image width={500} height={500} src={logo} alt={`Slide ${index}`} className="w-[20px]" />
           </div>
           <div className='w-[80%] text-center'>
            <h1 className='text-2xl lg:text-lg xxs:text-lg sm:text-lg md:text-lg mb-8 font-bold'>“Flow transformed my energy use. Efficient, green tech, outstanding service!”</h1>
            <p className='text-lg lg:text-sm xxs:text-sm sm:text-lg md:text-lg   font-bold'>- John Doe</p>
            <p className='text-lg lg:text-sm xxs:text-sm sm:text-lg md:text-lg   font-bold'>- Department of Electrical Engineering</p>
           </div>
          </div>
        ))}
      </div>
      <button
        onClick={()=>goToPrevious()}
        className=" absolute top-1/2 left-4 premium-button bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
      >
        &lt;
      </button>
      <button
        onClick={()=>goToNext()}
        className="absolute top-1/2 right-4 premium-button bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
      >
        &gt;
      </button>
    </div>
  );
};

export default CarouselComp;
