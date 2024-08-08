"use client"

import React, { useEffect , useState } from 'react'
import { usePathname , useSearchParams } from 'next/navigation'
import  tokenVerification  from '@/actions/tokenVerification'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Image,
  Center,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';




const EmailTemplate = () => {
  const [ verified , setVerified ] = useState(false)
  const [token, setToken] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if(searchParams == null) return;
    const token = searchParams.get('token');
    console.log('Recently taken from searchParams:', token);
    setToken(token);

    console.log('Recently taken from params:', token);
  }, [pathname, searchParams]);
  
 
  const verifyToken = async (token: string) => {
    tokenVerification(token).then((res) => {
    setVerified(true)
      console.log(res);
    } ).catch((e) => {
      console.log(e)
      setVerified(false)
    } )
  }

  useEffect(() => {

  
    const tokenString = Array.isArray(token) ? token[0] : token; // Ensure token is a string

  verifyToken(tokenString);
  } , [token])

 

  
  return (
    <Container maxW="lg" centerContent>
      <Box
        borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        p={6}
        textAlign="center"
        className="bg-white"
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      >
        <Center>
          <Image
            src="https://via.placeholder.com/150"
            alt="Logo"
            className="mb-4"
            boxSize="100px"
          />
        </Center>
        <VStack spacing={4}>
          <Heading
            as="h1"
            size="lg"
            className="text-gray-800"
            style={{ color: '#1a202c', marginBottom: '16px' }}
          >
            Verifying Your Email Address
          </Heading>
          <Text fontSize="md" className="text-gray-600" style={{ color: '#4a5568' }}>
            Thank you for signing up! Please click the button below to verify your email
            address and complete the registration process.
          </Text>
         {
          verified &&  <Link href={"/auth/login"}>
          <Button
            colorScheme="blue"
            size="lg"
            className="mt-4"
            style={{
              backgroundColor: '#3182ce',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '0.375rem',
              marginTop: '16px',
            }}
          >
            Email Verified go to login now
          </Button>
          </Link>
         }
          
          <Text fontSize="sm" className="text-gray-500 mt-2" style={{ color: '#a0aec0' }}>
            If you did not create an account, no further action is required.
          </Text>
        </VStack>
      </Box>
    </Container>
  )
}

export default EmailTemplate