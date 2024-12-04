require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;
const app = express();

// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const routes = require("./routes/Router.js");
app.use(routes);

app.listen(port, () => {
	console.log("App rodando na porta " + port);
});
