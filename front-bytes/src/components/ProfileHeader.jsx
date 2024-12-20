import React from 'react';

const ProfileHeader = ({ user }) => {
  return (
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
  );
};

export default ProfileHeader;
