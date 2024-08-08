"use client";
import { Button, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { LuArrowUpLeftSquare } from 'react-icons/lu';

const DashboardSidebarComp = () => {
    const [innerScreen, setInnerScreen] = useState(0); // Initialize with a default value
    // const [isExpanded, setIsExpanded] = useState(true);
  
    useEffect(() => {
      // Function to handle resize
      const handleResize = () => {
        const width = window.innerWidth;
        setInnerScreen(width);
        if (width < 900) {
          setIsExpanded(false);
        } else {
          setIsExpanded(true);
        }
      };
  
      // Set initial value
      handleResize();
  
      // Add event listener
      window.addEventListener('resize', handleResize);
  
      // Clean up event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
        if (innerScreen < 900) {
            setIsExpanded(false);
        }
        else {
            setIsExpanded(true);
        }
    }, []);


    const navigate = useRouter();
    const [isExpanded, setIsExpanded] = useState(true);
    const pathname = usePathname();

    return (
        <div className={`h-full bg-white transition-all duration-300 flex flex-col   gap-20 justify-start ${isExpanded ? 'w-[25%] md:w-[20%] lg:w-[20%]' : 'w-12 md:w-16 lg:w-20'}`}>
            <div className='w-full mt-10 bg-white flex flex-col justify-start'>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='mb-4 ml-4 p-2 bg-gray-100 rounded-md cursor-pointer'
                >
                    {isExpanded ? '<' : '>'}
                </button>
                <Link href='/dashboard'>
                    <li className={`h-16 w-full hover:bg-gray-100 flex items-center gap-3 pl-4 ${pathname == '/dashboard' ? 'border-r-4 bg-gray-100 border-green-500' : ''} hover:border-r-4 hover:border-green-500`}>
                        <FaTachometerAlt className="text-green-500" size={isExpanded ? 24 : 20} />
                        {isExpanded && <Heading as="h1" size="md" bgClip="text" bgGradient="linear(to-r, green.500, green.300, green.500)">Dashboard</Heading>}
                    </li>
                </Link>
                <Link href='/products'>
                    <li className={`h-16 w-full hover:bg-gray-100 flex items-center gap-3 pl-4 ${pathname == '/products' ? 'border-r-4 bg-gray-100 border-green-500' : ''} hover:border-r-4 hover:border-green-500`}>
                        <FaBox className="text-green-500" size={isExpanded ? 24 : 20} />
                        {isExpanded && <Heading as="h1" size="md" bgClip="text" bgGradient="linear(to-r, green.500, green.300, green.500)">Products</Heading>}
                    </li>
                </Link>
                <Link href='/userorders'>
                    <li className={`h-16 w-full hover:bg-gray-100 flex items-center gap-3 pl-4 ${pathname == '/userorders' ? 'border-r-4 bg-gray-100 border-green-500' : ''} hover:border-r-4 hover:border-green-500`}>
                        <FaShoppingCart className="text-green-500" size={isExpanded ? 24 : 20} />
                        {isExpanded && <Heading as="h1" size="md" bgClip="text" bgGradient="linear(to-r, green.500, green.300, green.500)">User Orders</Heading>}
                    </li>
                </Link>
                <Link href='/users'>
                    <li className={`h-16 w-full hover:bg-gray-100 flex items-center gap-3 pl-4 ${pathname == '/users' ? 'border-r-4 bg-gray-100 border-green-500' : ''} hover:border-r-4 hover:border-green-500`}>
                        <FaUsers className="text-green-500" size={isExpanded ? 24 : 20} />
                        {isExpanded && <Heading as="h1" size="md" bgClip="text" bgGradient="linear(to-r, green.500, green.300, green.500)">Users</Heading>}
                    </li>
                </Link>
                <div onClick={() => window.history.back()} className='w-12 mt-40 h-12 ml-4 cursor-pointer active:scale-95 flex justify-center items-center rounded-xl bg-gray-100'>
                    <LuArrowUpLeftSquare size={30} />
                </div>
            </div>
        </div>
    );
}

export default DashboardSidebarComp;
