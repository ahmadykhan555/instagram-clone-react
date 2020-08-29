import React, { useState, useEffect } from "react";
import "./post.scss";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { db } from "../../firebase";
import { Button } from "@material-ui/core";

const Post = ({
  userImgUrl,
  imgUrl,
  username,
  caption,
  likes,
  postId,
  signedInUser,
  location
}) => {
  const [likesCount, setLikesCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const postComment = event => {
    event.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        username: signedInUser.displayName,
        text: comment,
        timestamp: +new Date()
      });
    setComment("");
  };

  const handlePostLike = () => {
    if (!liked) {
      setLikesCount(likesCount + 1);
      setLiked(true);
    } else {
      setLikesCount(likesCount - 1);
      setLiked(false);
    }
  };

  useEffect(() => {
    updatePost();
  }, [likesCount]);

  const updatePost = () => {
    db.collection("posts")
      .doc(postId)
      .update({ likes: likesCount })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp")
        .onSnapshot(snapshot => {
          const postComments = snapshot.docs.map(doc => doc.data());
          setComments(postComments);
        });
    }
  }, []);

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" src={userImgUrl} alt={username} />
        <div className="user-details">
          <h5 className="user-details__username">{username}</h5>
          <h6 className="user-details__location">{location}</h6>
        </div>
        <div className="post__actions">
          <MoreHorizIcon></MoreHorizIcon>
        </div>
      </div>
      <img className="post__img" src={imgUrl} alt="" />
      <div className="post__interact">
        <div className="post__interact--left">
          {liked ? (
            <FavoriteIcon onClick={handlePostLike}></FavoriteIcon>
          ) : (
            <FavoriteBorderIcon onClick={handlePostLike}></FavoriteBorderIcon>
          )}
          <ModeCommentOutlinedIcon></ModeCommentOutlinedIcon>
          <SendOutlinedIcon></SendOutlinedIcon>
        </div>
        <div className="post__interact--right">
          <TurnedInNotOutlinedIcon></TurnedInNotOutlinedIcon>
        </div>
      </div>
      <h5 className="post__likes-count">
        {likesCount < 0 ? 0 : likesCount} likes
      </h5>
      <h5 className="post__text">
        <strong>{username}</strong> {caption}
      </h5>
      {comments.length > 0 && (
        <div className="post-comments">
          {comments.map(comment => (
            <h5 className="post-comment">
              <strong>{comment.username}</strong> {comment.text}
            </h5>
          ))}
        </div>
      )}
      <div>
        <form className="post__comment-box">
          <input
            type="text"
            className="post__comment-input"
            placeholder="Add a comment..."
            value={comment}
            onChange={event => setComment(event.target.value)}
          ></input>
          <Button onClick={postComment} disabled={!signedInUser || !comment}>
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Post;
