import React, { useState } from "react";
import "./PostsWrapper.scss";
import { db } from "../../firebase";
import Post from "../post/post";
import { useEffect } from "react";
const PostsWrapper = ({ appUser }) => {
  const COLLECTION_POSTS = "posts";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  //   Load Posts
  useEffect(() => {
    loadPosts();
  }, []);
  const loadPosts = () => {
    db.collection(COLLECTION_POSTS).onSnapshot(snapShot => {
      setPosts(
        snapShot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };
  return (
    <div className="posts-wrapper">
      {posts.map(post => (
        <Post post={post} appUser={appUser} key={post.id}></Post>
      ))}
    </div>
  );
};
export default PostsWrapper;
