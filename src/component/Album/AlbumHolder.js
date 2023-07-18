import ReactPaginate from "react-paginate";
import React, {
  useEffect,
  useState
} from "react";
import classes from './AlbumHolder.module.css'
import ContentHolder from "../../utility/contentHolder/ContentHolder";
import { useDispatch, useSelector } from "react-redux";
import { paginatedAlbumHandler } from "./redux/AlbumAction";

function AlbumHolder({ albumsPerPage }) {
  const [pageCount, setPageCount] = useState(0);

  const albumPool = useSelector((state) => state.album.albumPool);
  const toBeRenderedAlbums = useSelector((state) => state.album.toBeRenderedAlbums);
  const dispatch = useDispatch();

  useEffect(() => {
    albumPool && setPageCount(Math.ceil(albumPool.length/ albumsPerPage));
    dispatch(paginatedAlbumHandler(0, albumsPerPage))
  }, [albumPool]);

  return (
    <div className={classes.mainContainer}>
      <ContentHolder content={toBeRenderedAlbums} />
    </div>
  );
}

export default AlbumHolder