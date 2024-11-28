import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    _id: '1',
    descricao: 'Mocado User',
    imgUrl: 'https://via.placeholder.com/150',
    alt: 'Mocado User Image',
    posts: [
      { _id: 'post1', imgUrl: 'https://blog-static.petlove.com.br/wp-content/uploads/2019/06/shutterstock_632318627.jpg', alt: 'Post 1' },
      { _id: 'post2', imgUrl: 'https://via.placeholder.com/200', alt: 'Post 2' },
      { _id: 'post3', imgUrl: 'https://via.placeholder.com/200', alt: 'Post 3' },
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    // Simulate fetching data
    console.log('Mock data loaded', user);
  }, [navigate, user]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-1/3 flex flex-col items-center justify-center">
        <img
          src={user.imgUrl}
          alt={user.alt}
          className="w-40 h-40 rounded-full"
        />
        <h1 className="text-3xl font-bold mt-2">{user.descricao}</h1>
      </div>
      <div className="w-full h-2/3 grid grid-cols-3 gap-2">
        {user.posts &&
          user.posts.map(post => (
            <div key={post._id} className="w-full h-full">
              <img src={post.imgUrl} alt={post.alt} className="w-full h-full" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;

