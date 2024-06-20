import React from 'react';

const ProductTableCard = ({ name, price, description, category, subcategory, quantity, image, showEditModal, showRemoveModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4" style={{margin:"1rem",maxHeight:"450px"}}>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-semibold">Name:</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td className="font-semibold">Description:</td>
            <td>{description}</td>
          </tr>
          <tr>
            <td className="font-semibold">Price:</td>
            <td>{price}</td>
          </tr>
          <tr>
            <td className="font-semibold">Quantity:</td>
            <td>{quantity}</td>
          </tr>
          <tr>
            <td className="font-semibold">Category:</td>
            <td>{category}</td>
          </tr>
          <tr>
            <td className="font-semibold">Subcategory:</td>
            <td>{subcategory}</td>
          </tr>
          <tr>
            <td className="font-semibold">Image:</td>
            <td>
              {image && <img src={image} alt={name} style={{ maxHeight: '100px' }} />}
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="text-right" style={{display:"flex",gap:"1rem "}}>
              <button onClick={showEditModal} className="btn btn-accent hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2">
                Edit
              </button>
              <button onClick={showRemoveModal} className="btn btn-error hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductTableCard;
