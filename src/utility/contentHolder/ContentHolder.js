import classes from "./ContentHolder.module.css";
import Post from "../../component/Homepage/Post/Post";
import Photo from "../../component/Album/Photo/Photo";

function ContentHolder({ content, type }) {
  return (
    <div className={classes.mainContainer}>
      {content.map((content, i) => {
        return type == 1 ? (
          <Post key={i} postData={content} />
        ) : (
          <Photo key={i} photoData={content} />
        );
      })}
    </div>
  );
}

export default ContentHolder;
