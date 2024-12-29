import React, { useState } from "react";
import PostDetailModal from "./PostDetailModal";

const PostGrid = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-1">
        {posts.slice(1).map((post) => (
          <div
            key={post._id}
            className="aspect-square"
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={post.imgUrl}
              alt={post.descricao || `Post ${post._id}`}
              className="w-full h-full object-cover hover:cursor-pointer hover:brightness-90 transition-all duration-150"
            />
          </div>
        ))}
      </div>
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
};

export default PostGrid;
