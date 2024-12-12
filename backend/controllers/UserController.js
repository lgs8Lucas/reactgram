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
	const { name, email, password } = req.body;
	// Check if the user exists
	const user = await User.findOne({ email });
	if (user) {
		res.status(422).json({ errors: ["Por favor utilize outro e-mail."] });
		return;
	}
	// Generate password hash
	const salt = await bcrypt.genSalt();
	const passwordHash = await bcrypt.hash(password, salt);

	// Create user
	const newUser = await User.create({
		name,
		email,
		password: passwordHash,
	});

	// If user was created successfully, return the token
	if (!newUser) {
		res
			.status(422)
			.json({ errors: ["Houve um erro, tente novamente mais tarde."] });
		return;
	}

	res.status(201).json({
		_id: newUser._id,
		token: generateToken(newUser._id)
	})
};

module.exports = {
	register,
};
