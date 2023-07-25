import React, { useEffect } from "react";
import classes from "./Album.module.css";
import { useDispatch, useSelector } from "react-redux";
import { requestingAlbum, searchAlbumHandler } from "./redux/AlbumAction";
import SearchBar from '../../utility/SearchBar/SearchBar'
import AlbumLayout from "./AlbumLayout/AlbumLayout";

function Album() {
  const albums = useSelector((state) => state.album.albums);
  const albumsPool = useSelector((state) => state.album.albumsPool);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestingAlbum(userData.id));
  }, []);

  return (
    <div className={classes.mainContainer}>
      <SearchBar
        placeholder="Search by album title..."
        searchResultHandler={(val) => dispatch(searchAlbumHandler(val, albumsPool))}
      />
      <AlbumLayout albumData={albums} userData={userData}/>
    </div>
  );
}

export default Album;
