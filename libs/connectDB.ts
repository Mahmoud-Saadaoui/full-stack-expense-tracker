import mongoose from 'mongoose'

const url = process.env.MONGO_URI as string

async function connectDB() {
    return await mongoose
        .connect(url)
        .then(()=>{
            console.log("Connected To MongoDB")
        }).catch((err)=>{
            console.log(`Failed To Connect To MOngoDB. Error: ${err}`)
        })
}

export default connectDB;