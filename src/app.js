import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import "./cronJobs.js";

const app = express();

// Define allowed origins
const allowedOrigins = [
  'https://food-waste-reduction.vercel.app',
  'http://localhost:3000' // for local development
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import

import userRouter from "./routes/user.routes.js";
import productCategoryRouter from "./routes/productCategory.routes.js";
import auctionRouter from "./routes/auction.routes.js";
import cityRouter from "./routes/city.routes.js";
import bidRouter from "./routes/bid.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import cartRouter from "./routes/cart.routes.js"
import Order from "./models/order.model.js";
// import productRouter from "./routes/product.routes.js";



//routes declaration

app.use("/api/v1/users",userRouter);
app.use("/api/v1/product-categories",productCategoryRouter);
app.use("/api/v1/auctions",auctionRouter);
// app.use("/api/v1/products",productRouter);
app.use("/api/v1/cities",cityRouter);
app.use("/api/v1/bids",bidRouter);
app.use("/api/v1/notifications",notificationRouter);
app.use("/api/v1/payments",paymentRouter);
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/orders", Order)



export {app}