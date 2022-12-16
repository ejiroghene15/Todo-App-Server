const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/", function (req, res) {
	let { user } = req.body;
	let token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });
	res.json({ token });
});

module.exports = router;
