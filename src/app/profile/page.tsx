import ProfileComp from "@/components/ProfileComp"
import Drawar from "@/components/DrawerComp"
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile",
};
const ProfilePage = async () => {

  return (
<>
<Drawar />
  <ProfileComp />
</>
)
}

export default ProfilePage