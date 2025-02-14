const express = require("express");
const router = express.Router();

//Controller
const {
	insertPhoto,
	deletePhoto,
	getAllPhotos,
	getUserPhotos,
	GetPhotoById,
	updatePhoto,
	likePhoto,
} = require("../controllers/PhotoController");

//Middlewares
const {
	photoInsertValidation,
	photoUpdateValidation,
} = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");
//Routes
router.post(
	"/",
	authGuard,
	imageUpload.single("image"),
	photoInsertValidation(),
	validate,
	insertPhoto
);

router.delete("/:id", authGuard, deletePhoto);

router.get("/", authGuard, getAllPhotos);

router.get("/user/:id", authGuard, getUserPhotos);

router.get("/:id", authGuard, GetPhotoById);

router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);

router.put("/like/:id", authGuard, likePhoto);

module.exports = router;
