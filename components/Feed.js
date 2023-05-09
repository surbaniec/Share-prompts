'use client';

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
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
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filterPrompts = () => {
    const newPosts = posts.filter(
      (post) =>
        post.prompt.includes(searchText) ||
        post.tag.includes(searchText) ||
        post.creator.username.includes(searchText)
    );

    setFilteredPosts(newPosts);
  };

  const fetchPosts = async () => {
    const res = await fetch('/api/prompt');
    const data = await res.json();
    setPosts(data);
    setFilteredPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPrompts();
  }, [searchText]);

  return (
    <section className='feed'>
      <form
        className='relative w-full flex-center'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearch}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={setSearchText} />
    </section>
  );
};

export default Feed;
