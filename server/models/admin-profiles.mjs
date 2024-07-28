import mongoose from "mongoose";
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
        console.log("Connection Established -- Admin Profile");
    }
});

// Schemas
const adminProfilesSchema = mongoose.Schema({
    name: {type: String, required: true, unique: false},
    address: {type: String, required: true},
    userId: {type: String, required: true}
}, {
    versionKey: false
});


// Models
const adminProfilesModel = mongoose.model("AdminProfiles", adminProfilesSchema);


// CRUD
const createAdminProfile = async (name, address, userId) => {
    const user = new adminProfilesModel({
        name: name,
        address: address,
        userId: userId
    });
    return user.save();
};

const getAdminProfileById = async (ID) => {
    return await adminProfilesModel.findOne({'userId': ID}).exec();
};

// Update
const updateAdminProfileById = async (id, name, address, userId) => {
    const updateResponse = await adminProfilesModel.replaceOne({_id: id}, {
        name: name,
        address: address,
        userId: userId
    });
    return {
        id: id,
        name: name,
        address: address,
        userId: userId
    }
};

// Delete
const deleteAdminProfileById = async(id) => {
    const deleteResponse = await adminProfilesModel.deleteOne({_id: id});
    return deleteResponse.deletedCount;
}


export {createAdminProfile, getAdminProfileById, updateAdminProfileById, deleteAdminProfileById};