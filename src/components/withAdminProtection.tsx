"use client";
import { useEffect, ComponentType, useState } from "react";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import fetchStories from "@/utils/fetchStories";

const withAdminProtection = (WrappedComponent: ComponentType<any>) => {
  const ProtectedComponent = (props: any) => {
    const router = useRouter();
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUserData(user);
          // @ts-ignore
          await getAllUsers(user?.email);
        } else {
          router.push("/");
          toast({
            title: "You need to be logged in to view this page.",
          });
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    useEffect(() => {
      if (userData && selectedUser) {
        const isGoogleLogin = userData.providerData.some(
          (provider: any) => provider.providerId === "google.com"
        );
        const isFacebookLogin = userData.providerData.some(
          (provider: any) => provider.providerId === "facebook.com"
        );

        if (!selectedUser?.isAdmin || (!isGoogleLogin && !isFacebookLogin)) {
          router.push("/");
          toast({
            title: "You are not authorized to view this page.",
          });
        }
      }
    }, [selectedUser, userData, router]);

    const getAllUsers = async (email: string) => {
      const data = await fetchStories.fetchUsers();
      const currentUser = data.find((u: any) => u.email === email);
      setSelectedUser(currentUser);
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  ProtectedComponent.displayName = `withAdminProtection(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ProtectedComponent;
};

export default withAdminProtection;
