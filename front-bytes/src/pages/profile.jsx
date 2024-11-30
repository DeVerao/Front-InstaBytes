import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    _id: "1",
    descricao: "Mocado User",
    imgUrl: "https://via.placeholder.com/150",
    alt: "Mocado User Image",
    posts: [
      {
        _id: "post1",
        imgUrl: "https://via.placeholder.com/200",
        alt: "Post 1",
      },
      {
        _id: "post2",
        imgUrl: "https://via.placeholder.com/200",
        alt: "Post 2",
      },
      {
        _id: "post3",
        imgUrl: "https://via.placeholder.com/200",
        alt: "Post 3",
      },
      {
        _id: "post4",
        imgUrl: "https://via.placeholder.com/200",
        alt: "Post 4",
      },
      {
        _id: "post5",
        imgUrl: "https://via.placeholder.com/200",
        alt: "Post 5",
      },
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    // Simulate fetching data
    console.log("Mock data loaded", user);
  }, [navigate, user]);

  return (
    <div
      id="profile"
      className="w-full h-full md:h-screen md:flex md:flex-col md:justify-center lg:flex-row lg:justify-start lg:items-center"
    >
      <div id="profile-2" className="w-full h-1/3 md:w-1/3 lg:w-2/5 flex md:justify-center">
        <img
          src={user.imgUrl}
          alt={user.alt}
          className="w-40 h-40 rounded-full "
        />
        <nav class="flex space-x-4 pl-7 md:pl-0">
          <a class="flex flex-col">
            <span class="font-medium">1</span>
            publicações
          </a>
          <a class="flex flex-col">
            <span class="font-medium">150</span>
            seguidores
          </a>
          <a class="flex flex-col">
            <span class="font-medium">50</span>
            seguindo
          </a>
        </nav>
      </div>
        <h1 className="text-3xl font-bold md:pl-7">{user.descricao}</h1>
      <div className="w-1/3 h-full grid grid-cols-3 md:w-2/3 md:h-50% gap-2">
        {user.posts &&
          user.posts.map((post) => (
            <div
              key={post._id}
              className="w-full h-full border-2 border-red-500"
            >
              <img src={post.imgUrl} alt={post.alt} className="w-full h-full" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;

