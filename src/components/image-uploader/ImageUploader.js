import React from "react";
import "./ImageUploader.scss";
import { Button, LinearProgress, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { storage, db } from "../../firebase";
import firebase from "firebase";

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

const ImageUploader = ({ username }) => {
  const classes = useStyles();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = event => {
    const file = event.target.files[0];
    setImage(file);
  };
  const handleUploadCTA = () => {
    // configure firestore storage
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress logic
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        // show error
      },
      () => {
        // complete function
        storage
          .ref("/images")
          .child(image.name)
          .getDownloadURL()
          .then(imgUrl => {
            db.collection("posts").add({
              caption,
              imgUrl,
              timestamp: +new Date(),
              username,
              userImgUrl: imgUrl,
              likes: 0
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="image-uploader-component">
      <input
        type="text"
        value={caption}
        placeholder="Enter a caption.."
        onChange={event => setCaption(event.target.value)}
      ></input>
      <input type="file" onChange={handleUpload}></input>
      <Button onClick={handleUploadCTA} disabled={!image}>
        Upload
      </Button>
      <progress value={progress} max={100}></progress>
    </div>
  );
};

export default ImageUploader;
