import React from "react";
import classes from "./AlbumHolder.module.css";
import ContentHolder from "../../utility/contentHolder/ContentHolder";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../utility/SearchBar/SearchBar";
import { searchHandler } from "./redux/AlbumAction";

function AlbumHolder() {
  const dispatch = useDispatch();
  const toBeRenderedAlbums = useSelector(
    (state) => state.album.toBeRenderedAlbums
  );
  const albums = useSelector((state) => state.album.albums);

  return (
    <div className={classes.mainContainer}>
      <SearchBar
        placeholder="Search by album title..."
        searchResultHandler={(val) => dispatch(searchHandler(val, albums))}
      />
      <ContentHolder content={toBeRenderedAlbums} type={2} />
    </div>
  );
}

export default AlbumHolder;
