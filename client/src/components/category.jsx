import React from 'react';

function CategoryCard({ title, imageUrl }) {
  console.log(imageUrl)
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 mb-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300 ease-in-out sm:h-36 md:h-40 lg:h-48 xl:h-56"
        />
      )}
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
