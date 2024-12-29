import React from "react";

const PostDetailModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white max-w-xl w-full rounded-lg overflow-hidden shadow-xl relative">
        <div className="w-full aspect-square">
          <img
            src={post.imgUrl}
            alt={post.descricao || `Post ${post._id}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-red-500 text-white px-3 py-1 hover:bg-red-600 transition-colors duration-300"
          >
            X
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-800">{post.descricao}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
