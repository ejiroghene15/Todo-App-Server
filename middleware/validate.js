const jwt = require("jsonwebtoken");

// * middleware to validate all incoming requests coming from the client
function verifyAuth(req, res, next) {
	let token = req.headers.bearer;
	jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
		if (err) return res.status(403).send("Invalid authorization");
		let { user } = data;
		req.user = user;
		next();
	});
}

module.exports = verifyAuth;
