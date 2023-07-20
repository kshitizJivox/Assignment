import React, { useEffect } from 'react'
import classes from './Layout.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { requestingSingleAlbum } from '../redux/AlbumAction';
import { useLocation, useNavigate } from 'react-router-dom';
import Photo from '../Photo/Photo';

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const singleAlbum = useSelector(state => state.album.singleAlbum);
  const albumId = location.pathname.split("/")[2]

  useEffect(() => {
    dispatch(requestingSingleAlbum(albumId));
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
          <span><strong>Album {albumId}</strong></span>
          <span onClick={() => nextHandler()}>Next {">"}</span>
        </div>
      <div className={classes.photoContainer}>
      { singleAlbum && singleAlbum.map((photo, i) => {
        return <Photo photoData={photo} key={i}/>
      }) }
      </div>
      
    </div>
  )
}

export default Layout