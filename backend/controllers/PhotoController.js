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

//Get photo by id
const GetPhotoById = async (req, res) => {
	const { id } = req.params;
	const photo = await Photo.findById(id);
	//Check if photo exists
	if (!photo) {
		res.status(404).json({ errors: ["Foto não encontrada."] });
		return;
	}
	return res.status(200).json(photo);
};

//Update a Photo
const updatePhoto = async (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	const reqUser = req.user;

	const photo = await Photo.findById(id);

	// Check if photo exsists
	if (!photo) {
		res.status(404).json({ errors: ["Foto não encontrada."] });
		return;
	}

	//Check if photo belongs user
	if (!photo.userId.equals(reqUser._id)) {
		res.status(422).json({
			errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
		});
		return;
	}

	if (title) {
		photo.title = title;
	}

	await photo.save();
	res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

//Like functionalitty
const likePhoto = async (req, res) => {
	const { id } = req.params;
	const reqUser = req.user;

	const photo = await Photo.findById(id);
	// Check if photo exsists
	if (!photo) {
		res.status(404).json({ errors: ["Foto não encontrada."] });
		return;
	}

	//Check if user Already liked the photo
	if (photo.likes.includes(reqUser.id)) {
		photo.likes.splice(photo.likes.indexOf(reqUser.id), 1);
		await photo.save();
		return res.status(200).json({
			photoId: id,
			userId: reqUser._id,
			message: "Curtida retirada.",
		});
	}

	//put user id in likes array
	photo.likes.push(reqUser._id);
	await photo.save();
	return res.status(200).json({
		photoId: id,
		userId: reqUser._id,
		message: "A foto foi curtida.",
	});
};
//Comment functionality
const commentPhoto = async (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;
	const reqUser = req.user;

	const user = await User.findById(reqUser._id);

	const photo = await Photo.findById(id);
	// Check if photo exsists
	if (!photo) {
		res.status(404).json({ errors: ["Foto não encontrada."] });
		return;
	}

	//Put comment in the array comments
	const userComment = {
		comment,
		userName: user.name,
		userImage: user.profileImage,
		userId: user._id,
	};
	photo.comments.push(userComment);
	await photo.save();
	res.status(200).json({
		comment: userComment,
		message: "o comentário foi adicionado com sucesso.",
	});
};

module.exports = {
	insertPhoto,
	deletePhoto,
	getAllPhotos,
	getUserPhotos,
	GetPhotoById,
	updatePhoto,
	likePhoto,
	commentPhoto,
};
