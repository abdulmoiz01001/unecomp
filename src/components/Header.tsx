"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { Box, Flex, Heading, IconButton, Input, Link, List, ListItem, Avatar, Button, Skeleton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, SkeletonCircle, Switch } from '@chakra-ui/react';
import { IoSearchSharp, IoMenuSharp } from "react-icons/io5";
import { FaWindowClose } from 'react-icons/fa';
import { IoMdCart } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addSearch } from '@/lib/store/features/search/searchSlice';
import sessionAction from '@/actions/sessionAction';
import useSearchProducts from '@/customhooks/useSearchProducts';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { setClearFilteredProducts, setFilteredProducts } from '@/lib/store/features/products/productsSlice';



const HeaderComp = ({ handleClick }: { handleClick: () => void }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const count = useAppSelector((state) => state.carts.carts);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProducts = useSearchProducts(searchTerm);
  console.log(filteredProducts);

  console.log(filteredProducts);


  useEffect(() => {
    if (searchTerm === '') {
      dispatch(setClearFilteredProducts());
      return;
    }
  
    if (filteredProducts === null) {
      dispatch(setClearFilteredProducts());
      return;
    }
    
    dispatch(setFilteredProducts(filteredProducts));
    // filteredProducts.forEach((product: any) => {
    //   dispatch(setFilteredProducts(product));
    // });
  
  }, [filteredProducts]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      dispatch(setClearFilteredProducts());
      setSearchTerm('');
      return;
    }
    setSearchTerm(event.target.value);
  };

  const fetchSession = useCallback(async () => {
    try {
      const session = await sessionAction();
      if (!session) return;
      setSession(session);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const [ switchToAdmin, setSwitchToAdmin ] = useState<boolean>(false)

  useEffect(() => {
    if(session?.user?.role === 'admin'){
       router.push('/dashboard')
    }
  }, [switchToAdmin])

  const navLinks = [
    { name: 'Home', href: '/', active: pathname === '/' },
    { name: 'Store', href: '/store', active: pathname === '/store' },
    { name: 'About', href: '/about', active: pathname === '/about' },
    { name: 'Contact', href: '/contact', active: pathname === '/contact' },
    { name: 'Orders', href: '/orders', active: pathname === '/orders' },
  ];

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Define a function to update the state
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and clean-up on unmount


  useEffect(() => {
    console.log('================================' , screenWidth)
  }, [screenWidth])

  return (
    <>
      <Box w="100vw"  display="flex" flexDir={{ base: 'column', md: 'row' }} className='xxs:h-[120px] xs:h-[120px] sm:h-[120px] h-[90px] xxs:pb-8 xs:pb-8 sm:pb-8 xs:pt-2 sm:pt-2 xxs:pt-2 xs:gap-2 sm:gap-2 xxs:gap-2 ' justifyContent="space-between" alignItems="center" bg="white" zIndex="50" shadow="2xl" position="sticky" top="0"  px="4">
        <Flex w="100%" alignItems="center">
          <Flex w="80%" alignItems="center">
            <Box className='md:hidden' w={{ base: '80%', md: '20%' }}>
              <Heading as="h1" size="2xl" bgClip="text" bgGradient="linear(to-r, green.500, green.300, green.500)">
              <span className='lg:text-2xl flex justify-center items-center' >
                
                  UneComp
                </span>
              </Heading>
            </Box>
            <Box display={{ base: 'none' , md: 'flex' }} w="60%" justifyContent="space-evenly" alignItems="center">
              {navLinks.map((link) => (
                <Link href={link.href} key={link.name} className={`nav-link h-0  lg:text-sm ${link.active ? 'active' : ''}`}>
                  {link.name}
                </Link>
              ))}
            </Box>
          </Flex>
        
          <Flex alignItems="center">
          {
            pathname == '/store' && <> <Box display={{ base: 'none', md: 'flex' }} position="relative">
            <IconButton aria-label="Search" icon={<IoSearchSharp />} position="absolute" top="50%" transform="translateY(-50%)" right="4" colorScheme="green" />
            <Input value={searchTerm} onChange={handleSearchChange} placeholder="Search" borderColor="green.500" pr="10" />
          </Box></>
          } 
            <Box display={{ base: 'flex', md: 'none' }} ml="4">
              <IconButton aria-label="Menu" icon={<IoMenuSharp />} onClick={onOpen} />
            </Box>
            <Box display={{ base: 'none', md: 'flex' }} ml="4" alignItems="center">
              {
                session?.user?.role === 'admin' &&  <Switch onChange={()=>setSwitchToAdmin(!switchToAdmin)} mr="4" colorScheme='teal' size='lg' />
              }
            {
              pathname != '/' && <><Box  position="relative">
              <Link href="/addtocart">
                <IconButton aria-label="Cart" icon={<IoMdCart size={40} />} colorScheme="green" />
              </Link>
              {count > 0 && (
                <Box position="absolute" top="0" left="0" bg="red.500" borderRadius="full" p="1" color="white" fontSize="sm">
                  {count}
                </Box>
              )}
            </Box></>
            }  
              {loading ? (
                <SkeletonCircle size="10" ml="4" />
              ) : session ? (
                <Avatar onClick={handleClick} m="4" cursor="pointer" src='https://bit.ly/broken-link' />
              ) : (
                <>
                  <Button as={Link} href="/auth/login" colorScheme="green" ml="4">
                    Login
                  </Button>
                  <Button as={Link} href="/auth/signup" colorScheme="green" ml="4">
                    Signup
                  </Button>
                </>
              )}
            </Box>
          </Flex>
        </Flex>
        <Box display={{ base: 'block', md: 'none' }} position="relative" >
          <IconButton aria-label="Search" icon={<IoSearchSharp />} position="absolute" top="50%" transform="translateY(-50%)" right="4" colorScheme="green" />
          <Input value={searchTerm} onChange={handleSearchChange} placeholder="Search" borderColor="green.500" pr="10" />
        </Box>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <List spacing={4}>
              {navLinks.map((link) => (
                <ListItem key={link.name}>
                  <Link href={link.href} onClick={onClose}>
                    {link.name}
                  </Link>
                </ListItem>
              ))}
              <ListItem>
              {
              pathname != '/' && <><Box  position="relative">
              <Link href="/addtocart">
                <IconButton aria-label="Cart" icon={<IoMdCart size={40} />} colorScheme="green" />
              </Link>
              {count > 0 && (
                <Box position="absolute" top="0" left="0" bg="red.500" borderRadius="full" p="1" color="white" fontSize="sm">
                  {count}
                </Box>
              )}
            </Box></>
            }  
                {
                session?.user?.role === 'admin' &&  <Switch onChange={()=>setSwitchToAdmin(!switchToAdmin)} mt="4" colorScheme='teal' size='lg' />
              }
              </ListItem>
              {loading ? (
                <SkeletonCircle size="10" mt="4" />
              ) : session ? (
                <Avatar onClick={handleClick} m="4" cursor="pointer" src='https://bit.ly/broken-link' />
              ) : (
                <>
                  <ListItem>
                    <Button as={Link} href="/auth/login" colorScheme="green" w="full">
                      Login
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button as={Link} href="/auth/signup" colorScheme="green" w="full">
                      Signup
                    </Button>
                  </ListItem>
                </>
              )}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HeaderComp;
