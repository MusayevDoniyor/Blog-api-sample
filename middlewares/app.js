const express = require("express");
const app = express();
const cors = require("cors");
const postRouter = require("../routes/post.router");

app.use(express.json());
app.use(cors());

app.use("/api/posts", postRouter);

module.exports = app;
