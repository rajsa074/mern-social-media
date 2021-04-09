import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostThumb = ({ posts, result }) => {
  const { theme } = useSelector((state) => state);

  if (result === 0 ){
    return <h2 className="text-center color-c1">No Post</h2>
  }
    return (
      <div className="post_thumb">
        {posts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
            <div className="post_thumb_display">
              <img
                src={post.images[0].url}
                alt={post.images[0].url}
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />

              <div className="post_thumb_menu">
                <i className="far fa-thumbs-up">{post.likes.length}</i>
                <i className="far fa-comments">{post.comments.length}</i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
};

export default PostThumb
