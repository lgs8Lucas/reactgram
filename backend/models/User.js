const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,
		profile_image: String,
		bio: String,
	},
	{
		timestamps: true, // Cria campos de hora que foi criado e atualizado
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;