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
        console.log("Connection Established -- Public Profile");
    }
});

// Schemas
const publicProfilesSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    userId: {type: String, required: true}
}, {
    versionKey: false
});


// Models
const publicProfilesModel = mongoose.model("PublicProfiles", publicProfilesSchema);


// CRUD
const createPublicProfile = async (name, userId) => {
    const user = new publicProfilesModel({
        name: name,
        userId: userId
    });
    return user.save();
};

const getPublicProfileById = async (ID) => {
    return await publicProfilesModel.findOne({'userId': ID}).exec();
};

// Update
const updatePublicProfileById = async (id, name, userId) => {
    const updateResponse = await publicProfilesModel.replaceOne({_id: id}, {
        name: name,
        userId: userId
    });
    return {
        id: id,
        name: name,
        userId: userId
    }
};

// Delete
const deletePublicProfileById = async(id) => {
    const deleteResponse = await publicProfilesModel.deleteOne({_id: id});
    return deleteResponse.deletedCount;
}


export {createPublicProfile, getPublicProfileById, updatePublicProfileById, deletePublicProfileById};