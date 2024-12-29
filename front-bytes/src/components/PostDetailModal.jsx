import React from 'react';

const PostDetailModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white max-w-xl w-full rounded-lg overflow-hidden shadow-xl">
        <div className="w-full aspect-square">
          <img 
            src={post.imgUrl} 
            alt={post.descricao || `Post ${post._id}`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <p className="text-gray-800">{post.descricao}</p>
        </div>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PostDetailModal;