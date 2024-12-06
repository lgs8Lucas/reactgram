const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
	// Sign the token with the id and the secret key, expires in 7 days
	// The token contains the id of the user for authentication and authorization purposes
	return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

// Register user and sign in
const register = async (req, res) => {
	res.send("registro");
};

module.exports = {
	register,
};
