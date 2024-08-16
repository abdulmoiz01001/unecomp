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
      name: 'John Doe',
      review: '“Flow transformed my energy use. Efficient, green tech, outstanding service!”',
      image: logo,
    },
    {
      name: 'John Doe',
      review: '“Flow transformed my energy use. Efficient, green tech, outstanding service!”',
      image: logo,
    },
    // Add more reviews here
  ];

  return (
    <div className="grid h-[70%] place-content-center font-sans text-lg bg-primary-800 text-center">
      <div data-speed="fast" data-animated="true">
        <ul className="scroller__inner m-0 p-0 list-none flex-wrap gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className=" hover-effect cursor-pointer relative xxs:w-[200px] xxs:h-[300px] w-[350px] lg:w-[250px] lg:h-[250px] h-[500px]"
            >
              <Image src={review.image} alt={`image-${index}`} className="w-full h-full" width={500} height={500} />
              <div className="w-full px-2 h-[100px] lg:h-[0px] text-white flex flex-col justify-evenly items-start pl-2 absolute top-[50%] backdrop-blur-xl">
                <p className="text-lg font-bold">- {review.name}</p>
                <p className="text-sm text-justify font-bold">{review.review}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FacultyReviewCarousel;
