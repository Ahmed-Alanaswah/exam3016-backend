"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const {
	createFavFruit,
	getFruitData,
	deleteFavData,
	updateData,
} = require("./controller/controller.crud");

require("dotenv").config();
// const { getData } = require("./controller/controller.fruit");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fuits", {
	useNewUrlParser: true,

	useUnifiedTopology: true,
});

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

const data = require("./data.json");
const getData = (req, res) => {
	res.send(data.fruits);
};
app.listen(PORT, () => {
	console.log(`server start with ${PORT}`);
	// console.log(data);
});

app.get("/fruit", getData);
app.post("/fruit/favourite", createFavFruit);
app.get("/fruit/favourite", getFruitData);
app.delete("/fruit/favourite/:slug", deleteFavData);
app.put("/fruit/favourite/:slug", updateData);
