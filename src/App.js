import React, { useState } from "react";
import "./App.scss";
import Post from "./components/post/post";
import { useEffect } from "react";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";
import ImageUploader from "./components/image-uploader/ImageUploader";

import AppHeader from "./components/app-header/AppHeader";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const App = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUploader, setOpenUploader] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignIn = event => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        return user.user.updateProfile({
          displayName: username
        });
      })
      .catch(err => alert(err));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        setUser(user); // cookie tracking!
        if (user.displayName) {
        } else {
          return user.updateProfile({ displayName: username });
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setPosts(
          snapshot.docs.map(doc => {
            const { caption, imgUrl, username, userImgUrl } = doc.data();
            const id = doc.id;
            return {
              caption,
              imgUrl,
              username,
              id,
              userImgUrl
            };
          })
        );
      });
  }, []);

  const renderUploadModal = () => {
    return (
      <Modal
        open={openUploader}
        onClose={() => setOpenUploader(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <ImageUploader
            username={user && user.displayName ? user.displayName : ""}
          ></ImageUploader>
        </div>
      </Modal>
    );
  };
  const renderModal = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="insta-modal-body">
            <img
              className="app__header__image"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
            <form>
              <Input
                placeholder="username"
                className="user-input"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              ></Input>
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Input>
              <Input
                placeholder="password"
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
              ></Input>
              <Button onClick={handleSignIn}>Sign In</Button>
            </form>
          </div>
        </div>
      </Modal>
    );
  };
  return (
    <div className="app">
      {/* Sticky Header */}
      <AppHeader
        user={user}
        setOpenUploader={setOpenUploader}
        auth={auth}
        open={open}
        setOpen={setOpen}
      ></AppHeader>
      {renderModal()}
      {renderUploadModal()}
      <div className="app__posts-container">
        {posts.map(post => (
          <Post
            key={post.id}
            username={post.username}
            imgUrl={post.imgUrl}
            userImgUrl={post.userImgUrl}
            caption={post.caption}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
