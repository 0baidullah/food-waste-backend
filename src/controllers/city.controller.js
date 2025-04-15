import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import City from "../models/city.model.js";



// @desc Add city
// @route POST /api/v1/cities
// @access Private
// also get image in add city
const addCity = asyncHandler(async (req, res) => {
   // name and image
    try {
        const { name } = req.body;
        const image = req.file?.path;

        // Check if fields are empty
        if (!name || !image) {
            return res.status(400).json(new ApiResponse(400, "All fields are required"));
        }

        // Check if city exists
        const existedCity = await City.findOne({ name });
        if (existedCity) {
            return res.status(409).json(new ApiResponse(409, "City already exists"));
        }

        const city = await City.create({
            name,
            imageUrl: image
        });

        if (!city) {
            return res.status(500).json(new ApiResponse(500, "Error creating city"));
        }

        return res.status(201).json(new ApiResponse(201, "City created successfully", city));
    } catch (error) {
        // Handle the error
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
});


// @desc Get all cities
// @route GET /api/v1/cities
// @access Public

const getAllCities = asyncHandler(async (req, res) => {
    try {
        const cities = await City.find({});

        if (!cities) {
            return res.status(404).json(new ApiResponse(404, "Cities not found"));
        }

        return res.status(200).json(new ApiResponse(200, "Cities found", cities));
    } catch (error) {
        // Handle the error
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
});


const getcityById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findById(id);

        if (!city) {
            return res.status(404).json(new ApiResponse(404, "City not found"));
        }

        return res.status(200).json(new ApiResponse(200, "City found", city));
    } catch (error) {
        // Handle the error
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
}
);

const updateCity = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Check if fields are empty
        if (!name) {
            return res.status(400).json(new ApiResponse(400, "All fields are required"));
        }

        const city = await City.findByIdAndUpdate(id, { name }, { new: true });

        if (!city) {
            return res.status(500).json(new ApiResponse(500, "Error updating city"));
        }

        return res.status(200).json(new ApiResponse(200, "City updated successfully", city));
    } catch (error) {
        // Handle the error
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
}
);

const deleteCity = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const city = await City.findByIdAndDelete(id);

        if (!city) {
            return res.status(404).json(new ApiResponse(404, "City not found"));
        }

        return res.status(200).json(new ApiResponse(200, "City deleted successfully"));
    } catch (error) {
        // Handle the error
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
}
);

const gettopCities = asyncHandler(async (req, res) => {
    

    try {
        const cities = await City.find({}).sort({ 'createdAt': -1 }).limit(3);

        if (!cities) {
            return res.status(404).json(new ApiResponse(404, "Cities not found"));
        }

        return res.status(200).json(new ApiResponse(200, "Top cities found", cities));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
}


);

 const getCityMoreDetail = asyncHandler(async (req, res) => {

    try{
        const totalCities = await City.countDocuments();
        const mostPopulatedCity = await City.aggregate([
            {
                $lookup: {
                    from: "auctions",
                    localField: "_id",
                    foreignField: "city",
                    as: "products"
                }
            },
            {
                $project: {
                    name: 1,
                    products: { $size: "$products" }
                }
            },
            {
                $sort: { 'products': -1 }
            },
            {
                $limit: 1
            }
        ]);
        const recentlyAddedCity = await City.findOne().sort({ 'createdAt': -1 });
        return res.status(200).json(new ApiResponse(200, "City details", {
            totalCities,
            mostPopulatedCity,
            recentlyAddedCity
        }));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));

    }
}
);



export {
    addCity,
    getAllCities,
    getcityById,
    updateCity,
    deleteCity,
    gettopCities,
    getCityMoreDetail

}