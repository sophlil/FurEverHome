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
    name: {type: String, required: true},
    species: {type: String, required: true},                   // dog, cat, other
    breed: {type: String, required: true},                  // most common ones + "Other"
    disposition: {
        "goodWithChildren": {type: Boolean},
        "goodWithOtherAnimals": {type: Boolean},
        "mustBeLeashed": {type: Boolean}
    },
    availability: {type: String, require: true},             // "Not available", "Available", "Pending", "Adopted" 
    photo: {type: String},
    weight: {type: Number, required: true},
    height: {type: Number, required: true},
    description: {type: String, required: true},
    age: {type: Number, required: true},
    dateAvailable: {type: Date, default: Date.now, require: true},
    createByUserId: {type: String, required: false}
}, {
    versionKey: false
});

// Animal Profile Model
const animalProfileModel = mongoose.model("AnimalProfiles", animalProfilesSchema);


// CRUD
// Create animal profile
const createAnimalProfile = async (name, species, breed, goodWithChildren, goodWithOtherAnimals, mustBeLeashed, availability, photo, weight, height, description, age, dateAvailable, createByUserId) => {
    try {
        const animalProfile = new animalProfileModel(
            {
                name: name, 
                species: species, 
                breed: breed, 
                disposition: {
                    goodWithChildren: goodWithChildren,
                    goodWithOtherAnimals: goodWithOtherAnimals,
                    mustBeLeashed: mustBeLeashed,
                },
                availability: availability, 
                photo: photo,
                weight: weight, 
                height: height, 
                description: description, 
                age: age, 
                dateAvailable: dateAvailable,
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
const getAnimalProfileByName = async (name) => {
    const query = animalProfileModel.find({ name: name});
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
const updateAnimalById = async (id, name, species, breed, goodWithChildren, goodWithOtherAnimals, mustBeLeashed, availability, photo, weight, height, description, age, dateAvailable, createByUserId) => {
    const updateResponse = await animalProfileModel.replaceOne({_id: id}, {
        name: name,
        species: species,
        breed: breed,
        disposition: {
            goodWithChildren: goodWithChildren,
            goodWithOtherAnimals: goodWithOtherAnimals,
            mustBeLeashed: mustBeLeashed,
        },
        availability: availability,
        photo: photo,
        weight: weight, 
        height: height, 
        description: description, 
        age: age, 
        dateAvailable: dateAvailable,
        createByUserId: createByUserId
    });
    return {
        id: id,
        name: name,
        species: species,
        breed: breed,
        disposition: {
            goodWithChildren: goodWithChildren,
            goodWithOtherAnimals: goodWithOtherAnimals,
            mustBeLeashed: mustBeLeashed,
        },
        availability: availability,
        photo: photo,
        weight: weight, 
        height: height, 
        description: description, 
        age: age, 
        dateAvailable: dateAvailable,
        createByUserId: createByUserId
    }
};

// Delete
const deleteAnimalById = async(id) => {
    return await animalProfileModel.deleteOne({_id: id}).exec();
}


export {createAnimalProfile, getAllAnimalProfiles, getAnimalProfileByName, getAnimalProfileByID, getAnimalSearch, updateAnimalById, deleteAnimalById};