import React, { useEffect, useState } from "react";
import classes from "./Album.module.css";
import { useDispatch, useSelector } from "react-redux";
import { requestingAlbum } from "./redux/AlbumAction";
import AlbumHolder from "./AlbumHolder";

function Album() {
  const [startingAlbum, setStartingAlbum] = useState(0);
  const loading = useSelector((state) => state.album.loading);
  const albumsPerPage = 500;
  const dispatch = useDispatch();
  const toBeRenderedAlbums = useSelector(
    (state) => state.album.toBeRenderedAlbums
  );

  useEffect(() => {
    dispatch(requestingAlbum(0, albumsPerPage))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      // Calculate the scroll position relative to the document and viewport height
      const scrollPosition = scrollTop + clientHeight;
      const scrollThreshold = scrollHeight - 50; // Adjust the threshold as needed

      if (scrollPosition >= scrollThreshold) {
        // dispatch(requestingAlbum(startingAlbum + albumsPerPage, albumsPerPage));
        console.log(startingAlbum, toBeRenderedAlbums[toBeRenderedAlbums.length-1][49].id);
        // console.log("[Toberendered]", toBeRenderedAlbums);
      }
    };

    // Attach the scroll event listener to the window
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, startingAlbum, toBeRenderedAlbums]);

  return (
    <div className={classes.mainContainer}>
      {!loading && <AlbumHolder albumsPerPage={albumsPerPage} />}
    </div>
  );
}

export default Album;
