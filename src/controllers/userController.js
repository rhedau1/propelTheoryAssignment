const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const { isValidRequestBody, isValid } = require('../validator/validator');


const createUser = async (req, res) => {
    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid Request parameters. Please provide User details' })
        }
        const { firstName, lastName, contactNumber, email, password } = requestBody;

        if (!isValid(firstName.trim())) {
            return res.status(400).send({ status: false, message: 'firstName is required' })
        }

        if (!isValid(lastName.trim())) {
            return res.status(400).send({ status: false, message: 'lastName is required' })
        }

        if (!isValid(contactNumber)) {
            return res.status(400).send({ status: false, message: 'contact num. is required' })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'email is required' })
        }

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: 'Email should be valid email' })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' })

        }

        const userCreated = await userModel.create(requestBody)
        res.status(201).send({ status: true, message: "Success", data: userCreated })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const loginUser = async function (req, res) {
    try {
        let userName = req.body.email;
        let password = req.body.password;
        if (!userName || !password) {
            return res.status(400).send({ status: false, msg: "email and password must be present" })
        }

        let user = await userModel.findOne({ email: userName, password: password });
        if (!user)
            return res.status(400).send({
                status: false,
                msg: "user name or the password is not correct",
            });

        let token = jwt.sign(
            { userID: user._id.toString() }, 'kuch bhi', { expiresIn: "300000 m" }
        );
        res.setHeader("x-api-key", token);
        return res.status(201).send({ status: true, msg: "success", data: token });
    }
    catch (err) {

        return res.status(500).send({ msg: "Error", error: err.message })
    }
}



module.exports = { createUser, loginUser }