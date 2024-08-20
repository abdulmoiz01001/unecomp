import Image from 'next/image';
import React from 'react';
import logo from '@/assets/R.jpeg';

const FacultyReviewCarousel = () => {
  const reviews = [
    {
      name: 'John Doe',
      review: '“Flow transformed my energy use. Efficient, green tech, outstanding service!”',
      image: logo,
    },
    {
      name: 'Jane Smith',
      review: '“The best decision I ever made! Incredible support and innovative solutions.”',
      image: logo,
    },
    {
      name: 'Alice Johnson',
      review: '“A true game-changer in energy efficiency. Highly recommend!”',
      image: logo,
    },
    // Add more reviews here
  ];

  return (
    <div className=" w-[80vw] flex justify-center items-center bg-primary-800 text-center overflow-hidden p-4">
      <div className="w-full max-w-[1200px]">
        <div className="flex gap-4  overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-auto snap-center hover-effect cursor-pointer relative w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] h-[400px] md:h-[400px]"
            >
              <Image src={review.image} alt={`image-${index}`} className="w-full h-full object-cover" />
              <div className="w-full px-2 h-[100px] lg:h-[150px] text-white flex flex-col justify-evenly items-start pl-2 absolute bottom-0 backdrop-blur-xl">
                <p className="text-lg font-bold">- {review.name}</p>
                <p className="text-sm text-justify font-bold">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyReviewCarousel;
