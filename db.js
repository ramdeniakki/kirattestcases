const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
	email: String,
	password: String,
	name: String,
});

const Todo = new Schema({
	UserId: ObjectId,
	title: String,
	done: Boolean,
});

const UserModel = mongoose.model("User", User);
const TodoModel = mongoose.model("Todo", Todo);

module.exports = {
	UserModel,
	TodoModel,
};
