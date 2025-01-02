import React, { useState } from "react";
import PostDetailModal from "./PostDetailModal";

const PostGrid = ({ posts, URL }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const deletePost = async (postId) => {
    console.log(postId);
    try {
      const response = await fetch(`${URL}/delete/${postId._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Falha ao deletar post");
      }

      setSelectedPost(null);
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

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
          onDelete={() => deletePost(selectedPost)}
          onEdit={"#"}
        />
      )}
    </>
  );
};

export default PostGrid;
