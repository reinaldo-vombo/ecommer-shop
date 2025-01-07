'use client'

import { Button } from "../ui/button";
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { IUser } from "next-auth";

type TProps = {
   user: IUser
}
const UserInfoTab = ({ user }: TProps) => {
   const logout = () => {
      signOut()
   }
   return (
      <div>
         <h2 className="text-center h2-bold">{user.name}</h2>
         <div className="flex items-center justify-between">
            <span>Cilente</span>
            <Button onClick={() => logout()}><LogOut /></Button>
         </div>
      </div>
   )
}
export default UserInfoTab;
