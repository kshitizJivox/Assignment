import React from "react";
import classes from "./Photo.module.css";
import { useNavigate } from "react-router-dom";

function Photo({ photoData }) {
  const navigate = useNavigate();
  const photo = photoData[0];

  const photoClickHandler = () => {
    console.log("[Naviagte to Album]", photo.albumId);
  }

  return (
    <div className={classes.mainContainer} onClick={() => photoClickHandler()}>
      <img src={photo.url} />
      <div className={classes.photoDetails}>
        <h5>{photo.title}</h5>
        <div>
          <span>Album id : {photo.albumId}</span>
          <span>Photo id : {photo.id}</span>
        </div>
      </div>
    </div>
  );
}

export default Photo;
