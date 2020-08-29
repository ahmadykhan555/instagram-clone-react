import React from "react";
import "./AppHeader.scss";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Button } from "@material-ui/core";
const AppHeader = ({ user, setOpenUploader, auth, setOpen, open }) => {
  return (
    <div className="app__header">
      <img
        className="app__header__image"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
      />

      <div className="app-actions">
        {user && user.displayName && (
          <AddCircleIcon
            className="add-post"
            onClick={() => setOpenUploader(true)}
          ></AddCircleIcon>
        )}
        {user ? (
          <Button onClick={() => auth.signOut()}>Log out</Button>
        ) : (
          <Button onClick={() => setOpen(!open)}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
