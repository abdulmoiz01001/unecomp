"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import resetPasswordTokenVerification from '@/actions/resetPasswordTokenVerification';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  Center,
  VStack,
} from '@chakra-ui/react';

const ForgotPassword = () => {
  const [token, setToken] = useState<string | null>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('resetPasswordToken');
    console.log(token);
    setToken(token);
  }, [pathname, searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    try {
      console.log(token);
        if (!token) {
            setError('Token not found');
            return;
        }
        if (!password || !confirmPassword) {
            setError('Password is required');
            return;
        }
      const response = await resetPasswordTokenVerification(token, password);
      setVerified(true);
      setMessage('Password has been reset successfully.');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (e) {
      setVerified(false);
      setError('Token verification failed or an error occurred.');
    }
  };

  return (
    <Container maxW="lg" centerContent>
      <Box
        borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        p={6}
        textAlign="center"
        bg="white"
      >
        <VStack spacing={4}>
          <Heading as="h1" size="lg" color="teal.600">
            Reset Your Password
          </Heading>
          <Text fontSize="md" color="gray.600">
            Please enter your new password below.
          </Text>
          <form onSubmit={handleSubmit} className="w-full">
            <Input
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Enter new password"
              type="password"
              isRequired
              mb={4}
            />
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              placeholder="Confirm new password"
              type="password"
              isRequired
              mb={4}
            />
            {error && <Text color="red.500">{error}</Text>}
            <Button type="submit" colorScheme="teal" size="lg" width="full">
              Reset Password
            </Button>
          </form>
          {verified && <Text color="green.500">{message}</Text>}
        </VStack>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
