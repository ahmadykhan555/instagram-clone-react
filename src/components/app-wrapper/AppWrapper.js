import React from "react";
import "./AppWrapper.scss";
import AppHeader from "../app-header/AppHeader";
import PostsWrapper from "../posts-wrapper/PostsWrapper";
import ProfileSideSection from "../profile-side-section/ProfileSideSection";
import { auth } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
const AppWrapper = () => {
  const [appUser, setAppUser] = useState(null);
  const [username, setUsername] = useState("");

  // load user
  useEffect(() => loadUser(), []);
  const loadUser = () => {
    auth.onAuthStateChanged(loggedInUser => {
      if (loggedInUser) {
        if (!loggedInUser.displayName) {
          loggedInUser.updateProfile({
            displayName: "Some User"
          });
        }
        setAppUser(loggedInUser);
      } else {
        setAppUser(null);
      }
    });
  };
  return (
    <div className="app">
      <AppHeader appUser={appUser} setUsername={setUsername}></AppHeader>
      <div className="app__content">
        <PostsWrapper appUser={appUser}></PostsWrapper>
        <ProfileSideSection></ProfileSideSection>
      </div>
    </div>
  );
};

export default AppWrapper;
