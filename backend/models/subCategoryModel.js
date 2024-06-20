const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');


const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true // Assuming slug is unique across all subcategories
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
});

// Define a compound index on 'name' and 'category' to enforce unique names within each category
subCategorySchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('subcategory', subCategorySchema);
