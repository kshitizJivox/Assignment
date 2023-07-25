import classes from "./ContentHolder.module.css";
import Post from "../../component/Homepage/Post/Post";

function ContentHolder({ content, type }) {
  return (
    <div className={classes.mainContainer}>
      {content.map((content, i) => {
        switch (type) {
          case 1:
            return <Post key={i} postData={content} />;
        }
      })}
    </div>
  );
}

export default ContentHolder;
