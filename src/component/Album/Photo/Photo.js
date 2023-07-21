import React from "react";
import classes from "./Photo.module.css";

function Photo({ photoData }) {
  const photo = photoData;

  return (
    <div className={classes.mainContainer}>
      <img src={photo.url} loading="lazy"/>
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
