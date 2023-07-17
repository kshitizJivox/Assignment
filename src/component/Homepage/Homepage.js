import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Homepage.module.css";
import SearchBar from "../../utility/SearchBar/SearchBar";
import { requestingPosts, searchHandler } from "./redux/HomepageAction";
import PaginatedPosts from "./pagination";

function Homepage() {
  const posts = useSelector((state) => state.homepage.posts);
  const loading = useSelector((state) => state.homepage.loading);
  const dispatch = useDispatch();
  const postsPerPage = 10;

  useEffect(() => {
    dispatch(requestingPosts(postsPerPage));
  }, []);

  return (
    <div className={classes.mainContainer}>
      <SearchBar
        placeholder="Search by title..."
        searchResultHandler={(val) => dispatch(searchHandler(val, posts))}
      />
      {!loading && <PaginatedPosts postsPerPage={postsPerPage} />}
    </div>
  );
}

export default Homepage;
