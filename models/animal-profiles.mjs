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
        console.log("Connection Established -- Adnimal Profile");
    }
});

// Defines Animal Profile Schema
const animalProfilesSchema = mongoose.Schema({
    animalName: {type: String, required: true, unique: true},
    type: {type: String, required: true},                   // dog, cat, other
    breed: {type: String, required: true},                  // most common ones + "Other"
    disposition: {type: [String], required: false},            // "Good with other animals", "Good with children", "Animal must be leashed at all times"
    isAvailable: {type: String, require: true},             // "Not available", "Available", "Pending", "Adopted" 
    dateCreated: {type: Date, default : Date.Now, require: true},
    createByUserId: {type: String, required: true}
}, {
    versionKey: false
});

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

// Search Animal Database
const getAnimalSearch = async (searchValues) => {
    const query = animalProfileModel.find(searchValues);
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
        createByUserId: createByUserId
    });
    return {
        id: id,
        animalName: animalName,
        type: type,
        breed: breed,
        disposition: disposition,
        isAvailable: isAvailable,
        dateCreated: dateCreated,
        createByUserId: createByUserId
    }
};

// Delete
const deleteAnimalById = async(id) => {
    return await animalProfileModel.deleteOne({_id: id}).exec();
}


export {createAnimalProfile, getAllAnimalProfiles, getAnimalProfileByName, getAnimalProfileByID, getAnimalSearch, updateAnimalById, deleteAnimalById};
