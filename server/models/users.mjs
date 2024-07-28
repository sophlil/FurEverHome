import mongoose from "mongoose";
import {encrypt} from "../lib/auth.mjs";
import "dotenv/config";


mongoose.connect(process.env.MONGODB_CONNECT_STRING,
    {user: process.env.MONGODB_USER, pass: process.env.MONGODB_PASSWORD}
);

const db = mongoose.connection;

db.once("open", (err) => {
    if (err) {
        res.status(500).json({error: '500: Unable to connect to server.' });
    }
    else {
        console.log("Connection Established -- Users");
    }
});

// Schemas
const usersSchema = mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String, required: true}
}, {
    versionKey: false
});


// Models
const usersModel = mongoose.model("Users", usersSchema);


// CRUD
const createUser = async (userName, password, type) => {
    const hashed = await encrypt(password);
    const user = new usersModel({
        userName: userName,
        password: hashed,
        type: type
    });
    return user.save();
};

const getUserByUserName = async (userName) => {
    return await usersModel.findOne({'userName': userName}).exec();
};

const getUserByID = async (ID) => {
    return await usersModel.findById(ID).exec();
};


const deleteUser = async(id) => {
    const userDelete = usersModel.deleteOne({_id: id})
    userDelete.then(deleteCount => {
        return deleteCount.deleteCount;
    })
}


// To be removed
const getAllUser = async () => {
    const query = usersModel.find();
    return query.exec();
};


export {createUser, getAllUser, getUserByUserName, getUserByID, deleteUser};