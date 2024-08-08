import { Schema, model, models } from 'mongoose';

const CartSchema = new Schema({

    productName: { type: String, required: true },
    productQuantity: { type: Number, required: false, default: 1 },
    productCategory: { type: String, required: true },
    fileURL: { type: String, required: true },
    productPrice: { type: String, required: true },
    productID: {  // product id which is going for carting
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },


    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cartDate: { type: Date, required: true, default: Date.now },
    cartTime: { type: String, required: true },
}, {
    timestamps: true,
});

const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;