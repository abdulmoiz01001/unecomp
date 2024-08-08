// "use client";
// import React, { useState, useEffect } from "react";
// import { useAppDispatch } from "@/lib/store/hooks";
// import { useRouter } from "next/navigation";
// import { cartOrders, cartsCount, clearCartsData } from "@/lib/store/features/carts/cartsSlice";
// import { CircularProgress } from "@chakra-ui/react";
// import dropCartAction from "@/actions/dropCartAction";
// import Image from "next/image";
// import sessionAction from "@/actions/sessionAction";
// // import removeCartAction from "@/actions/removeCartAction";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import removeCartAction from "@/actions/removeCartAction";
// import cartCount from "@/actions/cartCountAction";


// type Cart = {
//   cartDate: string;
//   cartTime: string;
//   user: string;
//   _id: string;
//   productName: string;
//   productCategory: string;
//   fileURL: string;
//   productPrice: string;
//   productID: string;
//   productQuantity?: number; // Change to object type
// };

// const AddToCartComp = () => {
//   const [cartData, setCartData] = useState<Cart[]>([]);
//   const [ spinner , setSpinner] = useState(true)
//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   // const [user , setUser] = useState<string>('')
//   const [ email , setEmail ] = useState<string>('') 
//   const dispatch = useAppDispatch();
//   const route = useRouter();

//   const fetchCarts = async () => {
//     try {
//       const getCart = await fetch(`/api/cart`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!getCart.ok) {
//         console.error("Failed to fetch cart");
//         setSpinner(false);
//         return;
//       }

//       const cartsData: Cart[] = await getCart.json();
//       console.log("Cart Data:", cartsData);

//        const user = await sessionAction()
//       //  setUser(user)
//         setEmail(user?.user?.email)
//       console.log(user)
       

//       setCartData(cartsData);
//       setSpinner(false);
//       console.log("Cart Data:", cartsData);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const placeAllCartsOrder = async () => {
//     try {
//       setSpinner(true);
//       await dropCartAction().then((res) => {
//         console.log(res);
//       }).catch((e) => {
//          console.log(e)
//       })
      
//       dispatch(clearCartsData());
//     console.log(cartData.length);

//     cartData.forEach(async (cart : any) => {

//   console.log(totalPrice);
// dispatch(cartOrders(cart));
//     });
// setSpinner(false);
// route.push('/deliverydetails');
//     } catch (error) {
//       console.error("Failed to place order");
//     }
      
//   }

//   useEffect(() => {
//     console.log("Fetching carts...");
//     fetchCarts();
//     console.log("Cart Data:", cartData);
//   }, []);

//   useEffect(() => {
//     let total = 0;
//     cartData.forEach((cart) => {
    
//         const price = Number(cart.productPrice);
//         const quantity = Number(cart.productQuantity ?? 1);
//         total += price * quantity;

//     });
//     setTotalPrice(total);
//   }, [cartData]);
 
//   const increaseQuantity = async (id: string) => {
//     const cart = cartData.find((cart) => cart._id === id);
//     if (!cart) return;

//     const updatedCart = { ...cart, productQuantity: cart?.productQuantity + 1 };
//     const updatedCarts = cartData.map((cart) =>
//       cart._id === id ? updatedCart : cart
//     );

//     setCartData(updatedCarts);

//     // console.log(cartData);
//   }

//   const decreaseQuantity = async (id: string) => {
//     const cart = cartData.find((cart) => cart._id === id);
//     if (!cart) return;
//     if (cart.productQuantity === 1) return;
//     const updatedCart = { ...cart, productQuantity: cart?.productQuantity - 1 };
//     const updatedCarts = cartData.map((cart) =>
//       cart._id === id ? updatedCart : cart
//     );

//     setCartData(updatedCarts);

//     // console.log(cartData)
//   }

  
//   const countCarts = async () => {
//     try{

//       const cart = await cartCount()
//       const data = await cart.json()
//       console.log(data)
//       dispatch(cartsCount(data))
//       return data
//     }catch(error){
//       console.error('An error occurred while fetching the data:', error);
//     }
//   }

//   const removeCart = async (productID: string) => {
//     console.log(productID);
//     try{
//       // setSpinner(true)

//       const res = await removeCartAction(productID , email)
//       console.log(res);
//       fetchCarts();
//       countCarts()
//     }catch(e){
//       console.log(e)
//     }

//     // try {
//     //   setSpinner(true);
//     //   await removeCartAction(productID , email).then((res) => {
//     //     console.log(res);
//     //     fetchCarts();
//     //   }).catch((e) => {
//     //      console.log(e)
//     //   })
//     //   setSpinner(false);
//     // } catch (error) {
//     //   console.error("Failed to remove cart");
//     // }
//   }

 
//   return (
//     <>
//       <div className="container w-[100vw] mx-auto p-4">
//         <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
//         <div className="bg-white w-full shadow-lg rounded-lg p-4">
//           {cartData ? (
//             cartData.length === 0 ? (
//               <div className="w-full h-full flex justify-center items-center" >
//                {
//                 spinner ? <CircularProgress isIndeterminate color='green.300' /> :  <p className='shadow-xl p-8 text-center center'>Your cart is empty.</p>
//                } 

//               </div>
//               // <p>Your cart is empty.</p>
//             ) : (
//               <div>
//                 {cartData.map((cart) =>
                
//                     <div key={cart._id} className="flex w-[100%] justify-between items-center py-4 border-b">
//                       <div className="flex w-[30%] flex-col">
//                         <span className="font-semibold text-lg">{cart.productName}</span>
//                         <span className="text-gray-600">RS-{cart.productPrice} each</span>
//                       </div>
//                       <div className="flex w-[20%] items-center">
//                         <Image
//                           src={cart.fileURL}
//                           alt={cart.productName}
//                           className="w-[80px] h-[80px] object-cover rounded-lg"
//                           width={500}
//                           height={500}
//                         />
//                         </div>
//                       <div className="flex w-[20%] items-center">
//                         <button
//                           onClick={() => decreaseQuantity(cart._id)}
//                           className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
//                         >
//                           -
//                         </button>
//                         <span className="mx-2 w-[30px]">{cart.productQuantity}</span>
//                         <button
//                           onClick={() => increaseQuantity(cart._id)}
//                           className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
//                         >
//                           +
//                         </button>
//                       </div>
//                       <div className="flex w-[20%] justify-center items-center" >
//                          <button onClick={()=>removeCart(cart.productID)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 active:scale-95 px-4 rounded focus:outline-none focus:shadow-outline"><RiDeleteBin6Line size={40} color="white" /></button>
//                       </div>
//                       <div className="text-gray-800 flex justify-end items-center w-[10%] font-semibold">
//                         RS-{Number(cart.productPrice) * Number(cart.productQuantity || 1)}
//                       </div>
//                     </div>
                  
//                 )}
//                 <div className="flex w-[100%] justify-between items-center mt-4">
//                   <span className="text-lg font-semibold">Total Price:</span>
//                   <span className="text-lg font-semibold">RS-{totalPrice}</span>
//                 </div>
//                 <div className="flex justify-between items-center mt-4">
//                   <button onClick={()=>{placeAllCartsOrder()}} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                    {spinner ? <CircularProgress isIndeterminate color='green.300' />  : "Place Order"}
//                   </button>
//                 </div>
//               </div>
//             )
//           ) : null}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddToCartComp;


"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { cartOrders, cartsCount, clearCartsData } from "@/lib/store/features/carts/cartsSlice";
import { CircularProgress } from "@chakra-ui/react";
import dropCartAction from "@/actions/dropCartAction";
import Image from "next/image";
import sessionAction from "@/actions/sessionAction";
import { RiDeleteBin6Line } from "react-icons/ri";
import removeCartAction from "@/actions/removeCartAction";
import getUserByEmailAction from "@/actions/getUserByEmailAction";
import cartCount from "@/actions/cartCountAction";
import { isArray } from "util";
import globalCartCountAction from "@/actions/globalCartCountAction";

type Cart = {
  cartDate: string;
  cartTime: string;
  user: string;
  _id: string;
  productName: string;
  productCategory: string;
  fileURL: string;
  productPrice: string;
  productID: string;
  productQuantity?: number;
};

const AddToCartComp: React.FC = () => {
  const [cartData, setCartData] = useState<Cart[]>([]);
  const [spinner, setSpinner] = useState(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [ userID , setUserID ] = useState<any>(null)
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchCarts = useCallback(async () => {
    try {
      const user : any = await sessionAction();
      console.log(user)
   
      // const userByEmail = await getUserByEmailAction(user?.user?.email || '');
  //  if (!userByEmail.ok) {
  //       console.error("Failed to fetch user by email");
  //       setSpinner(false);
  //       return;
  //     }
      // const userByEmailData = await userByEmail.json();

      // console.log('User:', userByEmailData);
      setUserID(user.user._id);
      // console.log('User:', userByEmail);
      setSpinner(true);
      const getCart = await fetch(`/api/cart?id=${user.user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!getCart.ok) {
        console.error("Failed to fetch cart");
        setSpinner(false);
        return;
      }

      countCarts();

      console.log('User:', user);
      const cartsData: Cart[] = await getCart.json();
      console.log('Cart Data:', cartsData);
      if(cartsData.length === 0 || cartsData == null){
        setSpinner(false);
        return;
      } 
      if(!Array.isArray(cartsData)){
        console.log("single Product")
        console.log(cartsData);
        console.log([cartsData] || []);
        setEmail(user?.user?.email || '');
        setCartData([cartsData]);
        setSpinner(false);
        return;
      }
      console.log("Cart Data:", cartsData);
      setEmail(user?.user?.email || '');
      setCartData(cartsData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setSpinner(false);
    }
  }, []);

  const placeAllCartsOrder = async () => {
    try {
      if(cartData.length === 0 || cartData == null){
        return;
      }
      setSpinner(true);
      console.log('userID' , userID);
      await dropCartAction(userID);
      dispatch(clearCartsData());

      cartData.forEach(cart => {
        dispatch(cartOrders(cart));
      });

      router.push('/deliverydetails');
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      setSpinner(false);
    }
  };

  const countCarts = async () => {
    try{
      console.log('Counting carts')
    const cart =  await globalCartCountAction();
    if(cart == null){
      console.log('Cart is empty')
      return
    }
    dispatch(cartsCount(cart))

    }catch(error){
      console.error('Failed to fetch cart count:', error)
    }
 
  }

  // useEffect(() => {
  //   console.log('Counting carts')
  //   countCarts()
  // }, [])

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);


  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      cartData.forEach(cart => {
        const price = Number(cart.productPrice);
        const quantity = Number(cart.productQuantity ?? 1);
        total += price * quantity;
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartData]);

  const increaseQuantity = (id: string) => {
    setCartData(prevCartData => {
      return prevCartData.map(cart =>
        cart._id === id
          ? { ...cart, productQuantity: (cart.productQuantity ?? 1) + 1 }
          : cart
      );
    });
  };

  const decreaseQuantity = (id: string) => {
    setCartData(prevCartData => {
      return prevCartData.map(cart =>
        cart._id === id && (cart.productQuantity ?? 1) > 1
          ? { ...cart, productQuantity: (cart.productQuantity ?? 1) - 1 }
          : cart
      );
    });
  };

  // const countCarts = async () => {
  //   try {
  //     const cart = await cartCount();
  //     const data = await cart.json();
  //     dispatch(cartsCount(data));
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching cart count:", error);
  //   }
  // };

  const removeCart = async (productID: string) => {
    try {
      const res = await removeCartAction(productID, userID);
      console.log(res);
      await fetchCarts();
      await countCarts();
    } catch (error) {
      console.error("Failed to remove cart:", error);
    }
  };

  return (
    <div className="container w-[100vw] mx-auto p-4">
      <h2 className="text-2xl xxs:text-xl font-semibold mb-4">Shopping Cart</h2>
      <div className="bg-white w-full shadow-lg rounded-lg p-4">
        {spinner ? (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress isIndeterminate color='green.300' />
          </div>
        ) : cartData.length === 0 || cartData == null ? (
          <p className='shadow-xl p-8 text-center'>Your cart is empty.</p>
        ) : (
          <div>
            {cartData.map(cart => (
              <div key={cart._id} className="flex xxs:flex-col w-[100%] justify-between items-center py-4 border-b">
                <div className="flex xxs:w-full w-[30%] flex-col">
                  <span className="font-semibold xxs:text-sm  text-lg">{cart.productName}</span>
                  <span className="text-gray-600 xxs:text-sm ">RS-{cart.productPrice} each</span>
                </div>
                <div className="flex xxs:w-full w-[20%] items-center">
                  <Image
                    src={cart.fileURL}
                    alt={cart.productName}
                    className="w-[80px] xxs:w-[120px] h-[80px] xxs:h-[120px] object-cover rounded-lg"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="flex xxs:w-full w-[20%] items-center">
                  <button
                    onClick={() => decreaseQuantity(cart._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    -
                  </button>
                  <span className="mx-2  w-[30px] text-center">{cart.productQuantity}</span>
                  <button
                    onClick={() => increaseQuantity(cart._id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  >
                    +
                  </button>
                </div>
                <div className="flex xxs:w-full xxs:justify-end w-[20%] justify-center items-center">
                  <button
                    onClick={() => removeCart(cart.productID)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 active:scale-95 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    <RiDeleteBin6Line size={24} color="white" />
                  </button>
                </div>
                <div className="text-gray-800 xxs:w-[30%] flex justify-end items-center w-[10%] font-semibold">
                  RS-{Number(cart.productPrice) * Number(cart.productQuantity || 1)}
                </div>
              </div>
            ))}
            <div className="flex w-[100%] justify-between items-center mt-4">
              <span className="text-lg font-semibold">Total Price:</span>
              <span className="text-lg font-semibold">RS-{totalPrice}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={placeAllCartsOrder}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartComp;
