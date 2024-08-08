"use client";
import { Avatar, Menu, MenuButton, WrapItem, Button, MenuList, MenuItem, Heading, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Badge, Switch } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { usePathname, useRouter } from 'next/navigation'
import { format, parseISO } from 'date-fns';
import { MdForwardToInbox } from "react-icons/md";
import { AiOutlineBulb } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import sessionAction from '@/actions/sessionAction';

const DashboardHeader = ({ onOpen }: { onOpen: () => void }) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [switchToUser, setSwitchToUser] = useState<boolean>(false)
  const router = useRouter();

  const [session, setSession] = useState<any>(null);

  const fetchSession = useCallback(async () => {
    try {
      const session = await sessionAction();
      if (!session) return;
      setSession(session);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/notifications`);
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  useEffect(() => {
    if (switchToUser) {
      router.push('/')
    }
  }, [switchToUser])



  const pathname = usePathname()

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (

    <header className='w-full bg-white flex justify-between items-center h-20'>
      <div className='flex justify-start pl-9 items-center xxs:w-[60%] xs:w-[60%] sm:w-[30%] md:w-[30%] w-[20%] h-full'>
        <Heading as="h1" size="xl" bgClip="text" className='xxs:text-sm xs:text-sm sm:text-lg md:text-lg' bgGradient="linear(to-r, green.500, green.300, green.500)">
          Une Comp
        </Heading>
      </div>
      <nav className='flex justify-end xxs:hidden xs:hidden sm:flex md:flex items-center gap-4 pr-8 w-[40%] h-full'>
        <div className='w-[40%] relative'>
          <FaSearch className='absolute top-3 left-3' size={20} />
          <input className='w-full h-10 pl-14 outline-none placeholder-text-[16px] font-normal rounded-3xl bg-gray-100' type="search" name="search" id="search" placeholder='Search here' />
        </div>
        {session?.user?.role === 'admin' && <Switch onChange={() => setSwitchToUser(!switchToUser)} colorScheme='teal' size='lg' />}
        {pathname == '/products' && <Button onClick={onOpen}>Add Product</Button>}
        <Popover>
          <PopoverTrigger>
            <div className='relative flex justify-center cursor-pointer items-center rounded-full w-12 h-12 bg-gray-100'>
              <MdForwardToInbox size={30} />
              {notifications.length > 0 && (
                <Badge colorScheme="red" className='absolute top-0 right-0 rounded-full' fontSize="xs">
                  {notifications.length}
                </Badge>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent width="lg">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Notifications</PopoverHeader>
            <PopoverBody>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className='mb-2 p-2 rounded bg-gray-100'>
                    <div className='flex items-center justify-between mb-1'>
                      <span className='font-bold'>User:</span>
                      <span>{notification.user}</span>
                    </div>
                    <div className='flex items-center justify-between mb-1'>
                      <span className='font-bold'>Message:</span>
                      <span>{notification.message}</span>
                    </div>
                    <div className='flex items-center justify-between text-xs text-gray-500'>
                      <span>
                        {notification.date ? format(parseISO(notification.date), 'dd/MM/yyyy') : 'Invalid Date'}
                      </span>
                      <span>
                        {notification.date ? format(parseISO(notification.date), 'hh:mm a') : 'Invalid Time'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div>No notifications</div>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <div className='flex justify-center cursor-pointer items-center rounded-full w-12 h-12 bg-gray-100'>
          <AiOutlineBulb size={30} />
        </div>
        <WrapItem className='h-14 w-14 cursor-pointer'>
          <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
        </WrapItem>
      </nav>

      {/* Drawer Menu Button */}
      <div className='xxs:flex xs:flex sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden flex justify-end pr-4 w-[40%]'>
        <button onClick={() => setDrawerOpen(!drawerOpen)} className='text-xl'>
          {drawerOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Drawer Menu */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform ${drawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out xxs:flex xs:flex sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden flex flex-col items-center gap-4 p-4`}>
        <button onClick={() => setDrawerOpen(false)} className='self-end text-2xl mb-4'>
          ×
        </button>
        <div className='w-full relative'>
          <FaSearch className='absolute top-3 left-3' size={20} />
          <input className='w-full h-10 pl-14 outline-none placeholder-text-[16px] font-normal rounded-3xl bg-gray-100' type="search" name="search" id="search" placeholder='Search here' />
        </div>
        {session?.user?.role === 'admin' && <Switch onChange={() => setSwitchToUser(!switchToUser)} colorScheme='teal' size='lg' />}
        {pathname == '/products' && <Button onClick={onOpen}>Add Product</Button>}
        <Popover>
          <PopoverTrigger>
            <div className='relative flex justify-center cursor-pointer items-center rounded-full w-12 h-12 bg-gray-100'>
              <MdForwardToInbox size={30} />
              {notifications.length > 0 && (
                <Badge colorScheme="red" className='absolute top-0 right-0 rounded-full' fontSize="xs">
                  {notifications.length}
                </Badge>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent width="lg">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Notifications</PopoverHeader>
            <PopoverBody>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className='mb-2 p-2 rounded bg-gray-100'>
                    <div className='flex items-center justify-between mb-1'>
                      <span className='font-bold'>User:</span>
                      <span>{notification.user}</span>
                    </div>
                    <div className='flex items-center justify-between mb-1'>
                      <span className='font-bold'>Message:</span>
                      <span>{notification.message}</span>
                    </div>

                    <div className='flex items-center justify-between text-xs text-gray-500'>
                      <span>
                        {notification.date ? format(parseISO(notification.date), 'dd/MM/yyyy') : 'Invalid Date'}
                      </span>
                      <span>
                        {notification.date ? format(parseISO(notification.date), 'hh:mm a') : 'Invalid Time'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div>No notifications</div>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <div className='flex justify-center cursor-pointer items-center rounded-full w-12 h-12 bg-gray-100'>
          <AiOutlineBulb size={30} />
        </div>
        <WrapItem className='h-14 w-14 cursor-pointer'>
          <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
        </WrapItem>
      </div>
    </header>
  )
}

export default DashboardHeader
