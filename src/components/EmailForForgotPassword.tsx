"use client";
import React, { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack, Text, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import emailResetAction from '@/actions/emailResetAction';

const EmailForForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loader state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setLoading(true); // Show loader

    try {
      const action: any = await emailResetAction(email);
      console.log(action);

      if (action?.error || !action.error !== undefined) {
        setMessage(action.error);
        console.log(action.error);
      } else if (action?.success) {
        setMessage(action.success);
        console.log(action.success);
      }
    } catch (e) {
      console.log(e);
      setMessage('An unexpected error occurred.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <Container maxW="md" centerContent>
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
            Enter your email address below and we'll send you a link to reset your password.
          </Text>
          <form onSubmit={handleSubmit}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Enter your email"
              type="email"
              isRequired
              mb={4}
            />
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="full"
              isDisabled={loading} // Disable button while loading
            >
              {loading ? <Spinner size="sm" /> : 'Send Reset Link'} {/* Show loader in the button */}
            </Button>
          </form>
          {message && (
            <Text fontSize="sm" color={message.startsWith('Error') ? 'red.500' : 'green.500'}>
              {message}
            </Text>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default EmailForForgotPassword;
