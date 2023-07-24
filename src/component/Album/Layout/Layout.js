import React, { useEffect, useState } from "react";
import classes from "./Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { requestingAlbum, requestingSingleAlbum, searchPhotoHandler } from "../redux/AlbumAction";
import { useLocation, useNavigate } from "react-router-dom";
import Photo from "../Photo/Photo";
import SearchBar from "../../../utility/SearchBar/SearchBar";
import Error404 from "../../Error404/Error404";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.album.loading);
  const singleAlbum = useSelector((state) => state.album.singleAlbum);
  const renderSingleAlbum = useSelector(state => state.album.renderSingleAlbum)
  const albums = useSelector((state) => state.album.albums);
  const albumId = location.pathname.split("/")[2];
  const [isValid , setIsValid] = useState(true)
  let albumTitle = null;

  if ( albumId >= 1 && albumId <= 100 && !loading && albums.length != 0) {
    albumTitle = albums[Math.floor((albumId - 1) / 10)][(albumId - 1) % 10].title;
  }

  useEffect(() => {
    dispatch(requestingAlbum());

    if(albumId >= 1 && albumId <= 100)
      dispatch(requestingSingleAlbum(albumId));
    else setIsValid(false);

  }, [location]);

  const prevHandler = () => {
    let albumId = Number(location.pathname.split("/")[2]);

    if (albumId > 1) {
      albumId--;
      navigate("/album/" + albumId);
    }
  };

  const nextHandler = () => {
    let albumId = Number(location.pathname.split("/")[2]);

    if (albumId < 100) {
      albumId++;
      navigate("/album/" + albumId);
    }
  };

  return isValid ? (<div className={classes.mainContainer}>
    <SearchBar
      placeholder="Search by photo title..."
      searchResultHandler={(val) => dispatch(searchPhotoHandler(val, singleAlbum))}
    />
    <div className={classes.postButtonContainer}>
      <span onClick={() => prevHandler()}>{"< "} Prev</span>
      <span>
        <strong>Album {albumId} </strong>: {albumTitle}
      </span>
      <span onClick={() => nextHandler()}>Next {">"}</span>
    </div>

    
    <div className={classes.photoContainer}>
      {renderSingleAlbum &&
        renderSingleAlbum.map((photo, i) => {
          return <Photo photoData={photo} key={i} />;
        })}
    </div>
  </div>) : <Error404/>
}

export default Layout;
