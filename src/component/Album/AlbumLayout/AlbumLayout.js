import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserPhoto from "../../../assets/userPhoto.jpeg";
import classes from "./AlbumLayout.module.css";

function AlbumLayout({ albumData }) {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const users = res.data;
      users.map((user) => {
        if (user.id == albumData[0].userId) {
          setUserData(user);
        }
      });
    });
  }, [albumData]);

  const navigateHandler = (id) => {
    navigate("/album/" + id)
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.userDataContainer}>
        <img src={UserPhoto} />
        <div>
          <p>{userData.username}</p>
          <p>{userData.email}</p>
        </div>
      </div>
      <div className={classes.albumContainer}>
        <h4>Album :</h4>
        <ul className={classes.album}>
          {albumData.map((album, i) => {
            return <li key={i} onClick={() => navigateHandler(album.id)}>{album.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default AlbumLayout;
