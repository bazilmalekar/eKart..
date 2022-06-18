const express = require("express");
const Joi = require("joi");
const UserInfo = require("../model/userInfoSchema");
const bcrypt = require("bcryptjs");
const genAuthToken = require("../authenticate/genAuthToken");
const router = express.Router();

router.post("/", async(req, res) => {
    const {name, email, password} = req.body;
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required()
    });

    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await UserInfo.findOne({email});

    if(user) return res.status(400).send("User already Exists");

    user = new UserInfo({
        name, email, password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();    
    const token = genAuthToken(user);
    res.send(token);
});

module.exports = router;