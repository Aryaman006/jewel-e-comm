import React, { useState, useEffect } from 'react';
import "./card.css";
import axios from 'axios';
import { useAuth } from '../context/auth';
import { FiX } from 'react-icons/fi';

const EditProductModal = ({ product, handleEditProduct, handleClose }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    category: product.category._id,
    subcategory: product.subcategory._id,
    photo: product.imageUrl || null
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const { port, token, user } = useAuth();

  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch(`${port}/category/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getSubCategories = async () => {
    try {
      const response = await fetch(`${port}/subcategory/get`);
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      photo: file
    }));
  };

  const updateProduct = async () => {
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === 'photo' && formData[key] instanceof File) {
          formDataToSend.append('photo', formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await axios.put(`${port}/product/update/${product._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
console.log(response.data)
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProductData = await updateProduct(); // Wait for the product to update

    if (updatedProductData) {
      handleEditProduct(product._id, updatedProductData); // Ensure to use the correct product ID field
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button style={{color:"black"}} onClick={handleClose}><FiX/></button>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              style={{ backgroundColor: "transparent", color: "black", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              style={{ backgroundColor: "transparent", color: "black", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              style={{ backgroundColor: "transparent", color: "black", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              style={{ backgroundColor: "transparent", color: "black", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              style={{ backgroundColor: "#008080", color: "white", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="subcategory">Subcategory</label>
            <select
              name="subcategory"
              id="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              style={{ backgroundColor: "#008080", color: "white", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcat) => (
                <option key={subcat._id} value={subcat._id}>
                  {subcat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="photo">Image</label>
            <input
              type="file"
              name="photo"
              id="photo"
              onChange={handleFileChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {formData.photo && (
              <img
                src={formData.photo instanceof File ? URL.createObjectURL(formData.photo) : formData.photo}
                alt="Product"
                className="mt-2"
                style={{ maxHeight: "200px" }}
              />
            )}
          </div>
          <div className="flex justify-end" style={{ display: "flex", gap: "2rem", justifyContent: "space-around" }}>
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
