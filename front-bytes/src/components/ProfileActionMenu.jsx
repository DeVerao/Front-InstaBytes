import React from 'react';

const ProfileActionMenu = ({ onOpenModal }) => {
  return (
    <div
      id="Menu suspenso adição e edição do posts"
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 space-x-4 bg-white w-auto h-16 flex justify-center items-center z-50 rounded-full shadow-2xl border border-gray-200 px-4"
    >
      <button
        onClick={onOpenModal}
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
    </div>
  );
};

export default ProfileActionMenu;
