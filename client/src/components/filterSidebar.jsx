import React from "react";
import { FiFilter, FiX } from "react-icons/fi";

const FilterSidebar = () => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            {/* Filter Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                {/* Close Button */}
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <FiX />
                </button>
            </div>
            {/* Filter Options */}
            <div>
                {/* Category */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>All Categories</option>
                        <option>Category 1</option>
                        <option>Category 2</option>
                    </select>
                </div>
                {/* Subcategory */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                    <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>All Subcategories</option>
                        <option>Subcategory 1</option>
                        <option>Subcategory 2</option>
                    </select>
                </div>
                {/* Price Range */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price Range</label>
                    <div className="flex items-center">
                        <input type="number" placeholder="Min" className="mr-2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <span className="mr-2">-</span>
                        <input type="number" placeholder="Max" className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
