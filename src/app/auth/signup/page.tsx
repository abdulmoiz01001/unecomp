import React from 'react'
import SignupComp from '@/components/Signup'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signup",
};

const SignUpPage = () => {
  return (
    <>
    <SignupComp />
    </>
  )
}

export default SignUpPage