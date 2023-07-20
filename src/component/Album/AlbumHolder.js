import React from "react";
import classes from "./AlbumHolder.module.css";
import ContentHolder from "../../utility/contentHolder/ContentHolder";
import { useDispatch, useSelector } from "react-redux";

function AlbumHolder({ albumsPerPage }) {
  const toBeRenderedAlbums = useSelector(
    (state) => state.album.toBeRenderedAlbums
  );

  return (
    <div className={classes.mainContainer}>
      <ContentHolder content={toBeRenderedAlbums} type={2}/>
    </div>
  );
}

export default AlbumHolder;
