import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { FaExclamationCircle } from 'react-icons/fa'; // Import icon from react-icons library

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotFound, setShowNotFound] = useState(false); // State to track if no users are found
  const { port, token } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${port}/auth/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      // Map through the data to format createdAt to local time
      const formattedData = data.map(user => ({
        ...user,
        createdDate: new Date(user.createdAt).toLocaleString()
      }));
      setUsers(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [port, token]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.createdDate.includes(searchTerm)
  );

  useEffect(() => {
    // Check if filteredUsers array is empty to show "User not found" message
    if (filteredUsers.length === 0 && searchTerm !== '') {
      setShowNotFound(true);
    } else {
      setShowNotFound(false);
    }
  }, [filteredUsers, searchTerm]);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4" style={{ color: "brown", textAlign: "center" }}>Users</h2>
      <div className="mb-4" style={{display:"flex", justifyContent:'center'}}>
        <input
          type="text"
          placeholder="Search by name, email, phone, address, or created date"
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            borderRadius: "30px",
            border: "solid 1px brown",
            width:"30rem",
            padding: "8px",
            backgroundColor:"#f2f2f2"
          }}
        />
      </div>
      {showNotFound ? ( // Conditional rendering when no users are found
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <FaExclamationCircle className="text-red-500 text-4xl mb-2" />
            <p className="text-gray-500">No users found</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead style={{ color: "black" }}>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Created Date</th>
              </tr>
            </thead>
            <tbody style={{ color: "#008080" }}>
              {filteredUsers.map((userData, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">{userData.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{userData.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{userData.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{userData.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{userData.createdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
