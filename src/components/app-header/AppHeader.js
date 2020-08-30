import React from "react";
import "./AppHeader.scss";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Button, makeStyles, Input } from "@material-ui/core";
import { auth } from "../../firebase";
import { useState } from "react";
import AppModal from "../app-modal/AppModal";
import ImageUploader from "../image-uploader/ImageUploader";

const AppHeader = ({ appUser, setUser }) => {
  const [openAddPostModal, setOpenAddPostModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const renderAddPostModal = () => {
    const body = (
      <div>
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
        <ImageUploader
          username={appUser && appUser.displayName ? appUser.displayName : ""}
        ></ImageUploader>
      </div>
    );
    return (
      <AppModal
        open={openAddPostModal}
        modalBody={body}
        handleClose={() => setOpenAddPostModal(false)}
      ></AppModal>
    );
  };
  const renderLoginModal = () => {
    const body = (
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
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></Input>
        <Button onClick={handleLogin}>Sign In</Button>
      </form>
    );
    return (
      <AppModal
        modalBody={body}
        open={openLoginModal}
        handleClose={() => setOpenLoginModal(false)}
      ></AppModal>
    );
  };

  const handleLogin = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log("logged in with user", user);
        setUser(username);
      })
      .catch(err => console.error(err));
  };
  return (
    <div className="app__header">
      <img
        className="app__header__image"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
      />

      <div className="app-actions">
        {appUser && appUser.displayName && (
          <AddCircleIcon
            className="add-post"
            onClick={() => setOpenAddPostModal(true)}
          ></AddCircleIcon>
        )}
        {appUser ? (
          <Button onClick={() => auth.signOut()}>Log out</Button>
        ) : (
          <Button onClick={() => setOpenLoginModal(true)}>Login</Button>
        )}
      </div>

      {/* Header Modals */}
      {renderAddPostModal()}
      {renderLoginModal()}
    </div>
  );
};

export default AppHeader;
