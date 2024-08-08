// import React from 'react'
import UsersComp from '@/components/adminComponents/UsersComp'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users",
};

const UsersPage = () => {
  return <UsersComp />;
}

export default UsersPage