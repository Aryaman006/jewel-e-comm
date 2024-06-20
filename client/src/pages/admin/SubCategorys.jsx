import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import "./category.css"

const SubCategoryComponent = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState('');
  const [editedSubCategory, setEditedSubCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [photo, setPhoto] = useState(null);
  const fileInputRefCreate = useRef(null);
  const fileInputRefEdit = useRef(null);
  const { port, token } = useAuth();

  const getCategories = async () => {
    try {
      const response = await fetch(`${port}/category/categories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const getSubCategories = async () => {
    try {
      const response = await fetch(`${port}/subcategory/get`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSubCategories(data);
    } catch (error) {
      console.log('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const createSubCategory = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newSubCategory);
      formData.append('category', selectedCategory);
      if (photo) {
        formData.append('photo', photo);
      }
      const response = await axios.post(`${port}/subcategory/create-subcategories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setSubCategories(prevSubCategories => [...prevSubCategories, response.data]);
        setNewSubCategory('');
        setSelectedCategory('');
        setPhoto(null);
        setPhotoPreview('');
      } else {
        console.log('Failed to create subcategory');
      }
    } catch (error) {
      console.log('Error creating subcategory:', error);
    }
  };






  const updateSubCategory = async (id) => {
    try {
      const formData = new FormData();
      formData.append('name', editedSubCategory);
      formData.append('category', selectedCategory);
      if (photo) {
        formData.append('photo', photo);
      }
      const response = await axios.put(`${port}/subCategory/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)

      if (response.status === 200) {
        getSubCategories();
        setEditIndex(null);
        setEditedSubCategory('');
        setSelectedCategory('');
        setPhoto(null);
        setPhotoPreview('');
      } else {
        console.log('Failed to update subcategory');
      }
    } catch (error) {
      console.log('Error updating subcategory:', error);
    }
  };

  const removeSubCategory = async (id) => {
    try {
      const response = await fetch(`${port}/subcategory/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (response.ok) {
        setSubCategories(prevSubCategories => prevSubCategories.filter(subcategory => subcategory._id !== id));
      } else {
        console.log('Failed to delete subcategory');
      }
    } catch (error) {
      console.log('Error deleting subcategory:', error);
    }
  };

  const handleAddSubCategory = () => {
    if (newSubCategory.trim() !== '' && selectedCategory) {
      createSubCategory();
    }
  };

  const handleSaveEdit = (id) => {
    if (editedSubCategory.trim() !== '' && selectedCategory) {
      updateSubCategory(id);
    }
  };

  const handleRemoveSubCategory = (id) => {
    removeSubCategory(id);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4" style={{ color: "brown", textAlign: "center", marginTop: "70px", fontSize: "30px" }}>Subcategories</h2>
      <div className="flex items-center mb-2">
        <input
          type="text"
          style={{ backgroundColor: "#f2f2f2", padding: "10px", border: "solid black 1px", borderRadius: "30px" }}
          className="border border-gray-300 px-3 py-2 rounded-md mr-2 w-full"
          placeholder="Enter new subcategory"
          value={newSubCategory}
          onChange={(e) => setNewSubCategory(e.target.value)}
        />
        <select
          value={selectedCategory}
          style={{ backgroundColor: "#008080", color: "white", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md mr-2"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        <input
          id="fileSelectorCreate"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={fileInputRefCreate}
        />
        <button
          className="btn btn-primary text-white px-4 py-2 rounded-md mr-2"
          onClick={() => fileInputRefCreate.current.click()}
        >
          Add Photo
        </button>
        <button
          className="btn btn-primary text-white px-4 py-2 rounded-md"
          onClick={handleAddSubCategory}
        >
          Add Subcategory
        </button>
      </div>
     
      <div className="overflow-x-auto" style={{ borderRadius: "30px" }}>
        <table className="w-full border-collapse" style={{ borderRadius: "30px", overflowX:"auto" }}>
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Subcategory</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody >
            {subCategories.map((subcategory, index) => (
              <tr key={subcategory._id} className="bg-white" style={{ width: "80%" }}>
                <td className="border border-gray-300 px-4 py-2">
                  {editIndex === index ? (
                    <input
                      type="text"
                      style={{ backgroundColor: "#f2f2f2", padding: "10px", border: "solid black 1px", borderRadius: "30px" }}
                      className="border border-gray-300 px-2 py-1 rounded-md w-full"
                      value={editedSubCategory}
                      onChange={(e) => setEditedSubCategory(e.target.value)}
                    />
                  ) : (
                    <h2 style={{ color: " #008080", fontWeight: "bold", fontSize: "20px" }}>{subcategory.name}</h2>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editIndex === index ? (
                    <select
                      value={selectedCategory}
                      style={{ backgroundColor: "#008080", color: "white", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border border-gray-300 px-3 py-2 rounded-md"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                      ))}
                    </select>
                  ) : (
                    subcategory.category ? (
                      <h2 style={{ color: "#008080", fontWeight: "bold", fontSize: "20px" }}>{subcategory.category.name}</h2>
                    ) : (
                      <p>No category found</p>
                    )
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex items-center">
                  {editIndex === index ? (
                    <>
                      <button
                        className="btn btn-success text-white px-4 py-2 rounded-md mr-2"
                        onClick={() => handleSaveEdit(subcategory._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-ghost text-white px-2 py-1 rounded-md"
                        onClick={() => {
                          setEditIndex(null);
                          setEditedSubCategory('');
                          setPhoto(null);
                          setPhotoPreview('');
                        }}
                      >
                        Cancel
                      </button>
                      <input
                        id="editFileSelector"
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        ref={fileInputRefEdit}
                      />
                      <button
                        className="btn btn-primary text-white px-4 py-2 rounded-md ml-2"
                        onClick={() => fileInputRefEdit.current.click()}
                      >
                        Update Photo
                      </button>
                      {photoPreview && (
                        <img
                          src={photoPreview}
                          alt="Selected"
                          className="h-2 w-2 object-cover rounded-md ml-2"
                          style={{ height: '40px', marginLeft: '10px', borderRadius: '5px' }}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning text-white px-4 py-2 rounded-md mr-2"
                        onClick={() => {
                          setEditIndex(index);
                          setEditedSubCategory(subcategory.name);
                          setSelectedCategory(subcategory.category ? subcategory.category._id : '');
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger text-white px-4 py-2 rounded-md"
                        onClick={() => handleRemoveSubCategory(subcategory._id)}
                      >
                        Delete
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

export default SubCategoryComponent;
