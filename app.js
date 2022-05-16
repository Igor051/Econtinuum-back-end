require("dotenv").config();
require("./src/configs/database").connect();
const cors = require("cors");
let bodyParser = require('body-parser');
const express = require("express");
const app = express();

const {GoogleAuthRedirect, GoogleAuthController, notFoundErrorController} = require("./src/controllers");

const { registerRouter, loginRouter, activitiesRouter, taskRouter } = require("./src/routes");

app.use(express.json());
app.use(cors());

app.use(bodyParser.raw({
    type: 'image/png',
    limit: '10mb'
}));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/activities", activitiesRouter)
app.use("/task", taskRouter)

// url for register or login
app.get("/auth/google", GoogleAuthRedirect);
// url for redirecting
app.get("/auth/google/profile", GoogleAuthController);

app.all("*", notFoundErrorController);

module.exports = app;
