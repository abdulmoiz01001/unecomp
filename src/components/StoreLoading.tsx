"use client";
import React from 'react';
import { Skeleton, Box, VStack, HStack } from '@chakra-ui/react';

const StoreLoading = () => {
  return (
    <VStack className='w-[100vw]' spacing={8} align="stretch" p={4}>
      {/* Skeleton for the header */}
      <Box>
        <Skeleton height="40px" width="300px" />
      </Box>

      {/* Skeleton for the search bar */}
      <Box>
        <Skeleton height="40px" width="100%" borderRadius="md" />
      </Box>

      {/* Skeleton for the store items */}
      <VStack spacing={4}>
        {Array.from({ length: 6 }).map((_, index) => (
          <HStack key={index} spacing={4} w="100%">
            <Skeleton height="200px" width="200px" borderRadius="md" />
            <VStack align="start" spacing={2} flex={1}>
              <Skeleton height="20px" width="80%" />
              <Skeleton height="20px" width="60%" />
              <Skeleton height="20px" width="40%" />
              <Skeleton height="40px" width="100px" borderRadius="md" />
            </VStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default StoreLoading;
