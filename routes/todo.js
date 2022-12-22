const router = require("express").Router();
require("../db/index");
let todo = require("../models/list");
const { ObjectId } = require("bson");
const verifyAuth = require("../middleware/validate");

// * Get all Todo Items
router.get("/", verifyAuth, async function (req, res) {
	let result = await todo.find({ user: req.user });
	res.json(result);
});

// * Get all Todo Items
router.get("/:item", verifyAuth, async function (req, res) {
	let { item } = req.params;
	let result = await todo.findById(item);
	res.json(result);
});

// * Add new Todo item
router.post("/new", verifyAuth, function (req, res) {
	let { activity } = req.body;
	let { user } = req;

	todo.create({ activity, user }).then(async (_, err) => {
		if (err) {
			res.status(400).send("Could not create todo");
		}
		let result = await todo.find();
		res.json(result);
	});
});

// * Update Todo Item
router.put("/update/:id", verifyAuth, function (req, res) {
	let { id } = req.params;
	let { activity, status } = req.body;

	todo.findByIdAndUpdate(
		id,
		{ activity, status },
		{ new: true },
		function (err, data) {
			if (err) {
				res.status(400).send("Could not create todo");
			}
			res.json(data);
		}
	);
});

// * Delete Todo item
router.delete("/delete/:id", verifyAuth, function (req, res) {
	let { id } = req.params;
	todo.deleteOne({ _id: ObjectId(id) }).then((data, err) => {
		if (err) {
			res.status(400).send("Could not create todo");
		}
		res.send("item deleted");
	});
});

module.exports = router;
