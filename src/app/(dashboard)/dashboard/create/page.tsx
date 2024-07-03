"use client";
import Link from "next/link";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  User2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import fetchStories from "@/utils/fetchStories";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import ReactEditor from "@/components/stories/ReactEditor";
import { useRouter } from "next/navigation";

export default function StoryCreateScreen() {
  const [collections, setCollections] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    getAllCollections();
  }, []);

  const getAllCollections = async () => {
    const data = await fetchStories.fetchStories();
    setCollections(data);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({
      ...formData,
      //   @ts-ignore
      image: file,
    });
  };

  const handleStory = async () => {
    const { title, content, category, image } = formData;

    if (!title || !category || !image || !value) {
      toast({
        title: "All fields are required",
        description: "Please fill in all fields.",
      });
      return;
    }

    setLoading(true);

    try {
      // Convert image to base64 string
      const imageBase64 = await convertImageToBase64(image);

      const stringContent = stripHtmlTags(value);

      // Firestore data structure
      const storyData = {
        title,
        content: stringContent,
        storyType: category,
        imageUrl: imageBase64,
        createdAt: new Date(),
        users: [], // Initialize users field as an empty array
      };

      // Create story in Firestore
      const storyId = await fetchStories.createStory(storyData);

      // Reset form
      setFormData({
        title: "",
        content: "",
        category: "",
        image: null,
      });
      setValue(" ");
      router.push("/dashboard/stories");
      toast({
        title: "Story created successfully",
        // description: `Story ID: ${storyId}`,/
      });
    } catch (e: any) {
      toast({
        title: "Error creating story",
        description: e.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to convert image to base64
  const convertImageToBase64 = (imageFile: File | null): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!imageFile) {
        reject("No image file provided");
      }

      const reader = new FileReader();
      reader.readAsDataURL(imageFile!!);
      reader.onload = () => {
        const base64String = reader.result?.toString();
        resolve(base64String || "");
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const hanldeChangeEditoe = (a: string) => {
    setValue(a);
    console.log(a);
  };

  const stripHtmlTags = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-14 py-4 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {/* Header content */}
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            {/* Navigation links */}
          </nav>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Story Name</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input
                    placeholder="Story title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />

                  <div className="my-4">
                    <Label htmlFor="message" className="sr-only">
                      Message
                    </Label>
                    {/* <Textarea
                      id="message"
                      placeholder="Type your story content here..."
                      className="min-h-[200px] resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                    /> */}
                  </div>
                  <div className="my-4">
                    <ReactEditor value={value} onChange={hanldeChangeEditoe} />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      name="category"
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          category: value,
                        }))
                      }
                    >
                      <SelectTrigger id="category" aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {collections?.map((item: any, index: number) => (
                          <SelectItem value={item?.storyType} key={index}>
                            {item?.storyType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="my-4">
                    <Input
                      placeholder="Story image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleStory} disabled={loading}>
                  {loading ? (
                    <div className="flex items-center">
                      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    "Save"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
