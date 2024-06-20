import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import {FaExclamationCircle} from "react-icons/fa";
import ProductTableCard from "../../components/productTable";
import EditProductModal from '../../components/editProduct';
import RemoveConfirmationModal from './removemodel';
import { useAuth } from '../../context/auth';
import Footer from '../../components/Footer';

const MainComponent = () => {
  const { port } = useAuth();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCategories();
    getSubCategories();
    getProducts();
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

  const getProducts = async () => {
    try {
      const response = await fetch(`${port}/product/products`, {
        method: "GET"
      });
      const data = await response.json();
      const productsWithImages = await Promise.all(data.products.map(product => ({
        ... product,
        imageUrl : `${port}/product/photo/${product._id}`
      })));
      console.log(productsWithImages);
      setProducts(productsWithImages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const showEditModal = (product) => {
    setSelectedProduct(product);
    setEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
  };

  const showRemoveModal = (product) => {
    setSelectedProduct(product);
    setRemoveModalVisible(true);
  };

  const handleEditProduct = (productId, updatedProductData) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedProductData } : product
      )
    );
    setEditModalVisible(false);
  };

  const handleRemoveProduct = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== selectedProduct.id)
    );
    setRemoveModalVisible(false);
  };

  const cancelRemove = () => {
    setRemoveModalVisible(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  let filteredProducts = products;
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category._id === selectedCategory
    );
  }
  if (selectedSubcategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.subcategory._id === selectedSubcategory
    );
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ marginTop: "70px"}}>
      <div className="flex justify-center mt-16 mb-4">
        <div className="relative">
          <input
            type="text"
            className="w-80 p-2 pl-10 border border-brown rounded-full bg-gray-100"
            placeholder="Search products"
            style={{
              borderRadius: "30px",
              border: "solid 1px brown",
              width:"20rem",
              maxWidth:"30rem",
              padding: "8px"
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        
        </div>
      </div>      

      <div className="flex flex-wrap justify-center mb-4 space-x-2">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          style={{ padding: "10px", backgroundColor: "#FFFFF0", border: "solid 1px brown", borderRadius: "30px" }}
          className="p-2 bg-yellow-50 border border-brown rounded-full"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={selectedSubcategory}
          onChange={(e) => handleSubcategoryChange(e.target.value)}
          style={{ padding: "10px", backgroundColor: "#FFFFF0", border: "solid 1px brown", borderRadius: "30px" }}
          className="p-2 bg-yellow-50 border border-brown rounded-full"
        >
          <option value="">All Subcategories</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4" style={{ margin: "1rem" }}>
        {filteredProducts.length === 0 ? (
           <div className="flex items-center justify-center h-48">
           <div className="text-center" style={{color:""}}>
             <FaExclamationCircle className="text-red-500 text-4xl mb-2" />
             <p className="text-gray-500">No users found</p>
           </div>
         </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductTableCard
              key={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              category={product.category.name}
              subcategory={product.subcategory.name}
              quantity={product.quantity}
              image={product.imageUrl}
              showEditModal={() => showEditModal(product)}
              showRemoveModal={() => showRemoveModal(product)}
            />
          ))
        )}
      </div>

      {editModalVisible && (
        <EditProductModal
          product={selectedProduct}
          handleEditProduct={handleEditProduct}
          handleClose={handleCloseEditModal}
        />
      )}

      {removeModalVisible && (
        <RemoveConfirmationModal
          cancelRemove={cancelRemove}
          confirmRemove={handleRemoveProduct}
          pid={selectedProduct._id}
        />
      )}
    </div>
  );
};

export default MainComponent;
