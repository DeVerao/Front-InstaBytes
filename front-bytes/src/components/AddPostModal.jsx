import React, { useState } from 'react';

const AddPostModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  URL 
}) => {
  const [newPost, setNewPost] = useState({
    imgUrl: "",
    alt: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Falha ao adicionar post");
      }

      onSubmit(newPost);
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar post:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
        <div className="bg-blue-500 text-white p-4 text-center">
          <h2 className="text-lg font-semibold">Criar Novo Post</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="imgUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              URL da Imagem
            </label>
            <input
              type="text"
              id="imgUrl"
              value={newPost.imgUrl}
              onChange={(e) =>
                setNewPost({ ...newPost, imgUrl: e.target.value })
              }
              placeholder="Cole o link da sua imagem"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="alt"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Texto Alternativo
            </label>
            <textarea
              id="alt"
              value={newPost.alt}
              onChange={(e) =>
                setNewPost({ ...newPost, alt: e.target.value })
              }
              placeholder="Escreva uma descrição para seu post"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Postar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
