const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

const value = {
	username: "test_testDev",
	age: 21,
	BankAccountNumber: 3456978546,
	BankName: "HackerUserGroup",
};

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6eyJuYW1lIjoiYWtraSIsImFjY291bnROdW1iZXIiOiI0NTY5NzE2NTQ2NTMiLCJhY2NvdW50QnJhbmNoIjoiU0JJIn0sImlhdCI6MTcyOTY2MDEyNn0.PfeKJevIk8uBZ8kSx5_TJ8X10h0cH-ACiOqUolaS9YQ";

const secretKey = "JOKER";

try {
	const verified = jwt.verify(token, secretKey);
	console.log(verified);
} catch (err) {
	console.error("Token verification failed", err);
}

const users = []
console.log(users);

