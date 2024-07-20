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
        console.log("Connection Established");
    }
});

// Schemas
const adminProfilesSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    address: {type: String, required: true}
}, {
    versionKey: false
});


// Models
const adminProfilesModel = mongoose.model("AdminProfiles", adminProfilesSchema);


// CRUD
const createAdminProfile = async (name, address) => {
    const user = new adminProfilesModel({
        name: name,
        address: address
    });
    return user.save();
};

const getAdminProfileById = async (ID) => {
    return await adminProfilesModel.findById(ID).exec();
};

// Update
const updateAdminProfileById = async (id, name, type, breed, disposition, isAvailable) => {
    const updateResponse = await adminProfilesModel.replaceOne({_id: id}, {
        name: name,
        type: type,
        breed: breed,
        disposition: disposition,
        dateCreated: dateCreated,
        isAvailable: isAvailable,
        createByUserId: createByUserId
    });
    return {
        id: id,
        name: name,
        type: type,
        breed: breed,
        disposition: disposition,
        dateCreated: dateCreated,
        isAvailable: isAvailable,
        createByUserId: createByUserId
    }
};

// Delete
const deleteAdminProfileById = async(id) => {
    const deleteResponse = await adminProfilesModel.deleteOne({_id: id});
    return deleteResponse.deletedCount;
}


export {createAdminProfile, getAdminProfileById, updateAdminProfileById, deleteAdminProfileById};