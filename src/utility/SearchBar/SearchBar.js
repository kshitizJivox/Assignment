import React, { useState } from "react";
import classes from "./SearchBar.module.css";
import { BiSearch } from "react-icons/bi";

function SearchBar({ placeholder, searchResultHandler }) {
  const [searchValue, setSearchValue] = useState("");

  const enterHandler = (e) => {
    if(e.code == "Enter")
      searchResultHandler(searchValue)
  };

  return (
    <div className={classes.searchContainer}>
      <div className={classes.inputContainer}>
        <input
          type="text"
          placeholder={placeholder}
          onKeyDown={(e) => enterHandler(e)}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <BiSearch onClick={() => searchResultHandler(searchValue)} />
      </div>
    </div>
  );
}

export default SearchBar;
