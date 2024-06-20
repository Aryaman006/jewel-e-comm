import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/auth';

const Order2 = () => {
  const [orders, setOrders] = useState([]);
  const { port, token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${port}/order/orders`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        const formattedData = data.orders.map(order => ({
          ...order,
          orderDate: new Date(order.createdAt).toLocaleString()
        }));
        setOrders(formattedData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [port, token]);

  const handleStatusChange = useCallback(async (orderId, status) => {
    try {
      const response = await fetch(`${port}/order/update-order/${orderId}/${status}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      setOrders(prevOrders =>
        prevOrders.map(order => (order._id === orderId ? { ...order, status } : order))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }, [port, token]);

  const handleMoreInfo = (orderId) => {
    console.log(`More info clicked for order ${orderId}`);
    // Implement logic to show detailed order information (modal, expanded view, etc.)
  };

  return (
    <div className="orders-container">
      <h2 className="text-lg font-semibold">Orders</h2>
      <div className="search-filter my-4">
        <input className="border rounded px-2 py-1 mr-2" type="text" placeholder="Search..." />
        <select className="border rounded px-2 py-1">
          <option value="status">Status</option>
          <option value="date">Date</option>
        </select>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4">Order #</th>
            <th className="py-2 px-4">Customer Name</th>
            <th className="py-2 px-4">Order Date</th>
            <th className="py-2 px-4">Total</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map(order => (
            <tr key={order._id}>
              <td className="py-2 px-4">{order._id}</td>
              <td className="py-2 px-4">{order.users.name}</td>
              <td className="py-2 px-4">{order.orderDate}</td>
              <td className="py-2 px-4">${order.total}</td>
              <td className="py-2 px-4">
                <select
                  className="border rounded px-2 py-1"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleMoreInfo(order._id)}
                >
                  More Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order2;
