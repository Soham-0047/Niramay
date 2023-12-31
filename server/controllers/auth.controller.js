import User from "../models/user.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

import jwt from 'jsonwebtoken'



export const signup = async (req, res, next) => {

    // console.log(req.body)
    //* Destructure the req body and get the name, email, password

    const { name, username, email, password } = req.body;

    //create a hashpassword
    //* As we used hashSync if not used then can be used async or await

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({ name, username, email, password: hashedPassword });

    try {
        await newUser.save();

        res.status(200).json({ message: "user signup" })
    } catch (error) {
        // res.status(500).json(error.message);

        next(error)

        //! Maybe here we can use our custom error
        // next(errorHandler(300,'some custom message'))
    }

}


export const signin = async (req, res, next) => {
    const { email, username, password } = req.body;

    try {

        const validUser = await User.findOne({ email })

        console.log(validUser)

        if (!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password)

        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials'));

        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET)

        //! If not used ._doc then unecessary information 

        const { password: hashedPassword
            , ...rest } = validUser._doc;

        //? If user need to restrict the session of user

        // const expiryDate = new Date(Date.now() + 3600000) // 1 hour

        // res.cookie('access_token',token,{httpOnly:true, expires:expiryDate}).status(200).json(rest)


        //! To make the password more secure and not send to the client side we will use rest

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)

        // res.cookie('access_token',token,{httpOnly:true}).status(200).json(validUser)


    } catch (error) {
        next(error)
    }

}



export const signout = (req,res) =>{

    res.clearCookie('access_token').status(200).json("Signout Success");
}



export const google = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            const { password: hashedPassword, ...rest } = user._doc;

            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)

        } else {

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                name: req.body.name,
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo
            })

            await newUser.save()

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

            const { password: hashedPassword2, ...rest } = newUser._doc;

            res.cookie('access-token', token, {
                httpOnly: true,
            }).status(200).json(rest)
        }



    } catch (error) {
        next(error)
    }
}