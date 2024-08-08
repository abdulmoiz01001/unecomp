// "use client";
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { Avatar } from '@chakra-ui/react';
// import Link from 'next/link';
// import { IoSearchSharp, IoMenuSharp } from "react-icons/io5";
// import { FaWindowClose } from "react-icons/fa";
// import { useAppDispatch } from '@/lib/store/hooks';
// import { gsap } from 'gsap';
// import { addSearch } from '@/lib/store/features/search/searchSlice';
// import sessionAction from '@/actions/sessionAction';

// const LandingPageHeaderComp = ({ handleClick }: { handleClick: () => void }) => {
//   const dispatch = useAppDispatch();
//   const headerRef = useRef(null);

//   const [searchItem, setSearchItem] = useState('');
//   const [activeLink, setActiveLink] = useState('home');
//   const [response, setResponse] = useState<any>(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchItem(e.target.value);
//   };

//   const handleNavClick = (link: string) => {
//     setActiveLink(link);
//     gsap.to(headerRef.current, {
//       duration: 0.5,
//       borderBottom: "4px solid black"
//     });
//     setTimeout(() => {
//       gsap.to(headerRef.current, {
//         duration: 0.5,
//         borderBottom: "none"
//       });
//     }, 2000);
//   };

//   const handleScroll = useCallback(() => {
//     setIsScrolled(window.scrollY > 50);
//   }, []);

//   const fetchSession = useCallback(async () => {
//     try {
//       const response = await sessionAction();
//       setResponse(response);
//     } catch (e) {
//       console.error(e);
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(addSearch(searchItem));
//   }, [searchItem, dispatch]);

//   useEffect(() => {
//     fetchSession();
//   }, [fetchSession]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [handleScroll]);

//   useEffect(() => {
//     gsap.to(headerRef.current, {
//       duration: 0.5,
//       y: 0,
//       backgroundColor: isScrolled ? "white" : "transparent",
//       color: isScrolled ? "black" : "white",
//       boxShadow: isScrolled ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"
//     });
//   }, [isScrolled]);

//   return (
//     <>
//       <div ref={headerRef} style={{ zIndex: 10 }} className='w-[100vw] h-[90px] bg-[#285d31] fixed top-0 left-0 flex items-center justify-center transition-all duration-500 shadow-2xl px-4'>
//         <div className='w-[80%] h-full flex items-center'>
//           <div className='w-[40%] xxs:w-[80%] overflow-hidden'>
//             <h1 className="text-6xl xxs:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-300 to-green-500">UneComp</h1>
//           </div>
//           <div className='xxs:hidden w-[50%]'>
//             <ul className='w-full flex justify-evenly items-center'>
//               {['home', 'store', 'about', 'contact'].map((link) => (
//                 <Link href={`/${link === 'home' ? '' : link}`} key={link}>
//                   <li onClick={() => handleNavClick(link)} className={`cursor-pointer ${activeLink === link && 'border-b-2'} border-white font-bold text-lg md:text-xl active:scale-110 select-none capitalize`}>{link}</li>
//                 </Link>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className='flex w-[40%] items-center'>
//           <div className='xs:hidden w-full flex justify-evenly items-center ml-4'>
//             {response ? (
//               <Avatar onClick={handleClick} m={4} className='cursor-pointer' src='https://bit.ly/broken-link' />
//             ) : (
//               <>
//                 <Link href='/auth/login'>
//                   <button className='cursor-pointer text-white font-bold text-lg md:text-xl active:scale-110 select-none bg-[#285d31] px-4 py-2 rounded-lg hover:border-2 hover:border-[#285d31] hover:bg-white w-[120px] hover:text-[#285d31]'>Login</button>
//                 </Link>
//                 <Link href='/auth/signup'>
//                   <button className='cursor-pointer text-white font-bold text-lg md:text-xl active:scale-110 select-none bg-[#285d31] px-4 py-2 rounded-lg hover:border-2 hover:border-[#285d31] hover:bg-white w-[120px] hover:text-[#285d31]'>Signup</button>
//                 </Link>
//               </>
//             )}
//           </div>
//           <div className='xs:block xxs:block sm:block md:block hidden ml-4'>
//             <IoMenuSharp onClick={() => setMenuOpen(!menuOpen)} size={24} className='cursor-pointer' />
//           </div>
//         </div>
//       </div>
//       <div className={`fixed top-0 w-full h-full bg-white transition-all duration-300 ${menuOpen ? "translate-x-0" : "translate-x-[100%]"}`}>
//         <div className='block h-full md:hidden bg-white shadow-2xl mt-[30px]'>
//           <FaWindowClose onClick={() => setMenuOpen(!menuOpen)} size={40} className='pl-4' />
//           <ul className='flex flex-col mt-[30px] space-y-4 p-4'>
//             {['home', 'store', 'about', 'contact'].map((link) => (
//               <Link href={`/${link === 'home' ? '' : link}`} key={link}>
//                 <li onClick={() => handleNavClick(link)} className={`cursor-pointer ${activeLink === link && 'border-b-2'} text-[#285d31] border-[#285d31] font-bold text-lg active:scale-110 select-none capitalize`}>{link}</li>
//               </Link>
//             ))}
//             {response ? (
//               <Avatar onClick={handleClick} m={4} className='cursor-pointer' src='https://bit.ly/broken-link' />
//             ) : (
//               <>
//                 <Link href='/auth/login'>
//                   <li className='cursor-pointer text-white font-bold text-lg active:scale-110 select-none bg-[#285d31] px-4 py-2 rounded-lg hover:border-2 hover:border-[#285d31] hover:bg-transparent hover:text-[#285d31]'>Login</li>
//                 </Link>
//                 <Link href='/auth/signup'>
//                   <li className='cursor-pointer text-white font-bold text-lg active:scale-110 select-none bg-[#285d31] px-4 py-2 rounded-lg hover:border-2 hover:border-[#285d31] hover:bg-transparent hover:text-[#285d31]'>Signup</li>
//                 </Link>
//               </>
//             )}
//             <div className='relative xxs:block'>
//               <IoSearchSharp className='absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer' color='#285d31' size={24} />
//               <input value={searchItem} onChange={handleSearch} type='text' placeholder='Search' className='w-full border-2 border-[#285d31] px-4 py-2 rounded-lg pr-10' />
//             </div>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LandingPageHeaderComp;


"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Avatar, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import Link from 'next/link';
import { IoSearchSharp, IoMenuSharp } from "react-icons/io5";
import { FaWindowClose } from "react-icons/fa";
import { useAppDispatch } from '@/lib/store/hooks';
import { gsap } from 'gsap';
import { addSearch } from '@/lib/store/features/search/searchSlice';
import sessionAction from '@/actions/sessionAction';
import tail from '@/assets/Tail icon.svg'
import Image from 'next/image';

const LandingPageHeaderComp = ({ handleClick }: { handleClick: () => void }) => {
  const dispatch = useAppDispatch();
  const headerRef = useRef(null);

  const [searchItem, setSearchItem] = useState('');
  const [activeLink, setActiveLink] = useState('home');
  const [response, setResponse] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  const handleNavClick = (link: string) => {
    setActiveLink(link);
    gsap.to(headerRef.current, {
      duration: 0.5,
      borderBottom: "4px solid black"
    });
    setTimeout(() => {
      gsap.to(headerRef.current, {
        duration: 0.5,
        borderBottom: "none"
      });
    }, 2000);
  };

  // const handleScroll = useCallback(() => {
  //   setIsScrolled(window.scrollY > 50);
  // }, []);

  const fetchSession = useCallback(async () => {
    try {
      const response = await sessionAction();
      setResponse(response);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   dispatch(addSearch(searchItem));
  // }, [searchItem, dispatch]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [handleScroll]);

  // useEffect(() => {
  //   gsap.to(headerRef.current, {
  //     duration: 0.5,
  //     y: 0,
  //     backgroundColor: isScrolled ? "white" : "transparent",
  //     color: isScrolled ? "black" : "white",
  //     boxShadow: isScrolled ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"
  //   });
  // }, [isScrolled]);

  return (
    <>
      <div className='w-[100vw] h-[90px] bg-white flex sticky top-0 border-b-2 z-50 items-center justify-center  px-4'>
        <div className='w-[80%] h-full flex items-center'>
          <div className='w-[40%] xxs:w-[80%] overflow-hidden'>
            <h1 className="text-6xl xxs:text-[1.7rem] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-300 to-green-500">UneComp</h1>
          </div>
          <div className='xxs:hidden w-[50%]'>
            <ul className='w-full flex justify-evenly items-center'>
              {['home', 'store', 'about', 'contact'].map((link) => (
                <Link href={`/${link === 'home' ? '' : link}`} key={link}>
                  <li onClick={() => handleNavClick(link)} className={`cursor-pointer ${activeLink === link && 'border-b-2'} border-white font-bold text-lg md:text-xl text-black active:scale-110 select-none capitalize`}>{link}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex w-[40%] items-center'>
          <div className='xs:hidden w-full flex justify-evenly items-center ml-4'>
            {loading ? (
              <>
                <Skeleton height="40px" width="120px" />
              </>
            ) : response ? (
              <Avatar onClick={handleClick} m={4} className='cursor-pointer' src='https://bit.ly/broken-link' />
            ) : (
              <>
                <Link href='/auth/login'>
                  {/* <button className='cursor-pointer text-white font-bold text-lg md:text-xl active:scale-110 select-none bg-[#285d31] px-4 py-2 rounded-lg hover:border-2 hover:border-[#285d31] hover:bg-white w-[120px] hover:text-[#285d31]'>Login</button> */}
                  <button className='cursor-pointer xxs:hidden active:scale-95 relative border-2 border-black  px-8 py-3 hover:text-white hover:bg-green-800 text-green-800 rounded-3xl text-center bg-transparent ' >
                    Get in touch 
                  <Image src={tail} alt="asdas" className='absolute right-1 top-4' />
                  </button>
                </Link>
                {/* <Link href='/auth/signup'>
                  <button className='cursor-pointer text-white xxs:hidden xs:hidden font-bold text-lg md:text-xl active:scale-110 select-none bg-[#285d31] px-4 py-2 rounded-lg hover:border-2 hover:border-[#285d31] hover:bg-white w-[120px] hover:text-[#285d31]'>Signup</button>
                </Link> */}
              </>
            )}
          </div>
          <div className='xs:block xxs:block sm:block md:block hidden ml-4'>
            <IoMenuSharp onClick={() => setMenuOpen(!menuOpen)} size={24} className='cursor-pointer' />
          </div>
        </div>
      </div>
      <div className={`fixed z-50 top-0 w-full h-full bg-white transition-all duration-300 ${menuOpen ? "translate-x-0" : "translate-x-[100%]"}`}>
        <div className='block h-full md:hidden bg-white shadow-2xl mt-[30px]'>
          <FaWindowClose onClick={() => setMenuOpen(!menuOpen)} size={40} className='pl-4' />
          <ul className='flex flex-col mt-[30px] space-y-4 p-4'>
            {['home', 'store', 'about', 'contact'].map((link) => (
              <Link href={`/${link === 'home' ? '' : link}`} key={link}>
                <li onClick={() => handleNavClick(link)} className={`cursor-pointer ${activeLink === link && 'border-b-2'} text-[#285d31] border-[#285d31] font-bold text-lg active:scale-110 select-none capitalize`}>{link}</li>
              </Link>
            ))}
            {loading ? (
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            ) : response ? (
              <Avatar onClick={handleClick} m={4} className='cursor-pointer' src='https://bit.ly/broken-link' />
            ) : (
              <>
                <Link href='/auth/login'>
                <button className='cursor-pointer active:scale-95 relative border-2 border-black  px-8 py-3 hover:text-white hover:bg-green-800 text-green-800 rounded-3xl text-center bg-transparent ' >
                    Get in touch 
                  <Image src={tail} alt="asdas" className='absolute right-1 top-4' />
                  </button>
                   </Link>
                {/* <Link href='/auth/signup'>
                  <li className='cursor-pointer xss:text-sm xs:text-lg xxs:hidden xs:hidden  text-white font-bold text-lg active:scale-110 select-none bg-[#285d31] px-4 py-2 rounded-lg hover:border-2 hover:border-[#285d31] hover:bg-transparent hover:text-[#285d31]'>Signup</li>
                </Link> */}
              </>
            )}
            <div className='relative xxs:block'>
              <IoSearchSharp className='absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer' color='#285d31' size={24} />
              <input value={searchItem} onChange={handleSearch} type='text' placeholder='Search' className='w-full border-2 border-[#285d31] px-4 py-2 rounded-lg pr-10' />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default LandingPageHeaderComp;
