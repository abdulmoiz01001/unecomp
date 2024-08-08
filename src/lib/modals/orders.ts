import {Schema , models, model} from 'mongoose';

const OrderSchema = new Schema({
    orderItems: [
        {
            productName: { type: String, required: true },
            productQuantity: { type: String, required: true },
            productImage: { type: String, required: true },
            productPrice: { type: String, required: true },
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        // postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    cashOnDelivery: { type: Boolean, required: true },
    // paymentResult: {
    //     id: { type: String },
    //     status: { type: String },
    //     update_time: { type: String },
    //     email_address: { type: String },
    // },
    // taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: String, required: true },
    totalPrice: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPaid: { type: Boolean, required: true, default: false },
    // paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    adminApprove: { type: String, required: true, default: "Order will Approved as soon possible" },
    // deliveredAt: { type: Date },
    orderDate: { type: Date, required: true, default: Date.now },
    orderTime: { type: String, required: true },

    customerDetails: {
        namePrefix: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        deptName: { type: String, required: true },
        email: { type: String, required: true },
        projectName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        rollNumber: { type: String, required: true },
    },

}, {
    timestamps: true,


});

const Order = models.Order || model('Order', OrderSchema);

export default Order;