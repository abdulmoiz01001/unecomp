
import SignupComp from "@/components/Signup";
import HomeComp from "@/components/Home"; // Rename the imported component to avoid conflict
import DrawerComp from "@/components/DrawerComp";
import LandingPageHeaderComp from "@/components/LandingPageHeader";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home",
};
// import { io } from "socket.io-client";
export default function Home() {
  
  return (
   <>
    <DrawerComp />
    {/* <LandingPageHeaderComp  /> */}
    <HomeComp /> {/* Use the renamed component */}
   {/* <SignupComp /> */}
   </>
  );
}
