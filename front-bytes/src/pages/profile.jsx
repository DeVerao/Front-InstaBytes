import React from "react";
import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    imgUrl: "",
    alt: "",
  });

  const URL =
    "https://imersao-alura-backend-546094950816.southamerica-east1.run.app";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function getUser() {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/posts/1`);

      if (!response.ok) {
        throw new Error("Falha ao buscar dados do usuário");
      }

      const data = await response.json();
      const FIRST_POST = data[0];
      setUser({
        username: FIRST_POST.user,
        descricao: FIRST_POST.descricao,
        imgUrl: FIRST_POST.imgUrl,
        posts: data,
      });
      setError(null);
    } catch (err) {
      console.error("Erro na busca:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      // Lógica para adicionar o post
      // Por exemplo, fazer uma requisição para a API
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

      // Atualizar a lista de posts
      await getUser();

      // Fechar o modal após adicionar o post
      closeModal();
    } catch (error) {
      console.error("Erro ao adicionar post:", error);
      // Opcional: adicionar tratamento de erro para o usuário
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto h-screen overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Carregando...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full text-red-500">
          <p>Erro: {error}</p>
        </div>
      ) : user ? (
        <div className="px-4 py-6">
          <div className="flex items-center space-x-8 mb-8">
            <div className="aspect-square overflow-hidden w-24 h-24">
              <img
                src={user.imgUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-gray-300"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {user.username || "Usuário"}
              </h2>
              <p className="text-sm text-gray-600">{user.descricao}</p>
              <div className="flex space-x-4 mt-2">
                <span>
                  <strong>{user.posts?.length || 0}</strong> posts
                </span>
                <span>
                  <strong>0</strong> followers
                </span>
                <span>
                  <strong>0</strong> following
                </span>
              </div>
            </div>
          </div>
          <div
            id="Menu suspenso adição e edição do posts"
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 space-x-4 bg-white w-auto h-16 flex justify-center items-center z-50 rounded-full shadow-2xl border border-gray-200 px-4"
          >
            <button
              onClick={openModal}
              className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
              title="Add Post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 mb-1 group-hover:scale-110 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs font-medium">Add</span>
            </button>

            <div className="h-8 w-px bg-gray-300 mx-3"></div>

            <button
              className="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 transition-colors duration-300 group"
              title="Edit Post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 mb-1 group-hover:scale-110 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <span className="text-xs font-medium">Edit</span>
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4"
            > {/* Modal Overlay */}

              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto overflow-hidden"
              > {/* Modal Content */}

                <div className="bg-blue-500 text-white p-4 text-center"
                > {/* Modal Header */}
                  <h2 className="text-lg font-semibold">Criar Novo Post</h2>
                </div>
                <form onSubmit={handleAddPost} className="p-6 space-y-4">
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
                      onClick={closeModal}
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
          )}

          <div className="grid grid-cols-3 gap-1 ">
            {/* posts do usuario
            - slice para pular o primeiro post  */}
            {user.posts.slice(1).map((post) => (
              <div key={post._id} className="aspect-square overflow-hidden">
                <img
                  src={post.imgUrl}
                  alt={post.descricao || `Post ${post._id}`}
                  className="w-full h-full object-cover hover:cursor-pointer hover:brightness-90 transition-all duration-150"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Profile;
