import mongoose from "mongoose";


const connection = async() =>{

    try {
        mongoose.connect(process.env.DB)
        console.log("Connected to database")
        
    } catch (error) {
        console.log(error)
    }
}

export default connection;