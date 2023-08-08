import mongoose from "mongoose";

const chatCollection = "ChatMessages";

const messageSchema = new mongoose.Schema({
    user:{
        type:String,
        unique:true
    },
    message:{
        type:String,
        required:true
    }
});

export const chatModel = mongoose.model(chatCollection,messageSchema);