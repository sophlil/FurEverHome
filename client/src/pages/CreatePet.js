import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import SimpleFileUpload from 'react-simple-file-upload';
import axios from 'axios';

const SpeciesBreeds = {
    Dog:["Corgi","Golden Retriever","German Shepard","Other"],
    Cat:["Tabby", "Siamese", "Persian","Other"],
    Other:["Parrot","Rabbit","Bearded Dragon","Other"]
}

export const AnimalProfileForm = () => {
//    const [formData, setFormData] = useState({});
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('Dog');
    const [breed, setBreed] = useState('');
    const [goodWithChildren,setGoodWithChildren] = useState(false);
    const [goodWithOtherAnimals,setGoodWithOtherAnimals] = useState(false);
    const [mustBeLeashed,setMustBeLeashed] = useState(false);
    const [photo, setPhoto] = useState('');
    const [availability, setAvailability] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');
    const [daysSinceAvailable, setDaysSinceAvailable] = useState('');


    const history = useHistory();

    const handleUpload = (url) => {
        console.log(url);
        setPhoto(url);
    }

    const addPet = async () => {
        const newPet = {
            name,species,breed,disposition: {goodWithChildren,goodWithOtherAnimals,mustBeLeashed},
            availability,photo,weight,height,description,age,daysSinceAvailable
        };
        console.log(newPet);
        // setFormData(newPet)
        
        try { 
            const response = await axios.post('http://localhost:3005/register/animal', newPet);
            console.log("Pet added successfully:", response.data);
            history.push("/browse");
        } catch (error) {
            console.log("Error adding pet:", error);
        }

    };

    const speciesChange = (e) =>{
        setSpecies(e.target.value);
        setBreed('');
    };


    return (
        <div>
            <form onSubmit={addPet}>
        <h1>Enter a Pet</h1>

        <label>
        Pet Name:
        <input
            type="text"
            placeholder="Enter name here"
            value={name}
            onChange={e => setName(e.target.value)} />

            </label>
            <label>Species: </label>
        <select value={species} onChange={speciesChange} >
            <option value={"Dog"}>Dog</option>
            <option value={"Cat"}>Cat</option>
            <option value={"Other"}>Other</option>
            </select>
        <label>Breed: </label>
         <select value={breed} onChange={e => setBreed(e.target.value)}>
            <option value = "">Select Breed</option>
            {SpeciesBreeds[species].map((breed,index)=>(
                <option key={index} value={breed}>
                    {breed}
                </option>
            ))}


         </select>

        <div className="checkbox-group">
            <label>
                <input
                    type="checkbox"
                    checked = {goodWithChildren}
                    onChange = {e => setGoodWithChildren(e.target.checked)}
                />
                Good with Children
            </label>
             <label>
                <input
                    type="checkbox"
                    checked = {goodWithOtherAnimals}
                    onChange = {e => setGoodWithOtherAnimals(e.target.checked)}
            />
                Good with other Animals
            </label>
            <label>
                <input
                    type="checkbox"
                    checked = {mustBeLeashed}
                    onChange = {e => setMustBeLeashed(e.target.checked)}
                />
                    Animal must be leashed at all times
            </label>
        </div>
        <label>Upload Photo: </label>
        <div className="upload-wrapper">
            <SimpleFileUpload
              apiKey="f4473dfbd728d118570ccab0ad360359"
              onSuccess={handleUpload}
              preview="true"
            />
        </div>
        <label>Availability:  </label>
        <select value={availability} onChange={e => setAvailability(e.target.value)} >
            <option value={"Not Available"}>Not Available</option>
            <option value={"Available"}>Available</option>
            <option value={"Pending"}>Pending</option>
            <option value={"Adopted"}>Adopted</option>
            </select>
        <label>Weight: </label>
        <input
            type="text"
            placeholder="Enter weight in lbs"
            value={weight}
            onChange={e => setWeight(e.target.value)} />
        <label>Height:  </label>
        <input
            type="text"
            placeholder="Enter height in feet"
            value={height}
            onChange={e => setHeight(e.target.value)} />
         <label>Description: </label>
        <input
            type="text"
            placeholder="Enter animal description"
            value={description}
            onChange={e => setDescription(e.target.value)} />
        <label>Age </label>
        <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={e => setAge(e.target.value)} />
        <label>Days Since Available </label>
        <input
            type="number"
            placeholder="Enter Days Since Available to Adopt"
            value={daysSinceAvailable}
            onChange={e => setDaysSinceAvailable(e.target.value)} />
        <button
        type="submit"
        >Add Pet</button>
        </form>
    </div>

    );
}

export default AnimalProfileForm;


