import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { FaRupeeSign, FaShoppingCart } from 'react-icons/fa';
import "./singleProduct.css";
import Divider from '../components/divider';

const SingleProductPage = () => {
  const { productId } = useParams();
  const { port } = useAuth();
  const [product, setProduct] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${port}/product/product/${productId}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [port, productId]);

  useEffect(() => {
    if (product) {
      const fetchPhoto = async () => {
        try {
          const response = await axios.get(`${port}/product/photo/${product._id}`, { responseType: 'blob' });
          const imageUrl = URL.createObjectURL(response.data);
          setPhoto(imageUrl);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPhoto();
    }
  }, [port, product]);

  useEffect(() => {
    if (product) {
      const fetchRelatedProducts = async () => {
        try {
          const response = await axios.get(`${port}/product/related-products/${productId}/${product.category._id}/${product.subcategory._id}`);
          const productsWithImages = await Promise.all(response.data.products.map(async (relatedProduct) => ({
            ...relatedProduct,
            imageUrl: `${port}/product/photo/${relatedProduct._id}`
          })));
          setRelatedProducts(productsWithImages);
        } catch (error) {
          console.error('Error fetching related products:', error);
        }
      };

      fetchRelatedProducts();
    }
  }, [port, product, productId]);

  if (!product || !photo) {
    return <div className="container mx-auto p-4 h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="product-box">
        <figure className='fig'>
          <img src={photo} alt={product.name} className="img" />
        </figure>
        <div className="detail-box">
          <h1> {product.name}</h1>
          <h2>{product.description}</h2>
          <div className="price-box">
            <h1>Price:</h1>
            <FaRupeeSign />
            <h2>{product.price}</h2>
          </div>
          <button className="btn btn-primary"><FaShoppingCart /> Add to Cart</button>
        </div>
      </div>
      
      <hr />
      <div className="similar-products">
        <h2>Similar Products</h2>
        <div className="similar-products-list">
          {relatedProducts.map((relatedProduct) => (
            <Link to={`/product/${relatedProduct._id}`}>
            <div key={relatedProduct._id} className="related-product">
              <div className="img-container">
                <img src={relatedProduct.imageUrl} alt={relatedProduct.name} />
              </div>
              <div className="card-detail">
                <h3>{relatedProduct.name}</h3>
                <div className="price-box">
                  <FaRupeeSign />
                  <span>{relatedProduct.price}</span>
                </div>
                <button className="btn btn-primary"><FaShoppingCart /> Add to Cart</button>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
