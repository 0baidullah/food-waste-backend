import { Router } from "express";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import {getCartItems , deleteCartItem , addCartItem} from "../controllers/cart.controller.js";



const router = Router();




router.route("/").get(verifyUser, getCartItems);
router.route("/:id").delete(verifyUser, deleteCartItem),
router.route("/:id").post(verifyUser, addCartItem)







export default router;
