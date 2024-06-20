const productModel = require("../models/productModel");
const fs = require("fs");
const slugify = require("slugify");
const categoryModel = require("../models/categorModel");
const subCategoryModel = require("../models/subCategoryModel");
const { reset } = require("nodemon");

const createProductController = async(req,res)=>{
    try {
        const { name, description, price, category, quantity, subcategory } = req.fields;
        const {photo} = req.files;
        const products = new productModel({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
            await products.save();
        }
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
          });
    } catch (error) {
        res.status(500).send("error in creating product");
    }
}

const getProductController = async (req, res) => {
  try {
      const products = await productModel.find({})
          .populate("category")
          .populate({ path: "subcategory", model: "subcategory" })
          .select('-photo')
          .limit(12)
          .sort({ createdAt: -1 });

      res.status(200).send({
          success: true,
          counTotal: products.length,
          message: "All Products",
          products,
      });
  } catch (error) {
      res.status(500).send({
          success: false,
          message: "Error in getting products",
          error: error.message,
      });
  }
};


const getSingleProductController = async (req, res) => {
    try {
      const product = await productModel
        .findOne({ _id: req.params.id })
        .select("-photo")
        .populate("category").populate("subcategory"); 
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
        error,
      });
    }
  };

  const productPhotoController = async(req,res)=>{
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if(product.photo.data){
        res.set("Content-type",product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  } 
    
  const deleteProductController = async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.params.pid);
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };

  const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } = req.fields;
      const { photo } = req.files;
      let updatedProductData = { ...req.fields, slug: slugify(name) };
  
      if (photo) {
        const photoData = fs.readFileSync(photo.path);
        updatedProductData.photo = {
          data: photoData,
          contentType: photo.type
        };
      }
  
      const updatedProduct = await productModel.findByIdAndUpdate(
        req.params.pid,
        updatedProductData,
        { new: true }
      );
  
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        error,
        message: "Error in Update product",
      });
    }
  };
  

  const productFiltersController = async (req, res) => {
    try {
      const { categoryChecked, subCategoryChecked, radio } = req.body;
      let args = {};
      if(categoryChecked){
        if (categoryChecked.length > 0) args.category = { $in: categoryChecked };
      }
      if(subCategoryChecked){
        if (subCategoryChecked.length > 0) args.subCategory = { $in: subCategoryChecked };
      }
      if(radio){
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      }
  
      const products = await productModel.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Error While Filtering Products",
        error,
      });
    }
  };

  const productCountController = async(req,res)=>{
    try {
      const total = await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      res.status(400).send({
        message:"error in product cout",
        error,
        success:false
      })
    }
  }

  const productListController = async (req, res) => {
    try {
      const perPage = 10;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  }

  const searchProductController = async(req,res)=>{
    try {
      const {keyword} = req.params;
      const result = await productModel.find({
        $or:[
          {name:{$regex:keyword,$options:"i"}},
          {description:{$regex:keyword,$options:"i"}},
        ],
      }).select("-photo");
      res.json(result);
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  } 
  const relatedProductController = async (req, res) => {
    try {
        const { pid, cid, sid } = req.params;
        const products = await productModel.find({
            category: cid,
            subcategory: sid,
            _id: { $ne: pid },
        }).select("-photo")
            .limit(5)
            .populate("category")
            .populate("subcategory");

        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error while getting related products",
            error,
        });
    }
};

  const productCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      const products = await productModel.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };
  
  const productSubCategoryController = async (req, res) => {
    try {
      const category = await subCategoryModel.findOne({ slug: req.params.slug });
      const products = await productModel.find({ category }).populate("subCategory");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };
  
  module.exports = {createProductController,getProductController,updateProductController,deleteProductController,getSingleProductController,productFiltersController,searchProductController,productCountController,productListController,relatedProductController,productPhotoController,productCategoryController,productSubCategoryController}