"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className=" mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch prompts
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResult = filterPosts(tag);
    setSearchResults(searchResult);
  };

  return (
    <section className="feed">
      <form className=" relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchResults.length > 0 ? searchResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
