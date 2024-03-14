"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

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
        const res = await fetch(`/api/users/${userId}/posts`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) fetchPosts();
  }, [userId]);
  return (
    <>
      <Profile
        name={posts[0]?.creator.username || session?.user?.name}
        desc={`Welcome to ${
          posts[0]?.creator.username || session?.user?.name
        } profile page`}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Page;
