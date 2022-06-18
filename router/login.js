const express = require("express");
const Joi = require("joi");
const UserInfo = require("../model/userInfoSchema");
const bcrypt = require("bcryptjs");
const genAuthToken = require("../authenticate/genAuthToken");
const router = express.Router();

router.post("/", async(req, res) => {
    const {email, password} = req.body;
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required()
    });
    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await UserInfo.findOne({email});

    if(!user) return res.status(400).send("User not found");

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) return res.status(400).send("Invalid email or password");

    const token = genAuthToken(user);
    res.send(token);

});

module.exports = router;