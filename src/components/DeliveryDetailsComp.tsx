"use client"
import { useAppSelector } from '@/lib/store/hooks';
import { useAppDispatch } from '@/lib/store/hooks';
import { CircularProgress, Tab, TabList, TabPanel, TabPanels, Tabs, background } from '@chakra-ui/react';
import React, { useState , useEffect, use, useMemo } from 'react';
import { useRouter } from 'next/navigation';
// import { addOrder } from '@/lib/store/features/orders/ordersSlice';
import { clearData } from '@/lib/store/features/orders/ordersSlice';
import { set } from 'mongoose';
import orderAction from '@/actions/orderAction';
import sessionAction from '@/actions/sessionAction';
import Image from 'next/image';
import cartOrderAction from '@/actions/cartOrderAction';
import Link from 'next/link';
// import io from 'socket.io-client'

const DeliveryDetailsComp = () => {

  const departments = [
    "Department of Telecommunication Engineering",
    "Department of Electronics Engineering",
    "Department of Electrical Engineering",
    "Department of Mechanical Engineering",
    "Department of Mechatronics Engineering",
    "Department of Biomedical Engineering",
    "Department of Architecture Engineering",
    "Department of Petroleum Engineering",
    "Department of Metallurgy Engineering",
    "Department of Industrial Engineering",
    "Department of Textile Engineering",
    "Department of Software Engineering",
    "Department of Computer System Engineering",
    "Department of Civil Engineering",
    "Department of Mining Engineering"
  ];

  const [message, setMessage] = useState('');

  // const socket = useMemo(() => io('https://socket.vercel.app/'), []);

  // console.log(socket)

  // console.log("socket " + socket.id)


  // const sendNotification = () => {
 

  //   const notification = {
  //     userId: userID, // Replace with actual userID
  //     message: message, // Replace with actual message
  //     date: new Date().toLocaleDateString(),
  //     time: new Date().toLocaleTimeString(),
  //   };
  
  //   console.log('Sending notification:', notification);
    
  //   socket.emit("sendNotification", notification);
  //   console.log('Notification sent');
  // };
  
  const router = useRouter();
  const dispatch = useAppDispatch();
   const orderedProduct = useAppSelector((state) => state.order.orders)
   const cartedProducts = useAppSelector((state) => state.carts.cartOrders)
   const [parsedProduct, setParsedProduct] = useState<any>([]);
   const [ cartProducts , setCartProducts ] = useState<String[]>([]);
   const [ userDetailsError , setUserDetailsError ] = useState(null as any)
  //  const [ totalPrice , setTotalPrice ] = useState<number>(0)

  //  console.log(cartProducts)
  //  console.log(totalPrice)
  

    useEffect(() => {
    console.log(orderedProduct)
    console.log(cartedProducts)
    if(orderedProduct.length === 0 && cartedProducts.length === 0 ){
      router.push('/store')
    }
    
    
       if (orderedProduct !== undefined && orderedProduct.length === 1) {
        // const parsed = JSON.parse((orderedProduct).toString());
        const parsed = orderedProduct;
        setParsedProduct(parsed);
        // console.log(parsedProduct);
       } else if( cartedProducts !== undefined && cartedProducts.length > 0 ){
        
          // setTotalPrice(totalPrice)

          setCartProducts(cartedProducts);
          // setParsedProduct(parsed);
          console.log(cartProducts)
       }
       else{
        router.push('/store')
       }
       } 
  , [])

  //  console.log(cartProducts)
  

  const [activeTab, setActiveTab] = useState(0);
    const [namePrefix, setNamePrefix] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [deptName, setDeptName] = useState('');
    const [email, setEmail] = useState('');
    const [ userID , setUserID ] = useState('' as any)
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [city, setCity] = useState('');
    const [ userDetails , setUserDetails ] = useState({} as any)
    const [ cashOnDelivery , setCashOnDelivery ] = useState(false)
    const [ spinner , setSpinner ] = useState(false)
  
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      switch (name) {
        case 'namePrefix':
          setNamePrefix(value);
          break;
        case 'firstName':
          setFirstName(value);
          break;
        case 'lastName':
          setLastName(value);
          break;
        case 'deptName':
          setDeptName(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'projectName':
            setProjectName(value);
            break;
        case 'deliveryAddress':
          setDeliveryAddress(value);
          break;
        case 'phoneNumber':
          setPhoneNumber(value);
          break;
        case 'rollNumber':
          setRollNumber(value);
          break;
        case 'city':
          setCity(value);
          break;
       
        default:
          break;
      }
    };

   const goBack = () => {
    dispatch(clearData());
    router.back();
  }

  const saveData = async (e:    React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userDetail = {
      namePrefix,
      firstName,
      lastName,
      deptName,
      email,
      projectName,
      // deliveryAddress,
      phoneNumber,
      rollNumber,
      // city,
    };
    console.log(userDetail);
    console.log(parsedProduct);
    setUserDetails(userDetail  as any)
    await sessionAction().then((res : any) => {console.log(res)
      if(res !== undefined){
      setMessage(res.user.name+ " has order the product has email" + res.user.email)}
      setUserID(res?.user?._id)
      console.log(userID)
    } );
    setActiveTab(1);
    // dispatch(addUserDetails(data));
  }    

  const placeOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpinner(true);
    console.log(userDetails);
    console.log(parsedProduct);
    console.log(cashOnDelivery)

    if(!userDetails.email) {
      setUserDetailsError("Please fill the user details");
      setSpinner(false)
      return;

    }
 

    if(parsedProduct.length>0 && parsedProduct){
      try{

        await orderAction(userID, parsedProduct, userDetails, city, deliveryAddress, cashOnDelivery).then((res) => {console.log(res) 
         if(res !== undefined){
         setSpinner(false)
          if( res.message === 'Order placed successfully'){
          //  const msg : any = sendNotification()
          //  console.log(msg)
          // if(msg){
            router.push('/orders')
          // }
          }
       } });
        
      }catch(err){
        console.log(err)
      }
       
    } else if(cartProducts.length > 0 && cartProducts){
      try{
        console.log(cartedProducts)
        await cartOrderAction(userID, cartProducts, userDetails, city, deliveryAddress, cashOnDelivery ).then((res) => {console.log(res) 
        if(res !== undefined){
        setSpinner(false)
        if( res.message === 'Order placed successfully'){
        // const msg : any = sendNotification()
        // console.log(msg)

        // if(msg){
        
          router.push('/orders')
        // }

        }
        } });
        }catch(err){
          console.log(err)
          }
    }
    
  
     

  


   

  //  console.log(session);

   

    // console.log(order);
    // dispatch(placeOrder(userDetails, parsedProduct, cashOnDelivery));
    // router.push('/orderplaced');
  }


  return (
    
    <>
      <div className="container w-[100vw] mx-auto px-4 py-8 xxs:p-2">
  <h1 className="text-3xl font-bold mb-6">Product Order</h1>
  <Tabs isFitted variant='enclosed' index={activeTab} >
        <TabList style={{ marginBottom: '1em' }}>
          <Tab
            style={{
              backgroundColor: activeTab === 0 ? '#285d31' : 'white',
              color: activeTab === 0 ? 'white' : 'black',
              border: '1px solid #285d31',
            }}
            onClick={() => setActiveTab(0)}
          >
            User Details
          </Tab>
          <Tab
            style={{
              backgroundColor: activeTab === 1 ? '#285d31' : 'white',
              color: activeTab === 1 ? 'white' : 'black',
              border: '1px solid #285d31',
            }}
            onClick={() => setActiveTab(1)}
          >
            Order Details
          </Tab>
        </TabList>
  <TabPanels>
    <TabPanel>
      <form onSubmit={saveData} className="grid grid-cols-1 gap-4">
    {/* Name Prefix */}
    <div className="grid grid-cols-3 gap-2">
      <label htmlFor="namePrefix" className="col-span-1 text-sm font-medium">Prefix</label>
      <select 
        required
        id="namePrefix" 
        name="namePrefix" 
        value={namePrefix} 
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange(event)} 
        className="col-span-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Select</option>
        <option value="Mr.">Mr.</option>
        <option value="Ms.">Ms.</option>
        <option value="Mrs.">Mrs.</option>
      </select>
    </div>

    <div className="grid grid-cols-3 gap-2">
      <label htmlFor="city" className="col-span-1 text-sm font-medium">City</label>
      <select 
      required
        id="city" 
        name="city" 
        value={city} 
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange(event)} 
        className="col-span-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Select</option>
        <option value="hyderabad">Hyderabad</option>
        <option value="jamshoro">Jamshoro</option>
      </select>
    </div>

    {/* First Name */}
    <div className="grid grid-cols-2 gap-2">
      <label htmlFor="firstName" className="col-span-1 text-sm font-medium">First Name</label>
      <input required 
        type="text" 
        id="firstName" 
        name="firstName" 
        value={firstName} 
        onChange={handleChange} 
        placeholder="Enter your first name"
        className="col-span-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
      />
    </div>

    {/* Last Name */}
    <div className="grid grid-cols-2 gap-2">
      <label htmlFor="lastName" className="col-span-1 text-sm font-medium">Last Name</label>
      <input required  
        type="text" 
        id="lastName" 
        name="lastName" 
        value={lastName} 
        onChange={handleChange} 
        placeholder="Enter your last name"
        className="col-span-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
      />
    </div>

    {/* Roll Number */}
    <div className="grid grid-cols-1 gap-2">
      <label htmlFor="rollNumber" className="text-sm font-medium">Roll Number</label>
      <input required 
        type="text" 
        id="rollNumber" 
        name="rollNumber" 
        value={rollNumber} 
        onChange={handleChange} 
        placeholder="Enter your roll number"
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
      />
    </div>

    {/* Phone Number */}
    <div className="grid grid-cols-1 gap-2">
      <label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</label>
      <input required  
        type="text" 
        id="phoneNumber" 
        name="phoneNumber" 
        value={phoneNumber} 
        onChange={handleChange} 
        placeholder="Enter your phone number"
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
      />
    </div>

    {/* Department Name */}
    <div className="grid grid-cols-1 gap-2">
      <label htmlFor="deptName" className="text-sm font-medium">Department Name</label>
      {/* <input required  
        type="text" 
        id="deptName" 
        name="deptName" 
        value={deptName} 
        onChange={handleChange} 
        placeholder="Enter your department name"
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
      /> */}
      <select
      required
      id="deptName"
      name="deptName"
      value={deptName}
      onChange={handleChange}
      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      <option value="" disabled>Enter your department name</option>
      {departments.map((department, index) => (
        <option key={index} value={department}>{department}</option>
      ))}
    </select>
    </div>

    {/* Project Name */}
    <div className="grid grid-cols-1 gap-2">
      <label htmlFor="projectName" className="text-sm font-medium">Project Name </label>
      <input  
        type="text" 
        id="projectName" 
        name="projectName" 
        value={projectName} 
        onChange={handleChange} 
        placeholder="Enter your project name"
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
      />
    </div>

    {/* Email */}
    <div className="grid grid-cols-1 gap-2">
      <label htmlFor="email" className="text-sm font-medium">Email</label>
      <input required
        type="email" 
        id="email" 
        name="email" 
        value={email} 
        onChange={handleChange} 
        placeholder="Enter your email"
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
      />
    </div>

    {/* Delivery Address */}
    <div className="grid grid-cols-1 gap-2">
      <label htmlFor="deliveryAddress" className="text-sm font-medium">Delivery Address</label>
      <input required
        type="text" 
        id="deliveryAddress" 
        name="deliveryAddress" 
        value={deliveryAddress} 
        onChange={handleChange} 
        placeholder="Enter your delivery address"
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
      />
    </div>

    <button type='submit' className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
                  Submit & Go Next
      </button>

  
     </form>
    </TabPanel>
    <TabPanel>

      <form onSubmit={placeOrder}>

      
  <div className='w-full h-full flex justify-evenly items-start flex-wrap'>

  
    {/* diplay all order details getting from sueAppSelector */}
   {
    //  parsedProduct.length > 0 
      
    cartProducts.length > 0  ? (  cartProducts.map((product : any , index : number)=>( 
      <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4">
    <Image className="w-full h-48 object-cover" src={product.fileURL} width={500} height={500} alt={product.productName} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{product.productName}</div>
      <p className="text-gray-700 text-base">
        {product.productDescription}
      </p>
      <div className="text-sm text-gray-600 mt-2">{product.productCategory}</div>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        Total RS-{product.productPrice*product.productQuantity}
      </span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        Ordered Quantity : {product.productQuantity}
      </span>
    </div>
  </div>  

    ))) : (
      parsedProduct.map((product : any , index : number)=>(
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4">
        <Image className="w-full h-48 object-cover" src={product.fileURL} width={500} height={500} alt={product.productName} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.productName}</div>
          {/* <p className="text-gray-700 text-base">
            {product.productDescription}
          </p> */}
          <details> {product.productDescription}
            <summary>{product.productDescription.substring( 0 , 50 )}</summary>
             </details>
          <div className="text-sm text-gray-600 mt-2">{product.productCategory}</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Total RS-{product.productPrice*product.productQuantity}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Ordered Quantity : {product.productQuantity}
          </span>
        </div>
      </div>  
  
      ))
    
    )
    
   } 

</div>

   {/* make sure for cash on delivery */}

    {/* Payment Method */}
    <div className="grid grid-cols-1 gap-2">
      <label className="text-sm font-medium">Payment Method</label>
      <div className="flex items-center gap-2">
        <input required
          type="radio" 
          onChange={()=>{setCashOnDelivery(true)}}
          id="cash" 
          name="payment" 
          value="cash" 
          className="rounded border border-gray-300 focus:ring-1 focus:ring-blue-500"
        />
        <label htmlFor="cash" className="text-sm font-medium">Cash on Delivery</label>
      </div>
      
    </div>

        {/* Terms and Conditions */}
    <div className="grid grid-cols-1 mt-10 mb-4 gap-2">
      <label className="text-sm font-medium">Terms and Conditions</label>
      <p className="text-sm text-gray-500">By placing this order, you agree to our terms and conditions. if not ? <Link className='underline text-blue-800' href="/term&policies">Read Terms and Conditions</Link> 
      </p>
      <div className="flex items-center gap-2">
        <input required 
          type="checkbox" 
          id="agreement" 
          name="agreement" 
          className="rounded border border-gray-300 focus:ring-1 focus:ring-blue-500" 
        />
        <label htmlFor="agreement" className="text-sm font-medium">I agree</label>
      </div>
    </div>

    {/* Submit Button */}
    {
      userDetailsError != '' && <div className="text-red-500 text-sm font-medium">{userDetailsError}</div>
    }
    <div className="grid grid-cols-1 gap-2">
   
   {
      spinner ? <CircularProgress isIndeterminate className='mx-auto' color='green.300' /> : <button 
      type="submit" 
      className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
    >
      Place Order
    </button>
   }   
    </div>
    </form>
    </TabPanel>
  </TabPanels>
</Tabs>

{/*  i need back button there done that copilot */}

                 <button onClick={()=>{goBack()}} className="px-6 py-3 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700">
                  Discard
                </button>
                {
                  activeTab === 1 ? <button onClick={()=>{setActiveTab(0)}} className="px-6 ml-4 py-3 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700">
                  Back
                </button> : null
                } 
  
</div>

    </>
  )
}

export default DeliveryDetailsComp