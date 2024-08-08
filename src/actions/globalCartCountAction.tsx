"use server";
import { useAppDispatch } from "@/lib/store/hooks"
import cartCount from "./cartCountAction"
import getUserByEmailAction from "./getUserByEmailAction"
import sessionAction from "./sessionAction"
import { cartsCount } from "@/lib/store/features/carts/cartsSlice"


const globalCartCountAction = async () => {
    try {

        console.log('Global Cart Count Action') 
        // const dispatch = useAppDispatch()
        console.log('Dispatch:')
        const user = await sessionAction()
        
     
        if (!user) {
          console.error('Failed to fetch session')
          return
        }
  
        console.log('User:', user)

        if(!user?.user?.email){
            console.error('User email not found')
            return
        }
  
        // const userData : any = await getUserByEmailAction(user?.user?.email)
  
    //     if (!userData.ok) {
    //       console.error('Failed to fetch user')
    //       return
    //     }
  
    //     const data = await userData.json()
    // console.log(data)
  
        const cart = await cartCount((user.user as any)._id)
        console.log('Cart counted successfully')
        console.log(cart)

        return cart;
        // dispatch(cartsCount(await cart.json()))
      } catch (error) {
        console.error('Failed to fetch cart count:', error)
      }
}

export default globalCartCountAction