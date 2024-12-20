import React, { useState, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import PostGrid from "../components/PostGrid";
import ProfileActionMenu from "../components/ProfileActionMenu";
import AddPostModal from "../components/AddPostModal";

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
          <ProfileHeader user={user} />
          <PostGrid posts={user.posts} />
          <ProfileActionMenu onOpenModal={openModal} />
          <AddPostModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleAddPost}
            URL={URL}
            newPost={newPost}
            setNewPost={setNewPost}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
