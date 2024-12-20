import React from 'react';

const PostGrid = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.slice(1).map((post) => (
        <div key={post._id} className="aspect-square">
          <img
            src={post.imgUrl}
            alt={post.descricao || `Post ${post._id}`}
            className="w-full h-full object-cover hover:cursor-pointer hover:brightness-90 transition-all duration-150"
          />
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
