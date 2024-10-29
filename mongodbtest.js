const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECERT = "JOKER";

mongoose.connect(
	"mongodb+srv://admin:admin%400701@cluster0.xujxl.mongodb.net/todo-app-aadi_DB",
);
app.use(express.json());

app.post("/signup", async function (req, res) {
	const { email, password, name } = req.body;
	await UserModel.create({
		email,
		password,
		name,
	});
	res.json({
		msg: "You are sighned up successfully",
	});
});

app.post("/signin", async function (req, res) {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email, password });
	if (user) {
		const token = jwt.sign(
			{
				id: user._id.toString(),
			},
			JWT_SECERT,
		);
		res.json({
			token: token,
		});
	} else {
		res.json({
			message: "Invalid Credentials",
		});
	}
});
function Auth(req, res, next) {
	const token = req.headers.token;
	const decodedData = jwt.verify(token, JWT_SECERT);

	if (decodedData) {
		req.userId = decodedData.id;
		next();
	} else {
		res.status(403).json({
			message: "Invalid Token",
		});
	}
}

app.post("/todo", Auth, async function (req, res) {
	const UserId = req.userId;
	const { title } = req.body;
	await TodoModel.create({
		title,
		UserId,
	});
	res.json({
		userId: UserId,
	});
});

app.get("/todos", Auth, async function (req, res) {
	const userId = req.userId;
	const todos = await TodoModel.find({ UserId: userId });
	res.json({
		todos,
	});
});
app.listen(3000);
