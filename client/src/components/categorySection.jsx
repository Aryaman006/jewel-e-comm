import React from 'react';
import { useNavigate } from 'react-router-dom';
import './categoryStyle.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../context/auth';

const GenderCategorySection = () => {
  const {port} = useAuth();
  const [categories,setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch(`${port}/category/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(()=>{
    getCategories();
  },[])
  console.log(categories)

  return (
    <section className="gender-category-section">
      <div className="container">
        <h2 className="section-title">Shop by Gender</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              imageUrl={`${port}/category/photo/${category._id}`}
              title={category.name}
              filter={category.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

function CategoryCard({ title, imageUrl, filter }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const filterParams = new URLSearchParams({ category: filter }).toString();
    navigate(`/shop?${filterParams}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Category for ${title}`}
          className="category-image"
        />
      )}
      <div className="category-content">
        <h3 className="category-title">{title}</h3>
        <a href="#" className="category-link">Shop Now</a>
      </div>
    </div>
  );
}

export default GenderCategorySection;
