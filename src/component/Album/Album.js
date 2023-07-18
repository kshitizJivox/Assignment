import React, { useEffect } from 'react'
import classes from './Album.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { requestingAlbum } from './redux/AlbumAction';
import AlbumHolder from './AlbumHolder';

function Album() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.album.loading)
  const albumsPerPage = 10;
  
  useEffect(() => {
    dispatch(requestingAlbum(albumsPerPage))
  }, [])
  return (
    <div className={classes.mainContainer}>
      { !loading && <AlbumHolder albumsPerPage={albumsPerPage}/> }
    </div>
  )
}

export default Album