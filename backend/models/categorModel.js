const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type: String,
        require: true,
        unique:true,
    },
    slug:{
        type: String,
        require: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
},{timestamps:true});

   module.exports = mongoose.model('category', categorySchema);    