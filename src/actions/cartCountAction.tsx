"use server";
const cartCount = async (userid : string) => {
  try {
    console.log('User ID:', userid);
    
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/cart?count=count&user=${userid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const count = await response.json();
    
    console.log('Count:', count);
    
    return count;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default cartCount;