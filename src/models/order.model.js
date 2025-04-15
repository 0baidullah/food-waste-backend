import { Schema,mongoose } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Auction",
        required: true,
      },
    ],

    status: {
      type: Number,
      enum: [0, 1, 2, 3], // 0: Pending, 1: Processing, 2: Shipped, 3: Delivered
      default: 0,
    },
  

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
