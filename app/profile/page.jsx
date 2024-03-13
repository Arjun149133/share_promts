"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete?");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const updatedPosts = posts.filter((p) => p._id !== post._id);
          setPosts(updatedPosts);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // Fetch prompts
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  return (
    <>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Page;
