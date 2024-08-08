"use server";
import axios from "axios";

const profileAction = async (user: string, userID: string) => {
  try {
    const recentOrderShippingDetails = await axios.get(`${process.env.NEXTAUTH_URL}/api/profile?userId=${userID}&reqType=ordershipingdetails`).catch(error => {
      console.error('Error fetching recent shipping details:', error);
      return { data: null };
    });

    const totalInvestment = await axios.get(`${process.env.NEXTAUTH_URL}/api/profile?userId=${userID}&reqType=totalinvestment`).catch(error => {
      console.error('Error fetching total investment:', error);
      return { data: null };
    });

    const recentOrderDetails = await axios.get(`${process.env.NEXTAUTH_URL}/api/profile?userId=${userID}&reqType=recentorderdetails`).catch(error => {
      console.error('Error fetching recent order details:', error);
      return { data: null };
    });

    const orderStatus = await axios.get(`${process.env.NEXTAUTH_URL}/api/profile?userId=${userID}&reqType=orderstatus`).catch(error => {
      console.error('Error fetching order status:', error);
      return { data: null };
    });

    const profileData = [
      user,
      recentOrderShippingDetails.data,
      totalInvestment.data,
      recentOrderDetails.data,
      orderStatus.data,
    ];

    console.log("Profile Data", profileData);

    return profileData;

  } catch (error) {
    console.error('Error in profileAction:', error);
    return null; // Return null in case of a fatal error
  }
}

export default profileAction;
