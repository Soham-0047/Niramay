import { GoogleGenerativeAI } from "@google/generative-ai"
import User from "../models/user.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'



export const sample = (req,res) =>{
    res.send({message:"hi"})
}



//Update User

export const updateUser = async(req,res,next) =>{

    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"you can only update your account"))
    }

    try {
        
        if(req.body.password){
            req.body.password = bcryptjs.hashSync()
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,{
                $set : {
                    name: req.body.name,
                    username:req.body.username,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture,
                }
            },
            {new:true}
        )

        const {password,...rest} = updatedUser._doc;

        res.status(200).json(rest)

        
    } catch (error) {
        next(error)
    }
}



//Delete user

export const deleteUser = async(req,res,next) =>{

    if(req.user.id !== req.params.id){
        return next(errorHandler(401,'You can only delete your account'))

    }
    try {
       await User.findByIdAndDelete(req.params.id) 

       res.status(200).json('User has been deleted...')

    } catch (error) {
     next(error)
    }
}





export const chatbotController = async (req, res) => {
    try {
      const { text } = req.body;
  
      // Create a new instance of GoogleGenerativeAI with your API key
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  
      // Get the generative model (in this case, 'gemini-pro')
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
      // Specify  prompt (use the provided text from the request body)
      const prompt = text;
  
      // Generate content using the generative model
      const result = await model.generateContent(prompt);
  
      // Extract the generated text from the response
      const response = await result.response;
      const generatedText = response.text();
  
      // Return the generated text in the response
      return res.status(200).json({ generatedText });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
  