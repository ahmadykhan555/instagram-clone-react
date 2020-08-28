import React from "react";
import "./post.scss";
import Avatar from "@material-ui/core/Avatar";

const Post = ({ userImgUrl, imgUrl, username, caption }) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" src={userImgUrl} alt={username} />
        <h3>{username}</h3>
      </div>
      {/* header */}
      {/* image */}
      <img className="post__img" src={imgUrl} alt="" />
      {/* username + caption */}
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
};

export default Post;
