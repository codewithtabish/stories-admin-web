"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/config/firebase";
import { ThumbsUp } from "lucide-react";
import fetchStories from "@/utils/fetchStories";
import { useToast } from "../ui/use-toast";

const StoryLikes = ({ users: allUsers, story }: any) => {
  const [user, setUser] = useState<any>(null);
  const [userLoader, setuserLoader] = useState<any>(true);
  const [isUpdated, setisUpdated] = useState<any>(false);
  const [liveData, setliveData] = useState<any>();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setuserLoader(false);
        console.log("User ID:", user.uid); // Accessing user ID here
      } else {
        setUser(null);
        setuserLoader(false);
      }
    });
    getSingleStory();

    return () => unsubscribe();
  }, [isUpdated]);

  const getSingleStory = async () => {
    const data = await fetchStories.fetchSingleStory(story.storyID);
    setliveData(data);
    console.log("data", data);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      console.log("User ID:", user.uid); // Accessing user ID after login
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const likeStory = async () => {
    const data = await fetchStories.likeStory(story.storyID, user.uid);
    setisUpdated(data?.liked);
    toast({
      title: `${liveData.title}`,
      description: "liked the story",
    });
  };

  const dislikeStory = async () => {
    const data = await fetchStories.unlikeStory(story.storyID, user.uid);
    setisUpdated(data?.removed);
    toast({
      title: `${liveData.title}`,
      description: "unliked the story",
    });
  };

  return (
    <div>
      {!userLoader && (
        <div className="flex flex-row gap-1 items-center">
          {user ? (
            liveData?.users?.find((item: any) => item === user.uid) ? (
              <ThumbsUp
                className="h-8 w-8 text-orange-800 cursor-pointer"
                onClick={dislikeStory}
              />
            ) : (
              <ThumbsUp
                className="h-8 w-8 cursor-pointer"
                onClick={likeStory}
              />
            )
          ) : (
            <button onClick={handleGoogleLogin}>Login with Google</button>
          )}
          <span>{liveData?.users?.length}</span>
        </div>
      )}
    </div>
  );
};

export default StoryLikes;
