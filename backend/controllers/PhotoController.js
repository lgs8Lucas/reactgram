const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

// Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
	const { title } = req.body;
	const image = req.file.filename;

	const reqUser = req.user;
	const user = await User.findById(reqUser._id);

	//Create photo
	const newPhoto = await Photo.create({
		image,
		title,
		userId: user._id,
		userName: user.name,
	});

	//if photo was created successfully, return data
	if (!newPhoto) {
		res.status(422).json({
			errors: ["Houve um problema, por favor tente novamente mais tarde."],
		});
		return;
	}
	res.status(201).json(newPhoto);
};

//Remove a photo from DB
const deletePhoto = async (req, res) => {
	const { id } = req.params;
	const reqUser = req.user;
	try {
		const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
		//Check if exists
		if (!photo) {
			res.status(404).json({ errors: ["Foto não encontrada"] });
			return;
		}
		//Check if photo belongs to user
		if (!photo.userId.equals(reqUser._id)) {
			res.status(422).json({
				errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
			});
			return;
		}
		await Photo.findByIdAndDelete(photo._id);
		res
			.status(200)
			.json({ id: photo._id, message: "Foto excluída com sucesso." });
	} catch (er) {
		res.status(404).json({ errors: "Foto não encontrada" });
	}
};

//Get All Photos
const getAllPhotos = async (req, res) => {
	const photos = await Photo.find({})
		.sort([["createdAt", -1]])
		.exec();
	res.status(200).json(photos);
};

//Get user photos
const getUserPhotos = async (req, res) => {
	const { id } = req.params;
	const photos = await Photo.find({ userId: id })
		.sort([["createdAt", -1]])
		.exec();
	return res.status(200).json(photos);
};

module.exports = {
	insertPhoto,
	deletePhoto,
	getAllPhotos,
	getUserPhotos
};
