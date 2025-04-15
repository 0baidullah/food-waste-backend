import { Router } from "express";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import { getAllOrders, getOrder, createOrder, updateOrderStatus } from "../controllers/order.controller";


const router = Router();

router.route("/:id").post(verifyUser, createOrder);
router.route("/:id").get(verifyUser, updateOrderStatus);
