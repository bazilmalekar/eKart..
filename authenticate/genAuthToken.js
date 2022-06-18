const jwt = require("jsonwebtoken");

const genAuthToken = (user) => {
    const token = jwt.sign({
        name: user.name,
        email: user.email,
        _id: user._id
    }, process.env.SECRET_KEY);
    return token;
}

module.exports = genAuthToken;