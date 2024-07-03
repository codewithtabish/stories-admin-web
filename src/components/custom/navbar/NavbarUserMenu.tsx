import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { auth } from "@/config/firebase";
import { User } from "lucide-react";
import Link from "next/link";

import React from "react";

const NavbarUserMenu = ({ userData }: any) => {
  // React.useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser(user);
  //       setuserLoader(false);
  //       console.log("User ID:", user.uid); // Accessing user ID here
  //     } else {
  //       setUser(null);
  //       setuserLoader(false);
  //     }
  //   });
  //   getSingleStory();

  //   return () => unsubscribe();
  // }, [isUpdated]);
  return (
    <div className="bg-gray-800">
      <MenubarMenu>
        <MenubarTrigger>
          <User className="w-8 h-8" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          {userData?.reloadUserInfo?.email == "nmailer820@gmail.com" ? (
            <MenubarItem>
              <Link href={"/dashboard"}>
                <span>dashboard</span>
              </Link>
            </MenubarItem>
          ) : null}
        </MenubarContent>
      </MenubarMenu>
    </div>
  );
};

export default NavbarUserMenu;
