import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import "./category.css"

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(''); // State to hold the photo preview URL
  const fileInputRef = useRef(null);
  const { port, token } = useAuth();

  const createCategory = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newCategory);
      if (photo) {
        formData.append('photo', photo);
      }
      const response = await axios.post(`${port}/category/create-categories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        const data = response.data;
        setCategories(prevCategories => [...prevCategories, data.category]);
        setNewCategory('');
        setPhoto(null);
        setPhotoPreview('');
      } else {
        console.log('Failed to create category');
      }
    } catch (error) {
      console.log('Error creating category:', error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`${port}/category/categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const updateCategory = async (id) => {
    try {
      const formData = new FormData();
      formData.append('name', editedCategory);
      if (photo) {
        formData.append('photo', photo);
      }
      const response = await axios.put(`${port}/category/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        getCategories();
        setEditIndex(null);
        setEditedCategory('');
        setPhoto(null);
        setPhotoPreview('');
      } else {
        console.log('Failed to update category');
      }
    } catch (error) {
      console.log('Error updating category:', error);
    }
  };

  const removeCategory = async (id) => {
    try {
      const response = await fetch(`${port}/category/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
      } else {
        console.log('Failed to delete category');
      }
    } catch (error) {
      console.log('Error deleting category:', error);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      createCategory();
    }
  };

  const handleSaveEdit = (id) => {
    if (editedCategory.trim() !== '') {
      updateCategory(id);
    }
  };

  const handleRemoveCategory = (id) => {
    removeCategory(id);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="max-w-xl mx-auto overflow-hidden">
      <h2 className="text-xl font-semibold mb-4" style={{ color: 'brown', textAlign: 'center', marginTop: '70px', fontSize: '30px', marginBottom: '10px' }}>
        Categories
      </h2>
      <div className="flex items-center mb-2">
        <input
          type="text"
          style={{ backgroundColor: '#f2f2f2', padding: '10px', border: 'solid black 1px', borderRadius: '30px' }}
          className="border border-gray-300 px-3 py-2 rounded-md mr-2 w-full"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <input
          id="fileSelector"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button
          className="btn btn-primary text-white px-4 py-2 rounded-md mr-2"
          onClick={() => fileInputRef.current.click()}
        >
          Add Photo
        </button>
        <button
          className="btn btn-primary text-white px-4 py-2 rounded-md"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto" style={{ borderRadius: '30px' }}>
        <table className="w-full border-collapse" style={{ borderRadius: '30px' }}>
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id} className="bg-white" style={{ width: '80%' }}>
                <td className="border border-gray-300 px-4 py-2">
                  {editIndex === index ? (
                    <input
                      type="text"
                      style={{ backgroundColor: '#f2f2f2', padding: '10px', border: 'solid black 1px', borderRadius: '30px' }}
                      className="border border-gray-300 px-2 py-1 rounded-md w-full"
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                    />
                  ) : (
                    <h2 style={{ color: '#008080', fontWeight: 'bold', fontSize: '20px' }}>{category.name}</h2>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex items-center" style={{ minWidth: '250px', maxWidth: '400px' }}>
                  {editIndex === index ? (
                    <>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                      />
                      <button
                        className="btn btn-success text-white px-2 py-1 rounded-md mr-2"
                        onClick={() => handleSaveEdit(category._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-ghost text-white px-2 py-1 rounded-md"
                        onClick={() => {
                          setEditIndex(null);
                          setEditedCategory('');
                          setPhoto(null);
                          setPhotoPreview('');
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary text-white px-2 py-1 rounded-md ml-2"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Update Photo
                      </button>
                      {photoPreview && (
                        <img
                          src={photoPreview}
                          alt="Selected"
                          className="large-screen-only"
                          style={{ height: '40px', marginLeft: '10px', borderRadius: '5px' }}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <button className="btn btn-active btn-primary mr-2" onClick={() => { setEditIndex(index); setEditedCategory(category.name); }}>Edit</button>
                      <button
                        className="btn btn-error px-2 py-1 rounded-md"
                        style={{ color: 'white' }}
                        onClick={() => handleRemoveCategory(category._id)}
                      >
                        Remove
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryComponent;
