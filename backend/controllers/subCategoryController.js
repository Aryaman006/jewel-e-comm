const subCategoryModel = require('../models/subCategoryModel');
const SubCategory = require('../models/subCategoryModel');
const slugify = require("slugify");
const fs = require("fs");
const createSubCategoryController = async (req, res) => {
    try {
        const { name, category } = req.fields;
        const {photo} = req.files

        if (!name || !category) {
            return res.status(400).json({ message: 'Name and category are required' });
        }
        const slug = slugify(name);
        const subCategory = new SubCategory({ name, slug, category });
        if(photo){
            subCategory.photo.data = fs.readFileSync(photo.path);
            subCategory.photo.contentType = photo.type;
            await subCategory.save();
        }
        res.status(201).json(subCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllSubCategoriesController = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('category');
        res.json(subCategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSubCategoryByIdController = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id).populate('category', 'name');
        if (subCategory === null) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.json(subCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSubCategoryPhotoController = async(req,res)=>{
    try {
        const category = await subCategoryModel.findById(req.params.id).select("photo");
        if(category.photo.data){
            res.set("Content-type",category.photo.contentType);
            return res.status(200).send(category.photo.data);
        }
    } catch (error) {
    }
}
const updateSubCategoryController = async (req, res) => {
    try {
        const { name, category } = req.fields;
        const { photo } = req.files;

        if (!name || !category) {
            return res.status(400).json({ message: 'Name and category are required' });
        }

        let updatedSubCategoryData = { ...req.fields, slug: slugify(name) };

        if (photo) {
            const photoData = fs.readFileSync(photo.path);
            updatedSubCategoryData.photo = {
                data: photoData,
                contentType: photo.type
            };
        }

        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            updatedSubCategoryData,
            { new: true }
        );

        if (!updatedSubCategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.status(200).json(updatedSubCategory);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteSubCategoryController = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (subCategory === null) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.json({ message: 'Subcategory deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createSubCategoryController,
    getAllSubCategoriesController,
    getSubCategoryByIdController,
    updateSubCategoryController,
    deleteSubCategoryController,
    getSubCategoryPhotoController
};


