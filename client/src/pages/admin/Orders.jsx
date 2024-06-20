import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/auth';
import "../../components/card.css";
import OrderSummary from '../../components/invoiceModel';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { port, token } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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
          orderDate: new Date(order.createdAt).toLocaleString(),
          updateDate: new Date(order.updatedAt).toLocaleString()
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
    const order = orders.find(order => order._id === orderId);
    setSelectedOrder(order);
  };

  console.log(orders)
  const filteredOrders = orders.filter(order => 
    (order.users.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     order._id.includes(searchTerm)) &&
    (statusFilter === '' || order.status === statusFilter)
  );

  return (
    <div className="orders-container" style={{ marginTop: "100px", color:"black" }}>
      <h2 className="text-lg font-semibold" style={{ color: "brown", textAlign: "center", fontSize: "2rem", marginBottom: "30px" }}>Orders</h2>
      <div className="flex justify-center mt-16 mb-4">
        <div className="relative">
          <input
            type="text"
            className="w-80 p-2 pl-10 border border-brown rounded-full bg-gray-100"
            placeholder="Search products"
            style={{
              borderRadius: "30px",
              border: "solid 1px brown",
              width: "20rem",
              maxWidth: "30rem",
              padding: "8px"
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <select
          className="border rounded px-2 py-1"
          value={statusFilter}
          style={{ backgroundColor: "#008080", color: "white", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Not Process">Not Process</option>
                  <option value="Processing">Processing</option>
                  <option value="shipped">shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="cancel">cancel</option>
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
          {filteredOrders.map(order => (
            <tr key={order._id}>
              <td className="py-2 px-4">{order._id}</td>
              <td className="py-2 px-4">{order.users.name}</td>
              <td className="py-2 px-4">{order.orderDate}</td>
              <td className="py-2 px-4">${order.total}</td>
              <td className="py-2 px-4">
                <select
                  className="border rounded px-2 py-1"
                  value={order.status}
          style={{ backgroundColor: "#008080", color: "white", border: "black solid 1px", borderRadius: "30px", padding: "10px" }}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Not Process">Not Process</option>
                  <option value="Processing">Processing</option>
                  <option value="shipped">shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="cancel">cancel</option>
                </select>
              </td>
              <td className="py-2 px-4">
                <button
                  className="btn btn-primary hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleMoreInfo(order._id)}
                >
                  More Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying detailed order information */}
      <OrderSummary selectedOrder={selectedOrder} port={port} setSelectedOrder={setSelectedOrder} />
    </div>
  );
};

export default Orders;
