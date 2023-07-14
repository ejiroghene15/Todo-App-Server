const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
let { engine } = require("express-handlebars");
const morgan = require("morgan");
const cors = require("cors");


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = express();

const todoController = require("./routes/todo");
const authController = require("./routes/auth");

// view engine setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// * Cors
app.use(
	cors({
		origin: "*",
	})
);

app.get("/", function (req, res) {
	res.send("works");
});

// * Todo routes
app.use("/todo", todoController);

// * Authenticate Client
app.use("/auth", authController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(400).send("Invalid route");
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
});

app.listen(process.env.PORT, function () {
	console.log("app started on " + process.env.PORT);
});

module.exports = app;
