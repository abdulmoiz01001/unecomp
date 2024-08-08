import {Schema , models, model} from 'mongoose';

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    fileURL: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },
    numReviews: {
        type: Number,
        required: false,
    },
    
    
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;