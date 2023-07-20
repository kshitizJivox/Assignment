import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import classes from "./AlbumHolder.module.css";
import ContentHolder from "../../utility/contentHolder/ContentHolder";
import { useDispatch, useSelector } from "react-redux";
import { requestingAlbum } from "./redux/AlbumAction";

function AlbumHolder({ albumsPerPage }) {
  const toBeRenderedAlbums = useSelector(
    (state) => state.album.toBeRenderedAlbums
  );

  return (
    <div className={classes.mainContainer}>
      <ContentHolder content={toBeRenderedAlbums} />
    </div>
  );
}

export default AlbumHolder;
