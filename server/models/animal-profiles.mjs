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

// Defines Animal Profile Schema
<<<<<<< HEAD
const animalProfilesSchema = mongoose.Schema({
    animalName: {type: String, required: true, unique: true},
    type: {type: String, required: true},                   // dog, cat, other
    breed: {type: String, required: true},                  // most common ones + "Other"
    disposition: {type: String, required: true},            // "Good with other animals", "Good with children", "Animal must be leashed at all times"
    isAvailable: {type: Boolean, require: true},
    dateCreated: {type: Date, default : Date.Now, require: true},
=======
const animalSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},                   // dog, cat, other
    breed: {type: String, required: true},                  // most common ones + "Other"
    disposition: {type: String, required: true},            // "Good with other animals", "Good with children", "Animal must be leashed at all times"
    dateCreated: {type: Date, required: true},
    isAvailable: {type: Boolean, require: true},
>>>>>>> 0950a40 (create animal-profile)
    createByUserId: {type: String, required: true}
}, {
    versionKey: false
});

<<<<<<< HEAD
// Animal Profile Model
const animalProfileModel = mongoose.model("AnimalProfiles", animalProfilesSchema);

// CRUD
// Create animal profile
const createAnimalProfile = async (animalName, type, breed, disposition, isAvailable, createByUserId) => {
    try {
        const now = Date.now();
        const animalProfile = new animalProfileModel(
            {
                animalName: animalName, 
                type: type, 
                breed: breed, 
                disposition: disposition, 
                isAvailable: isAvailable, 
                dateCreated: now,
                createByUserId: createByUserId
            }
        );
        const savedProfile = await animalProfile.save();
        console.log('Animal profile created successfully:', savedProfile);
        return savedProfile;
    } catch (error) {
        console.error('Error creating animal profile:', error);
        throw error;
    }
}

// Read (get) all animal profiles
const getAllAnimalProfiles = async () => {
    const query = animalProfileModel.find();
    return query.exec();
}

// Read (get) animal profiles by name
const getAnimalProfileByName = async (animalName) => {
    const query = animalProfileModel.find({ animalName: animalName});
    return query.exec();
}

// Read (get) animal profile by ID
const getAnimalProfileByID = async (id) => {
    const query = animalProfileModel.findById(id);
    return query.exec();
}

// Update
const updateAnimalById = async (id, animalName, type, breed, disposition, isAvailable, dateCreated, createByUserId) => {
    const updateResponse = await animalProfileModel.replaceOne({_id: id}, {
        animalName: animalName,
        type: type,
        breed: breed,
        disposition: disposition,
        isAvailable: isAvailable,
        dateCreated: dateCreated,
=======

// Models
const animalProfileModel = mongoose.model("AnimalProfiles", animalSchema);


// CRUD
// Update
const updateAnimalById = async (id, name, type, breed, disposition, isAvailable) => {
    const updateResponse = await animalProfileModel.replaceOne({_id: id}, {
        name: name,
        type: type,
        breed: breed,
        disposition: disposition,
        dateCreated: dateCreated,
        isAvailable: isAvailable,
>>>>>>> 0950a40 (create animal-profile)
        createByUserId: createByUserId
    });
    return {
        id: id,
<<<<<<< HEAD
        animalName: animalName,
        type: type,
        breed: breed,
        disposition: disposition,
        isAvailable: isAvailable,
        dateCreated: dateCreated,
=======
        name: name,
        type: type,
        breed: breed,
        disposition: disposition,
        dateCreated: dateCreated,
        isAvailable: isAvailable,
>>>>>>> 0950a40 (create animal-profile)
        createByUserId: createByUserId
    }
};

// Delete
const deleteAnimalById = async(id) => {
<<<<<<< HEAD
    return await animalProfileModel.deleteOne({_id: id}).exec();
}


export {createAnimalProfile, getAllAnimalProfiles, getAnimalProfileByName, getAnimalProfileByID, updateAnimalById, deleteAnimalById};
=======
    const deleteResponse = await animalProfileModel.deleteOne({_id: id});
    return deleteResponse.deletedCount;
}




export {updateAnimalById, deleteAnimalById};
>>>>>>> 0950a40 (create animal-profile)
