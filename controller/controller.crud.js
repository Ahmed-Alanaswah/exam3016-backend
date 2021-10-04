"use strict";

const { FruitModel } = require("../model/modelSchema");

const createFavFruit = async (req, res) => {
	const { name, image, price } = req.body;

	const slug = name.toLowerCase().split(" ").join("-");

	FruitModel.find({ slug: slug }, (error, data) => {
		if (data.length > 0) {
			res.send(error);
		} else {
			const newFruitModel = new FruitModel({
				name: name,
				slug: slug,
				image: image,
				price: price,
			});
			newFruitModel.save();
			res.send(newFruitModel);
		}
	});
};

const getFruitData = async (req, res) => {
	const data = await FruitModel.find({});
	res.send(data);
};

const deleteFavData = (req, res) => {
	const slug = req.params.slug;
	FruitModel.deleteOne({ slug: slug }, async (error, data) => {
		if (error) {
			res.send(error);
		} else {
			const data = await FruitModel.find({});
			res.send(data);
		}
	});
};

const updateData = async (req, res) => {
	const slug = req.params.slug;
	const updateData = req.body;

	FruitModel.findOne({ slug: slug }, (error, data) => {
		data.name = updateData.name;
		data.image = updateData.image;
		data.price = updateData.price;
		data.save();
	});
	setTimeout(async () => {
		const data = await FruitModel.find({});
		res.send(data);
	}, 500);
};

module.exports = { createFavFruit, getFruitData, deleteFavData, updateData };
