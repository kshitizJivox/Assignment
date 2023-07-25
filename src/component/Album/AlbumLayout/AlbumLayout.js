import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../utility/card/card";

import classes from "./AlbumLayout.module.css";

function AlbumLayout({ albumData }) {
  const navigate = useNavigate();

  const navigateHandler = (id) => {
    navigate("/album/" + id);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.cardContainer}>
        {albumData.map((album, i) => {
          return (
            <Card
              key={i}
              albumData={album}
              navigateHandler={() => navigateHandler(album.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AlbumLayout;
