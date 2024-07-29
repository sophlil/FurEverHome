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

    const adminProfileQuery = adminProfilesModel.findOne({'userId': userId}).exec();

    adminProfileQuery.then(adminProfile => {
        const updateResponse = adminProfilesModel.replaceOne({_id: adminProfile._id.toString()}, {
            name: name,
            address: address,
            userId: userId
        });
        updateResponse.then(results => {
            console.log(results)
            return {
                id: id,
                name: name,
                address: address,
                userId: userId
            }
        })
    })
};

// Delete
const deleteAdminProfileById = async(id) => {

    const adminProfileQuery = adminProfilesModel.findOne({'userId': id}).exec();

    adminProfileQuery.then(adminProfile => {
        console.log(adminProfile)
        const deleteResponse = adminProfilesModel.deleteOne({_id: adminProfile._id.toString()});

        deleteResponse.then(deleteCount => {
            const deleteUser = userDbFunction.deleteUser(id);

            deleteUser.then(results => {
                return results;
            })
        })
    })
}


export {createAdminProfile, getAdminProfileById, updateAdminProfileById, deleteAdminProfileById};