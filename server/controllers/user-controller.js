const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        if(loggedInUser) {
            return res.status(200).json({
                loggedIn: true,
                user: {
                    firstName: loggedInUser.firstName,
                    lastName: loggedInUser.lastName,
                    username: loggedInUser.username
                }
            }); //HTTP Headers Sent ERROR.
        }
        return;
    })
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !username || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                });
        }
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this username already exists."
                });
        }
        const existingUser2 = await User.findOne({ email: email });
        if (existingUser2) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email already exists."
                });
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, username, email, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                username: savedUser.username
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
}
loginUser = async (req, res) => {
    try {
        const { username, email, password} = req.body;
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingUser = await User.findOne({ username: username });
        if(!existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Username Not Found. Create an Account. "
                })
        }
        const existingUser2 = await User.findOne({ email: email });
        if(!existingUser2) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Email Not Found. Create an Account. "
                })
        }
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if(!passwordCorrect) {
            return res
            .status(400)
            .json({
                success: false,
                errorMessage: "Incorrect Password. Try Again. "
            })
        }
        const token = auth.signToken(existingUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                username: existingUser.username
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}
loginGuest = async (req, res) => {
    try {
        const firstName = 'guest';
        const lastName = 'guest';
        const username = 'guest';
        const passwordHash = 'guest';
        const guestUser = new User({
            firstName, lastName, username, passwordHash
        });
        const token = auth.signToken(guestUser);
        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: guestUser.firstName,
                lastName: guestUser.lastName,
                username: guestUser.username
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}
logoutUser = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = req.body;
        const token = {};
        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                username: loggedInUser.username
            }
        });
    })
}

module.exports = {
    getLoggedIn,
    registerUser, 
    loginUser,
    loginGuest,
    logoutUser,
}