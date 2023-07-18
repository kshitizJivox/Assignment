import ReactPaginate from "react-paginate";
import React, {
  useEffect,
  useState
} from "react";
import classes from './pagination.module.css'
import ContentHolder from "../../utility/contentHolder/ContentHolder";
import { useDispatch, useSelector } from "react-redux";
import { paginatedPostsHandler } from "./redux/HomepageAction";

function PaginatedPosts({ postsPerPage }) {
  const [pageCount, setPageCount] = useState(10);

  const paginatePost = useSelector((state) => state.homepage.paginatePost);
  const toBeRenderedPosts = useSelector((state) => state.homepage.toBeRenderedPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    setPageCount(Math.ceil(paginatePost.length/ postsPerPage));
    dispatch(paginatedPostsHandler(0, postsPerPage))
  }, [paginatePost]);

  const handlePageClick = (event) => {
    const start = event.selected * postsPerPage;
    const end = start + postsPerPage;
    dispatch(paginatedPostsHandler(start, end))
  };

  return (
    <div className={classes.mainContainer}>
      <ContentHolder content={toBeRenderedPosts} type={1}/>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        nextLabel=">"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default PaginatedPosts