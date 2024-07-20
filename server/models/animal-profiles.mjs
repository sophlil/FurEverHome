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
const animalProfilesSchema = mongoose.Schema({
    animalName: {type: String, required: true, unique: true},
    type: {type: String, required: true},                   // dog, cat, other
    breed: {type: String, required: true},                  // most common ones + "Other"
    disposition: {type: String, required: false},           // "Good with other animals", "Good with children", "Animal must be leashed at all times"
    dateCreated: {type: Date, required: true},
    isAvailable: {type: Boolean, require: true},
    createByUserId: {type: String, required: true}
}, {
    versionKey: false
});

// Animal Profile Model
const animalProfileModel = mongoose.model("AnimalProfiles", animalProfilesSchema)

// CRUD
// Create animal profile
const addAnimalProfile = async (data) => {
    try {
        const animalProfile = new animalProfileModel(data);
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
    const query = animalProfileModel.findByID(id);
    return query.exec();
}


export {addAnimalProfile, getAllAnimalProfiles, getAnimalProfileByName, getAnimalProfileByID};
