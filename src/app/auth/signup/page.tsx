import React from 'react'
import SignupComp from '@/components/Signup'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signup",
  description:
    'Sign up for UneComp to shop high-quality electronic components. Enjoy a personalized experience, order tracking, and student-friendly deals.',
};

const SignUpPage = () => {
  return (
    <>
    <SignupComp />
    </>
  )
}

export default SignUpPage