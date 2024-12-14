import React from "react";import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = "https://imersao-alura-backend-546094950816.southamerica-east1.run.app";

  async function getUser() {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/posts/1`);
      
      if (!response.ok) {
        throw new Error('Falha ao buscar dados do usuário');
      }
      
      const data = await response.json();
      const FIRST_POST = data[0];
      setUser({
        username: FIRST_POST.user,
        descricao: FIRST_POST.descricao,
        imgUrl: FIRST_POST.imgUrl,
        posts: data
      });
      setError(null);
    } catch (err) {
      console.error('Erro na busca:', err);
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
          <div className="flex items-center space-x-8 mb-8">
            <div className="aspect-square overflow-hidden w-24 h-24">
              <img 
                src={user.imgUrl} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-2 border-gray-300"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.username || 'Usuário'}</h2>
              <p className="text-sm text-gray-600">{user.descricao}</p>
              <div className="flex space-x-4 mt-2">
                <span><strong>{user.posts?.length || 0}</strong> posts</span>
                <span><strong>0</strong> followers</span>
                <span><strong>0</strong> following</span>
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-3 gap-1">
            {user.posts.map((post) => (
              <div 
                key={post._id} 
                className="aspect-square overflow-hidden"
              >
                <img 
                  src={post.imgUrl} 
                  alt={post.descricao || `Post ${post._id}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default Profile;

