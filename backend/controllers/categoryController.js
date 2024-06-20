const Category = require("../models/categorModel");
const slugify = require('slugify');
const fs = require("fs");
const categorModel = require("../models/categorModel");


const createCategoryController = async (req, res) => {
    try {
        const { name } = req.fields;
        const {photo} = req.files

        if (!name) {
            return res.status(400).send({ error: "Name is required" });
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).send({ error: "Category already exists" });
        }

        const category = new Category({ 
            name, 
            slug: slugify(name), 
        });
        
        if(photo){
            category.photo.data = fs.readFileSync(photo.path);
            category.photo.contentType = photo.type;
            await category.save();
        }
        res.status(201).send({ message: "New category created", category });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while creating the category' });
    }
}

const getCategoriesController = async (req, res) => {
    try {
        const categories = await Category.find() .select('-photo');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCategoryPhotoController = async(req,res)=>{
    try {
        const category = await Category.findById(req.params.id).select("photo");
        if(category.photo.data){
            res.set("Content-type",category.photo.contentType);
            return res.status(200).send(category.photo.data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.fields;
        const {photo} = req.files

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

      let updatedCategoryData = { ...req.fields, slug: slugify(name) };
      if (photo) {
        const photoData = fs.readFileSync(photo.path);
        updatedCategoryData.photo = {
          data: photoData,
          contentType: photo.type
        };
      }
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updatedCategoryData,
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).send({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createCategoryController,
    getCategoriesController,
    updateCategoryController,
    deleteCategoryController,
    getCategoryPhotoController
};
