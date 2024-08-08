"use client"
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import profile from '@/assets/profile.jpeg';
import sessionAction from '@/actions/sessionAction';
import profileAction from '@/actions/profileAction';
import { MdOutlinePending } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";

// Define the interface for the order status
interface OrderStatus {
  accepted: number;
  delivered: number;
  pending: number;
  rejected: number;
}

// Define the interface for recent order details
interface RecentOrderDetails {
  deptName: string;
  email: string;
  firstName: string;
  lastName: string;
  namePrefix: string;
  phoneNumber: string;
  projectName: string;
  rollNumber: string;
}

// Define the interface for recent order shipping details
interface RecentOrderShippingDetails {
  address: string;
  city: string;
  country: string;
}

// Define the interface for the user
interface User {
  email: string;
  gender: string;
  name: string;
  password: string;
  role: string;
  token: string;
  verified: boolean;
  __v: number;
  _id: string;
}

// Define the main interface that combines all the above interfaces
interface ProfileDetails {
  orderStatus: OrderStatus;
  recentOrderDetails: RecentOrderDetails;
  recentOrderShippingDetails: RecentOrderShippingDetails;
  totalInvestment: number;
  user: User;
}


gsap.registerPlugin(ScrollTrigger);

const ProfileComp = () => {
    const [ userName , setUserName ] = useState('')
  const [ userID , setUserID ] = useState('')
  const [ user , setUser ] = useState<any>({})
  const [ profileDetails , setProfileDetails ] = useState<ProfileDetails[]>([])

    useEffect(() => {
        sessionAction().then((res : any) => {
            console.log(res)
            setUser(res?.user || {})
            setUserName(res?.user?.name || '')
            setUserID(res?.user?._id || '')
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    useEffect(() => {
        console.log(profileDetails)
    },[profileDetails]) 

    useEffect(() => {
        profileAction(user , userID).then((res) => {
          if(res != undefined && res != null)
            {
              console.log(res)

              setProfileDetails(res as ProfileDetails[]);
            }
        }).catch((e) => {
            console.log(e)
        })
    }, [userName, userID])

    const [ userDetails , setUserDetails ] = useState<any>([])
    const [ shippingDetails , setShippingDetails ] = useState<any>([])
    const [ investment , setInvestment ] = useState<number>()
    const [ recentOrderDetails , setRecentOrderDetails ] = useState<any>([])  
    const [ orderStatus , setOrderStatus ] = useState<any>([])

    useEffect(() => {
      profileDetails.forEach((user : any, index : number) => {
        if(index === 0) {
          setUserDetails([user])
        }
        else if(index === 1) {
          setShippingDetails([user])
        }else if(index === 2) {
          setInvestment(user)
        }else if(index === 3) {
          setRecentOrderDetails([user])
        }else if(index === 4) {
          setOrderStatus([user])
        }

        console.log(user)
      })
    }, [profileDetails])

    useEffect(() => {
      console.log(userDetails)
      console.log(shippingDetails)
      console.log(investment)
      console.log(recentOrderDetails)
    }, [userDetails, shippingDetails, investment, recentOrderDetails])

    
  return (
 <>
  
    <div className="w-full h-full flex flex-col justify-start items-center border border-gray-300 bg-gray-50">
      {userDetails.map((user : any, index : number) => (
        <>
        <div key={index} className="w-[80%] xxs:w-full xs:w-full bg-white shadow-lg rounded-lg p-6 my-8">
          <h1 className="text-6xl text-center font-extrabold text-gray-900 mb-8 xxs:text-2xl xs:text-2xl transition duration-300 ease-in-out">My Profile</h1>
          <h2 className="text-4xl font-semibold xxs:text-xl xs:text-xl text-gray-800 mb-6">Personal Info</h2>
      
          <div className="w-full border border-gray-200 rounded-lg p-6 xxs:p-1 xs:p-1 mb-6 flex xxs:flex-col xs:flex-col justify-evenly items-center">
            <div className="w-[30%] xxs:w-full xs:w-full border border-gray-200 rounded-lg overflow-hidden flex justify-center items-center">
              <Image src={profile} className="rounded-3xl transition duration-300 ease-in-out hover:scale-105" alt="Profile Picture" width={500} height={500} />
            </div>
            <div className="w-[70%] xxs:w-full xs:w-full pl-4 xxs:p-2 xs:p-2 flex flex-col justify-evenly items-start">
              <h3 className="text-2xl xxs:text-sm xs:text-sm font-semibold text-gray-700"><strong>Name:</strong> {user.name}</h3>
              <h3 className="text-2xl xxs:text-sm xs:text-sm font-semibold text-gray-700"><strong>Email:</strong> {user.email}</h3>
              <h3 className="text-2xl xxs:text-sm xs:text-sm font-semibold text-gray-700"><strong>Phone Number:</strong> {
              recentOrderDetails && recentOrderDetails[0] && recentOrderDetails[0].customerDetails.phoneNumber &&  recentOrderDetails.map((order : any, index : number) => (
                <>{order.customerDetails.phoneNumber}</>
              ))
             
              
              }</h3>
            </div>
          </div>
          <div className="w-full border xxs:border-0 xs:border-0 border-gray-200 rounded-lg xxs:p-0 xs:p-0 p-6 mb-6">
            <h2 className="text-4xl xxs:text-xl xs:text-xl font-semibold text-gray-800 mb-6">My Orders</h2>
            <section className="text-gray-600 body-font">
              <div className="container flex flex-wrap justify-evenly items-center px-5 xxs:p-0 xs:p-0 py-24 mx-auto">
              {

                orderStatus && orderStatus[0] &&  orderStatus.map((user : any, index : number) => (

                  <div className="flex justify-evenly w-full flex-wrap -m-4 text-center">
                  <div className="p-4 md:w-1/4 xxs:w-1/2 xs:w-1/2 sm:w-1/2 w-52">
                    <div className="border-2 flex flex-col gap-2 justify-evenly items-center border-gray-200 px-4 py-6 rounded-lg transition duration-300 ease-in-out hover:shadow-lg">
                      <MdDoneOutline size={40} className="text-green-500" />
                      <h2 className="title-font font-medium text-3xl text-gray-900">{user.accepted || 0}</h2>
                      <p className="  leading-relaxed">Accepted</p>
                    </div>
                  </div>
                  <div className="p-4 md:w-1/4 xxs:w-1/2 xs:w-1/2 sm:w-1/2 w-52">
                    <div className="border-2 flex flex-col gap-2 justify-evenly items-center border-gray-200 px-4 py-6 rounded-lg transition duration-300 ease-in-out hover:shadow-lg">
                      <MdOutlinePending size={40} className="text-yellow-500" />
                      <h2 className="title-font font-medium text-3xl text-gray-900">{user.pending}</h2>
                      <p className="leading-relaxed">Pending</p>
                    </div>
                  </div>
                  <div className="p-4 md:w-1/4 xxs:w-1/2 xs:w-1/2 sm:w-1/2 w-52">
                    <div className="border-2  flex flex-col gap-2 justify-evenly items-center border-gray-200 px-4 py-6 rounded-lg transition duration-300 ease-in-out hover:shadow-lg">
                      <AiOutlineStop size={40} className="text-red-500" />
                      <h2 className="title-font font-medium text-3xl text-gray-900">{user.rejected}</h2>
                      <p className="leading-relaxed">Rejected</p>
                    </div>
                  </div>
                  <div className="p-4 md:w-1/4 xxs:w-1/2 xs:w-1/2 sm:w-1/2 w-52">
                    <div className="border-2 flex flex-col gap-2 justify-evenly items-center border-gray-200 px-4 py-6 rounded-lg transition duration-300 ease-in-out hover:shadow-lg">
                      <AiOutlineDeliveredProcedure size={40} className="text-blue-500" />
                      <h2 className="title-font font-medium text-3xl text-gray-900">{user.delivered}</h2>
                      <p className="leading-relaxed">Delivered</p>
                    </div>
                  </div>
                </div>
               ))
                }
              </div>
            </section>
          </div>
          <div className="w-full border xxs:border-0 xs:border-0 xxs:p-0 xs:p-0 border-gray-200 xxs:shadow-none xs:shadow-none rounded-lg p-6 xxs:mb-0 xs:mb-0 mb-6">
            <h2 className="text-4xl xxs:text-xl xs:text-xl font-semibold text-gray-800 xxs:mb-0 xs:mb-0 mb-6">My Address</h2>
            <section className="text-gray-600 body-font">
              
              {
               shippingDetails && shippingDetails[0] &&  shippingDetails.map((user : any, index : number) => (

                <div className="container px-5 xxs:px-0 xxs:py-4 py-24 mx-auto flex flex-wrap">
              <div className="flex flex-wrap -m-4">
                <div className="p-4 xxs:p-2 xs:p-2  md:w-full">
                  <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col transition duration-300 ease-in-out hover:shadow-lg">
                    <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-grow ">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3"><strong>Address:</strong> {user.address}</h2>
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3"><strong>City:</strong> {user.city}</h2>
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3"><strong>Country:</strong> {user.country}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))
            }
            </section>
          </div>
          <div className="w-full border xxs:border-0 xs:border-0 border-gray-200 rounded-lg xxs:p-0 xs:p-0 p-6">
            <h2 className="text-4xl xxs:text-xl xs:text-xl font-semibold text-gray-800 mb-6">Recent Order Details</h2>
            <div className="flex flex-col w-full bg-white rounded-lg xxs:rounded-none shadow-md overflow-hidden">
               {
                recentOrderDetails && recentOrderDetails[0] &&    recentOrderDetails.map((user : any, index : number) => (
                  <>

                  <div className="flex xxs:flex-col xs:flex-col justify-between px-6 py-4">
                <div className="flex items-center">
                  <Image className="h-20 w-20 rounded-md object-cover mr-4" src={user.orderItems[0].productImage} width={500} height={500} alt="Product Image" />
                  <div className="text-left">
                       <p className="text-base xxs:text-sm xs:text-sm text-gray-500">Product Name : {user.orderItems[0].productName}</p>
                    <p className="text-sm text-gray-500">Order Time: {user.orderTime} </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <ul className="text-sm font-medium text-gray-500 list-none pl-0">
                    <li className="flex items-center mb-2">
                      <span className="mr-2 text-green-500">●</span> Placed
                    </li>
                    <li className="flex items-center mb-2">
                      <span className="mr-2 text-gray-400">●</span> Processing
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-gray-400">●</span> Shipped
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex xxs:flex-col xs:flex-col justify-between px-6 py-4 border-t border-gray-200">
                <div className="text-left">
                  <h4 className="text-base font-medium text-gray-900">Shipping Details</h4>
                  <p className="text-sm text-gray-500">{user.address}</p>
                  <p className="text-sm text-gray-500">Phone: {user.customerDetails.phoneNumber}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-base font-medium text-gray-900">Order Status</h4>
                  <p className="text-sm font-semibold text-green-500">Awaiting Shipment</p>
                  <p className="text-sm text-gray-500">Ordered Date: {user.orderDate.split('T')[0]} (Subject to Change)</p>
                       </div>
              </div>
         </>
          ))
         }
            </div>
          </div>
        </div>
        </>
      ))}
    </div> 

 </>
  )
}

export default ProfileComp