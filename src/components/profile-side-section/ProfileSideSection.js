import React from "react";
import "./ProfileSideSection.scss";
import InstagramEmbed from "react-instagram-embed";
const ProfileSideSection = () => {
  return (
    <div className="profile-side-section">
      <InstagramEmbed
        url="https://www.instagram.com/p/BceifeCn5ia/"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
    </div>
  );
};
export default ProfileSideSection;
