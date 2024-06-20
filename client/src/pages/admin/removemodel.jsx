// RemoveConfirmationModal.js
import React from 'react';
import { useAuth } from '../../context/auth';

const RemoveConfirmationModal = ({ cancelRemove, confirmRemove, pid }) => {
  const {port,token} = useAuth();
  const handleRemove = async()=>{
    try {
      const data = await fetch(`${port}/product/delete/${pid}`,{
        method:"DELETE",
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      if(response.ok){
        confirmRemove();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to remove this product?</h2>
        <div className="flex justify-between items-center mt-4">
          <button onClick={cancelRemove} className="btn btn-ghost hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">
            Cancel
          </button>
          <button onClick={handleRemove} className="btn btn-error hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveConfirmationModal;
