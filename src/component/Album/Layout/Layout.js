import React, { useEffect, useState } from "react";
import classes from "./Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  requestingAlbum,
  requestingAlbumPhotos,
  searchPhotoHandler,
} from "../redux/AlbumAction";
import { useLocation, useNavigate } from "react-router-dom";
import Photo from "../Photo/Photo";
import SearchBar from "../../../utility/SearchBar/SearchBar";
import Error404 from "../../Error404/Error404";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.album.loading);
  const albums = useSelector((state) => state.album.albums);
  const albumPhoto = useSelector((state) => state.album.albumPhoto);
  const albumPhotoPool = useSelector((state) => state.album.albumPhotoPool);

  const albumId = location.pathname.split("/")[2];
  const userData = JSON.parse(localStorage.getItem("userData"));
  const albumRange = [
    (Number(userData.id) - 1) * 10 + 1,
    Number(userData.id) * 10,
  ];
  const [isValid, setIsValid] = useState(true);
  let albumTitle = null;

  if (!loading && albums.length) {
    albumTitle = albums[(albumId - 1) % 10].title;
  }

  useEffect(() => {
    if (albumId >= albumRange[0] && albumId <= albumRange[1]) {
      dispatch(requestingAlbum(userData.id));
      dispatch(requestingAlbumPhotos(albumId));
    } else setIsValid(false);
  }, [location]);

  const prevHandler = () => {
    let id = Number(albumId);

    if (albumId > albumRange[0]) {
      id--;
      navigate("/album/" + id);
    }
  };

  const nextHandler = () => {
    let id = Number(albumId);

    if (albumId < albumRange[1]) {
      id++;
      navigate("/album/" + id);
    }
  };

  return isValid ? (
    <div className={classes.mainContainer}>
      <SearchBar
        placeholder="Search by photo title..."
        searchResultHandler={(val) =>
          dispatch(searchPhotoHandler(val, albumPhotoPool))
        }
      />
      <div className={classes.postButtonContainer}>
        <span onClick={() => prevHandler()}>{"< "} Prev</span>
        <span>
          <strong>Album {albumId} </strong>: {albumTitle}
        </span>
        <span onClick={() => nextHandler()}>Next {">"}</span>
      </div>

      <div className={classes.photoContainer}>
        {albumPhoto.map((photo, i) => {
          return <Photo photoData={photo} key={i} />;
        })}
      </div>
    </div>
  ) : (
    <Error404 />
  );
}

export default Layout;
