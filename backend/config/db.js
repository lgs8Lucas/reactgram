const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const conn = async () => {
	try {
		const dbConn = await mongoose.connect(
			`mongodb+srv://${dbUser}:${dbPass}@cluster0.o898o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
		);
		console.log("Conectou ao banco");
		return dbConn;
	} catch (er) {
		console.log(er);
	}
};

conn();

module.exports = conn;
