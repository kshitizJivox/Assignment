import React, { useEffect } from "react";
import classes from "./Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { requestingAlbum, requestingSingleAlbum } from "../redux/AlbumAction";
import { useLocation, useNavigate } from "react-router-dom";
import Photo from "../Photo/Photo";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.album.loading);
  const singleAlbum = useSelector((state) => state.album.singleAlbum);
  const albums = useSelector((state) => state.album.albums);
  const albumId = location.pathname.split("/")[2];
  let albumTitle = null;

  if (!loading && albums.length != 0) {
    albumTitle = albums[Math.floor((albumId - 1) / 10)][(albumId - 1) % 10].title;
  }

  useEffect(() => {
    dispatch(requestingAlbum());
    dispatch(requestingSingleAlbum(albumId));
    // if (!loading && albums.length != 0) {
    //   console.log(albums);
    //   albumTitle = albums[Math.floor((albumId - 1) / 10)][(albumId - 1) % 10].title;
    //   console.log(albumTitle);
    // }
  
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

  return (
    <div className={classes.mainContainer}>
      <div className={classes.postButtonContainer}>
        <span onClick={() => prevHandler()}>{"< "} Prev</span>
        <span>
          <strong>Album {albumId} </strong>: {albumTitle}
        </span>
        <span onClick={() => nextHandler()}>Next {">"}</span>
      </div>
      <div className={classes.photoContainer}>
        {singleAlbum &&
          singleAlbum.map((photo, i) => {
            return <Photo photoData={photo} key={i} />;
          })}
      </div>
    </div>
  );
}

export default Layout;
