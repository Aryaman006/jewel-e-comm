import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const CreateProductContainer = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    quantity: '',
  });
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const {port,token} = useAuth();

  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch(`${port}/category/categories`);
      const data = await response.json();
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getSubCategories = async () => {
    try {
      const response = await fetch(`${port}/subcategory/get`);
      const data = await response.json();
      setSubcategories(data) ;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
console.log(categories)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('subcategory', formData.subcategory);
    data.append('quantity', formData.quantity);
    data.append('photo', photo);

    try {
      const response = await axios.post(`${port}/product/create`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization : `Bearer ${token}` 
        },
      });
      console.log(response.data);
      alert('Product created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating product');
    }
  };

  return (
    <div className="">
      <div className="max-w-xl mx-auto bg-white p-5 rounded shadow-lg " style={{width:"75vw", marginTop:"50px", padding:"2rem", overflowY:"scroll", scrollbarWidth:"none"}}>
        <h3 className="text-2xl font-bold mb-5" style={{color:"brown",textAlign:"center", fontFamily:""}}>Create Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              style={{ backgroundColor: "transparent", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              style={{ backgroundColor: "transparent", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              style={{ backgroundColor: "transparent", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              style={{ backgroundColor: "#008080", color: "white", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
              Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              style={{ backgroundColor: "#008080", color: "white", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.subcategory}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              style={{ backgroundColor: "transparent", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
              Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFileChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductContainer;
