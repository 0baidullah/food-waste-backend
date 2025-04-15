import { Router } from "express";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import {  addCity,
    getAllCities,
    getcityById,
    updateCity,
    deleteCity,
    gettopCities,
    getCityMoreDetail


} from "../controllers/city.controller.js";
import { upload } from "../middlewares/multer.middleware.js";



const router = Router();

// router.route("/register").post(registerUser);





router.route("/top").get( gettopCities);
router.route("/detail").get( getCityMoreDetail);

router.route("/:id").get(getcityById);
router.route("/").get(getAllCities);

router
    .route("/")
    .post(verifyUser, verifyAdmin,upload.single("image"), addCity);
router
    .route("/:id")
    .put(verifyUser, verifyAdmin, upload.single("image"), updateCity);
router.route("/:id").delete(verifyUser, verifyAdmin, deleteCity);







export default router;
