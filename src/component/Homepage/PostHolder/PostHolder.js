import classes from "./PostHolder.module.css";
import Post from "./Post/Post";

function PostHolder({ posts }) {
  return (
    <div className={classes.mainContainer}>
      {posts.map((post, i) => {
        return <Post key={i} postData={post}/>;
      })}
    </div>
  );
}

export default PostHolder;
