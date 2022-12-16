const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
	activity: { type: String, required: true },
	user: { type: String },
	status: { type: Boolean, required: true, default: false },
});

// Export model
module.exports = mongoose.model("list", todoSchema);
