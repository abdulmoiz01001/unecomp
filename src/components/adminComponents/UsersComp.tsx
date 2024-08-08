"use client"
import React , { useEffect , useState } from 'react'
import DashboardSidebarComp from './DashboardSidebar'
import DashboardHeader from './dashboardHeader'
import gettingUsersAction from '@/actions/gettingUsersAction'

const UsersComp = () => {


 
  const [ users , setUsers ] = useState<any>([])

   useEffect(() => {
      fetchUsers()
    }, [])

    const fetchUsers = async () => {
      
      try {
        
        const data = await gettingUsersAction();
        console.log(data)
        setUsers(data)
      } catch (error) {
        console.log(error)
      }
    }


  return (
    
    <>

    <div className='w-[100vw] min-h-[90vh] flex flex-col justify-between items-start '>
  
   
  <DashboardHeader onOpen={()=>{}} />
  <div className='w-full h-[90vh] flex justify-between items-start '>
  <DashboardSidebarComp />
  <div className='w-full bg-gray-100 min-h-[100vh] flex flex-col justify-start   items-start '>
  <div className='w-[100%] h-full flex flex-col justify-center items-start '>
    {/* <div className='w-full h-[10%] bg-[#285d31]'> */}
        <h1  className='text-2xl text-center text-green-500' >Users</h1>
    {/* </div> */}
    <div className='w-full h-full flex justify-center flex-wrap items-center  '>
        {
          users.map((user : any) => {
            return (
              <div key={user._id} className='w-[90%] h-[10%] shadow-lg  xxs:flex-col xs:flex-col  select-none px-4 flex justify-between font-bold text-black items-center border-2 m-2'>
                <h1 className='text-sm' >{user.name}</h1>
                <h1 className='text-sm' >{user.gender}</h1>
               {
                user.verified ? <h1 className='text-green-500'>Verified</h1> : <h1 className='text-red-500'>Not Verified</h1>
               } 
                <h1 className='text-sm' >{user.email}</h1>
              </div>
            )
          })
        }
    </div>
    </div>

  </div>
  </div>
  </div>
    </>
  )
}

export default UsersComp