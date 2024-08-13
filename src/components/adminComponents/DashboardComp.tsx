"use client"
import React, { useEffect , useState } from 'react'
import DashboardSidebarComp from './DashboardSidebar'
import DashboardHeader from './dashboardHeader'
import  adminDashboardAction  from '@/actions/adminDashboardAction'
const DashboardComp = () => {

    const [statics, setStatics] = useState<any>(null)

  

  useEffect(() => {
    fetchStatics()
    }, [])

    const fetchStatics = async () => {
        try {
           const statics = await adminDashboardAction();
           console.log('Statics:', statics)
           setStatics(statics)
        } catch (error) {
            console.log('Error:', error)
        }
    }


  return (
    <>
<div className='w-[100vw] min-h-[90vh] flex flex-col'>
    <DashboardHeader onOpen={() => {}} />
    <div className='w-full h-[90vh] justify-center flex'>
        <DashboardSidebarComp />
      {
        statics != null ?  <div className=' w-[90%]   bg-gray-100 h-full flex flex-col p-4 space-y-4'>
        <h1 className='text-3xl text-center text-green-500'>Dashboards</h1>
        <div className='w-full grid grid-cols-3 xs:grid-cols-1 xxs:grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white shadow-md p-4 rounded-md flex flex-col justify-center items-center' style={{ height: '12rem' }}>
                <h2 className='text-xl font-semibold mb-2'>Active Users</h2>
                <p className='text-2xl'>{statics.activeUsers}</p>
            </div>
            <div className='bg-white shadow-md p-4 rounded-md flex flex-col justify-center items-center' style={{ height: '12rem' }}>
                <h2 className='text-xl font-semibold mb-2'>Orders</h2>
                <p className='text-2xl'>{statics.totalOrders}</p>
            </div>
            <div className='bg-white shadow-md p-4 rounded-md flex flex-col justify-center items-center' style={{ height: '12rem' }}>
                <h2 className='text-xl font-semibold mb-2'>Sales</h2>
                <p className='text-2xl'>RS-{statics.totalOrdersPrice}</p>
            </div>
        </div>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* <div className='bg-white shadow-md p-4 rounded-md flex flex-col justify-center items-center' style={{ height: '12rem' }}>
                <h2 className='text-xl font-semibold mb-2'>Today Notifications</h2>
                <p className='text-2xl'>{statics.todayNotification.length}</p>
            </div> */}
            <div className='bg-white shadow-md p-4 rounded-md flex flex-col justify-center items-center' style={{ height: '12rem' }}>
                <h2 className='text-xl font-semibold mb-2'>Pending Tasks</h2>
                <p className='text-2xl'>15</p>
            </div>
        </div>
    </div> : <div className='w-full h-full flex justify-center items-center'>
    <p>Loading...</p>
    </div>
      }  
     
    </div>
</div>















    </>
  )
}

export default DashboardComp