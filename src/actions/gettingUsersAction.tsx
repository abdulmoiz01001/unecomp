"use server";


const gettingUsersAction = async () => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users?data=data`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        
        })
        const data = await res.json()
        // setUsers(data)
        console.log(data)
        return data;
      } catch (error) {
        console.log(error)
      }
}

export default gettingUsersAction;