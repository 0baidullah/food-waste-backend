import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Order from "../models/order.model.js";



const createOrder = asyncHandler(async (req, res) => {

   const id = req.params.id;
   const { user } = req;
    const { products, totalPrice, shippingAddress } = req.body;
    if (!products || !totalPrice || !shippingAddress) {
        return res.status(400).json(new ApiResponse(400, "All fields are required"));
    }
    const orderId = `ORD-${Date.now()}`;
    const order = new Order({
        orderId,
        user: id,
        products,
        totalPrice,
        shippingAddress
    });
    await order.save();
    return res.status(201).json(new ApiResponse(201, "Order created successfully", order));


}
);

const getOrder = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json(new ApiResponse(400, "Order ID is required"));
        }

        const order = await Order.findById(id).populate("products");

        if (!order) {
            return res.status(404).json(new ApiResponse(404, "Order not found"));
        }

        return res.status(200).json(new ApiResponse(200, "Order retrieved successfully", order));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
}
);


const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find().populate("products");

        return res.status(200).json(new ApiResponse(200, "Orders retrieved successfully", orders));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
}
);


const updateOrderStatus = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id || !status) {
            return res.status(400).json(new ApiResponse(400, "Order ID and status are required"));
        }

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!order) {
            return res.status(404).json(new ApiResponse(404, "Order not found"));
        }

        return res.status(200).json(new ApiResponse(200, "Order status updated successfully", order));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
}
);



export { createOrder, getOrder, getAllOrders, updateOrderStatus };