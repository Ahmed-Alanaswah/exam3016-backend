"use strict";
const superagent = require("superagent");

const getData = async (req, res) => {
	superagent
		.get("https://fruit-api-301.herokuapp.com/getFruit")
		.then((data) => {
			const responseData = data.body.fruits.map((fruit) => {
				return fruit;
			});

			res.send(responseData);
		});
};

module.exports = { getData };
