import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

const OrderComponent = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { port, token, user } = useAuth();
  const navigate = useNavigate();

  const getOrder = async () => {
    try {
      const response = await fetch(`${port}/order/order/${user._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (response.ok) {
        const ordersWithProductDetails = await Promise.all(
          data.order.map(async (order) => {
            const productsWithDetails = await Promise.all(
              order.products.map(async (product) => {
                const productResponse = await fetch(`${port}/product/product/${product.productId}`, {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`
                  },
                });
                const productData = await productResponse.json();
                return {
                  ...product,
                  details: productData.product,
                };
              })
            );
            return { ...order, products: productsWithDetails };
          })
        );
        setOrders(ordersWithProductDetails);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
              <div>
                <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right md:text-left">
                <p className="text-sm font-medium">
                  Status: 
                  <span className={`text-sm ${order.status === 'Delivered' ? 'text-green-500' : order.status === 'Shipped' ? 'text-blue-500' : 'text-yellow-500'}`}>
                    {order.status}
                  </span>
                </p>
                <p className="text-sm font-medium">Total: ${order.total.toFixed(2)}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.products.map((product) => (
                    <tr key={product.productId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={`${port}/product/photo/${product.productId}`} alt={product.details.name} className="h-16 w-16 object-cover rounded-md"/>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.details.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.details.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(product.details.price * product.quantity).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="btn btn-primary hover:underline" onClick={() => navigate(`/product/${product.productId}`)}>More Info</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">You have no orders.</p>
      )}
    </div>
  );
};

export default OrderComponent;
