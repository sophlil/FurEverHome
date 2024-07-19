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
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    age: { type: Number, required: true },
    disposition: { type: String },
    availability: { type: String },
    weight: { type: Number },
    height: { type: Number },
    description: { type: String },
    dateCreated: { type: Date, default: Date.now }
}, {
    versionKey: false
});

// Animal Profile Model
const animalProfileModel = mongoose.model("AnimalProfiles", animalProfilesSchema)
