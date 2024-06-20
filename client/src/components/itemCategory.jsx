import React from 'react';
import './categoryStyle.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../context/auth';


const ItemCategorySection = () => {
    const [categories,setCategories] = useState([]);
    const {port} = useAuth();

    const getSubCategories = async () => {
      try {
        const response = await fetch(`${port}/subcategory/get`);
        const data = await response.json();
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    useEffect(()=>{
      getSubCategories();
    },[])

    return (
        <section className="item-category-section">
           <div className="container">
            <h2 className="section-title">Shop by Items</h2>
            <div className="categories-grid">
                {categories.map((category) => (
                    <CategoryCard key={category.id} imageUrl={`${port}/subCategory/photo/${category._id}`} title={category.name} filter={category.category}/>
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

export default ItemCategorySection;
