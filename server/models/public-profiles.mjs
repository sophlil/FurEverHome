import mongoose from "mongoose";
import "dotenv/config";
import * as userDbFunction from './users.mjs';


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
    name: {type: String, required: true, unique: false},
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

    const publicProfileQuery = publicProfilesModel.findOne({'userId': userId}).exec();

    publicProfileQuery.then(publicProfile => {
        const updateResponse = publicProfilesModel.replaceOne({_id: publicProfile._id.toString()}, {
            name: name,
            userId: userId
        });
        updateResponse.then(results => {
            return {
                id: id,
                name: name,
                userId: userId
            }
        })
    })
};

// Delete
const deletePublicProfileById = async(id) => {

    const publicProfileQuery = publicProfilesModel.findOne({'userId': id}).exec();

    publicProfileQuery.then(publicProfile => {
        console.log(publicProfile)
        const deleteResponse = publicProfilesModel.deleteOne({_id: publicProfile._id.toString()});

        deleteResponse.then(deleteCount => {
            const deleteUser = userDbFunction.deleteUser(id);

            deleteUser.then(results => {
                return results;
            })
        })
    })
}


export {createPublicProfile, getPublicProfileById, updatePublicProfileById, deletePublicProfileById};