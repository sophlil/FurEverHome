import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AnimalProfileForm = () => {
//    const [formData, setFormData] = useState({});
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('Dog');
    const [breed, setBreed] = useState('');
    const [goodWithChildren,setGoodWithChildren] = useState(false);
    const [goodWithOtherAnimals,setGoodWithOtherAnimals] = useState(false);
    const [mustBeLeashed,setMustBeLeashed] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [availability, setAvailability] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');
    const [daysSinceAvailable, setDaysSinceAvailable] = useState('');


    const history = useHistory();

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const addPet = () => {
        const newPet = {name,species,breed,goodWithChildren,goodWithOtherAnimals,mustBeLeashed,photo,availability,weight,height,description,age,daysSinceAvailable};
        console.log(newPet);
        setFormData(newPet)



        history.push("/");

    };


    return (
        <div>
            <form>
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
        <select value={species} onChange={e => setSpecies(e.target.value)} >
            <option value={"Dog"}>Dog</option>
            <option value={"Cat"}>Cat</option>
            <option value={"Other"}>Other</option>
            </select>
        <label>Breed: </label>
         <input
            type="Text"
            value={breed}
            placeholder="Enter Breed here"
            onChange={e => setBreed(e.target.value)} />
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
        <input
            type="file"
            onChange={handleFileChange}
        />
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
        onClick={addPet}
        >Add Pet</button>
        </form>
    </div>

    );
}

export default AnimalProfileForm;


