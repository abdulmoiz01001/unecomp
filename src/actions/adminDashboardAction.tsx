"use server";

const adminDashboardAction = async () => {

  try {

    const getOrdersPrice = await fetch(`${process.env.NEXTAUTH_URL}/api/orders?orderCount=orderCount`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },

    });


    console.log('Get Orders:', getOrdersPrice);

    const data = await getOrdersPrice.json();

    console.log('Orders Data:', data);

    const activeUsers = await fetch(`${process.env.NEXTAUTH_URL}/api/userscount`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },

    });

    console.log('Active Users:', activeUsers);

    const usersData = await activeUsers.json();

    console.log('Users Data:', usersData);

    const allOrders = await fetch(`${process.env.NEXTAUTH_URL}/api/orders?count=count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },

    });

    console.log('All Orders:', allOrders);

    const allOrdersData = await allOrders.json();

    console.log('All Orders Data:', allOrdersData);





    let sumOfAllTotalPrices = 0;

    await data.forEach((order: { totalPrice: any; }) => {
      sumOfAllTotalPrices += Number(order.totalPrice);
    }
    );



    let orders = {
      totalOrdersPrice: sumOfAllTotalPrices,
      totalOrders: data.length,
      activeUsers: usersData,
   
      // allOrders: allOrdersData
    }


    console.log('Orders:', orders);

    return orders;
  }
  catch (e) {
    console.log(e)
  }

}

export default adminDashboardAction