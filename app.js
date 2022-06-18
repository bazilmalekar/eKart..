const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/conn");
const cors = require("cors");
const register = require("./router/register");
const login = require("./router/login");
const app = express();

app.use(cors());

dotenv.config({path: "./config.env"});
PORT = process.env.PORT || 5000;

connectDB();

const products = require("./model/userShcema");

app.use(express.json());

app.use(require("./router/auth"));
app.use("/register", register);
app.use("/login", login);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

app.listen(PORT, (req, res) => {
    console.log(`Server is active on port ${PORT}`);
});