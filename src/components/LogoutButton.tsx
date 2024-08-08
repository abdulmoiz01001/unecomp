import { useRouter } from 'next/navigation';
import  logoutAction  from '@/actions/logoutAction';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logoutAction();
    if (response.message) {
      router.push('/auth/login'); // Redirect to login page after logout
    } else {
      console.error(response.error);
    }
  };

  return (
    <li onClick={()=>{handleLogout()}} className='cursor-pointer lg:text-sm bg-[#285d31] text-white p-4 text-center list-none font-bold text-xl active:scale-110 select-none' >Logout</li>
         
  );
};

export default LogoutButton;
