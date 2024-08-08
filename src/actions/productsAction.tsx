
"use server";
const productsAction = async(products : any) => {
    console.log("Products Data:", products);
    try{
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(products),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to Create Product in Database : ${errorData.message}`);
    }

    const data = await res.json();

    console.log("This is response data:", data);

    return data;


    }catch(error){
        console.log(error);
    }
}

export default productsAction;