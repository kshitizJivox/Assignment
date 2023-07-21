import React, { useEffect } from "react";
import classes from "./Album.module.css";
import { useDispatch } from "react-redux";
import { requestingAlbum } from "./redux/AlbumAction";
import AlbumHolder from "./AlbumHolder";

function Album() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestingAlbum());
  }, []);

  return (
    <div className={classes.mainContainer}>
      <AlbumHolder />
    </div>
  );
}

export default Album;
