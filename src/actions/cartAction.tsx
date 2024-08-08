"use server"

const cartAction = async (category:string , id:string , _id:string) => {
    console.log('Product ID:', id);
    console.log('Product Category:', category);
    console.log('User ID:', _id);         
    
    try{
      
   const getCart = await fetch(`${process.env.NEXTAUTH_URL}/api/cart?id=${id}&user=${_id}`, {
     method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  
  });


console.log('Get Cart:', getCart);

const data =  await getCart.json();

console.log('Cart Data:', data);



 if (data !== null && data.length > 0) {
            console.log('Cart already exists for this product.');
            return null;
        }

}catch(e){
  console.log(e)
}
      
try{
      const product = await fetch(`${process.env.NEXTAUTH_URL}/api/products?categories=${category}&id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
  console.log('Product:', product);


    
    if (!product.ok) {
      console.error('Failed to fetch product');
    }

    const productData = await product.json();

    console.log('Product Data:', productData);

    let cart = {
     productName: productData.productName,
     productPrice: productData.productPrice,
     productQuantity: 1,
     fileURL: productData.fileURL,
     productCategory: productData.productCategory,
     productID: productData._id,
     user: _id,
     cartDate: new Date().toLocaleDateString(),
     cartTime: new Date().toLocaleTimeString()
    }

    console.log('Cart:', cart);

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cart)
    });
   
    console.log('Cart Response:', res);

    if (!res.ok) {
      console.error('Failed to create cart');
    }

    const data  = await res.json();

  console.log('Cart Data:', data);
  return data;

}catch(e){
  console.log(e)
}

}


export default cartAction;