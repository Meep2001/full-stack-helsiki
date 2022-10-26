require("./models/blog");
const express=require('express')
const logger = require("./utils/logger");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const cors = require("cors");
const app = express();

app.use(express.static("./build"))
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
