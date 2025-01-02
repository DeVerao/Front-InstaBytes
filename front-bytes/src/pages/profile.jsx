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
          <ProfileActionMenu onOpenModal={openModal} />
          <AddPostModal
            isOpen={isModalOpen}
            onClose={closeModal}
            URL={URL}
          />
          <PostGrid posts={user.posts} URL={URL} />
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
