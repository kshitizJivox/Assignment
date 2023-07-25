import React, { useEffect, useState } from "react";
import classes from "./card.module.css";
import axios from "axios";

export const Card = ({ albumData, navigateHandler }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const basePhotoId = (Number(userData.id) - 1) * 500;
    const offset = (((Number(albumData.id) - 1) % 10) + 1 - 1) * 50 + 1;

    axios.get(`https://jsonplaceholder.typicode.com/photos/${basePhotoId + offset}`)
    .then(res => setPhotoUrl(res.data.url))
  }, []);

  return (
    <div className={classes.mainContainer} onClick={navigateHandler}>
      { photoUrl.length != 0 && <img src={photoUrl} alt="" /> }
      <div className={classes.titleContainer}>
        <p>{albumData.title}</p>
      </div>
    </div>
  );
};
