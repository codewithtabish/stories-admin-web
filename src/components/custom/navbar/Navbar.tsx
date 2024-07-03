"use client";
import { useState, useEffect } from "react";
import {
  CirclePlus,
  CircleUser,
  Loader,
  LogIn,
  LogOut,
  Moon,
  StickyNote,
  SunMoon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";
import { auth, firestore, googleProvider } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavbarUserMenu from "./NavbarUserMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { collection } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import fetchStories from "@/utils/fetchStories";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [userData, setuserData] = useState<any>();
  const [error, setError] = useState(null);
  const [checkingUser, setcheckingUser] = useState<boolean>(true);
  const [allUsers, setallUsers] = useState<any>();
  const [selectedUser, setselectedUser] = useState<any>();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setuserData(user);
        setIsLoggedIn(true);
        setcheckingUser(false);
      } else {
        // No user is signed in
        setcheckingUser(false);

        setIsLoggedIn(false);
      }
    });
    getAllUsers();

    // Clean up subscription
    return () => unsubscribe();
  }, [isLoggedIn]);

  const getAllUsers = async () => {
    const data = await fetchStories.fetchUsers();
    // @ts-ignore
    const user = data.find((u) => u?.email === userData?.email);
    setselectedUser(user);
    setallUsers(data);
  };

  const handleThemes = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setuserData(null);
      router.push("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  if (checkingUser) {
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      if (user) {
        setIsLoggedIn(true);
        setuserData(user);
        // Add a new document in collection "cities"
        // Store user data in Firestore
        await setDoc(doc(firestore, "users", user.uid), {
          displayName: user.displayName,
          photoURL: user.photoURL,
          online: true,
          email: user.email,
          lastSeen: new Date(),
          isAdmin: false,
          // @ts-ignore
          // lastSeen: Timestamp.now(), // Store as Firestore Timestamp
        });
        toast({
          title: "login successfully 💞💞",
        });

        router.push("/");
      }
      //   console.log("Google login successful:", user);
    } catch (error: any) {
      setError(error.message);
    }
  };

  console.log(selectedUser);

  return (
    <div className="flex  justify-between items-center lg:px-0 md:px-5 py-8">
      <div>
        <Image src={"/logo.svg"} alt="logo image" width={80} height={80} />
      </div>

      <div className="flex flex-row gap-4 items-center">
        <Link href={"/"}>
          <span className="">Home</span>
        </Link>
        <Link href={"/recent"}>
          <span className="t">NewStories</span>
        </Link>
        <Link href={"/categories"}>
          <span className="">Categories</span>
        </Link>
        {userData && <p>{userData?.displayName}</p>}
      </div>

      <div className="flex flex-row gap-6 items-center">
        {theme == "dark" ? (
          <SunMoon className="w-8 h-8 cursor-pointer" onClick={handleThemes} />
        ) : (
          <Moon className="w-8 h-8 cursor-pointer" onClick={handleThemes} />
        )}
        {/* <Moon className="w-8 h-8 cursor-pointer" onClick={handleThemes} /> */}
        {!checkingUser ? (
          <div>
            {userData ? (
              <div className="cursor-pointer">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    {selectedUser?.isAdmin && (
                      <DropdownMenuItem>
                        <Link href={"/dashboard"}>
                          <DropdownMenuItem className="cursor-pointer ">
                            Dashboard
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <LogIn
                className="w-8 h-8 cursor-pointer "
                onClick={handleGoogleLogin}
              />
            )}
          </div>
        ) : (
          <div>
            <Loader className="animate-spin w-8 h-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
