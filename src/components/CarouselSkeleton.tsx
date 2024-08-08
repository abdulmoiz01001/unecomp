// CarouselSkeleton.js
const CarouselSkeleton = () => {
    return (
        <>
      <div className="skeleton-carousel w-full h-full flex justify-center items-center">
        <div className="skeleton-item w-[400px] h-[100px] bg-gray-300 animate-pulse rounded-lg m-4"></div>
        <div className="skeleton-item w-[400px] h-[100px] bg-gray-300 animate-pulse rounded-lg m-4"></div>
        <div className="skeleton-item w-[400px] h-[100px] bg-gray-300 animate-pulse rounded-lg m-4"></div>
      </div>
        </>
    );
  };
  
  export default CarouselSkeleton;
  