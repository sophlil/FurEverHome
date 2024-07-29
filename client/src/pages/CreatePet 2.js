import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AnimalProfileForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('Dog');
    const [breed, setBreed] = useState('');
    const [goodWithChildren,setGoodWithChildren] = useState(false);
    const [goodWithOtherAnimals,setGoodWithOtherAnimals] = useState(false);
    const [mustBeLeashed,setMustBeLeashed] = useState(false);
    const [photo, setPhoto] = useState('');
    const [availability, setAvailabilty] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');
    const [daysSinceAvailable, setDaysSinceAvailable] = useState('');


    const history = useHistory();

    return (
        <div>
        <h1>Enter a Pet</h1>
        <input
            type="text"
            placeholder="Enter name here"
            value={name}
            onChange={e => setName(e.target.value)} />
        <select value={species} onChange={e => setSpecies(e.target.value)} >
            <option value={"Dog"}>Dog</option>
            <option value={"Cat"}>Cat</option>
            <option value={"Other"}>Other</option>
            </select>
         <input
            type="Text"
            value={breed}
            placeholder="Enter Breed here"
            onChange={e => setBreed(e.target.value)} />
        <div>
            <label>
                <input
                    type="checkbox"
                    checked = {goodWithChildren}
                    onChange = {e => setGoodWithChildren(e.target.value)}
                />
                Good with Children
            </label>
             <label>
                <input
                    type="checkbox"
                    checked = {goodWithOtherAnimals}
                    onChange = {e => setGoodWithOtherAnimals(e.target.value)}
            />
                Good with other Animals
            </label>
            <label>
                <input
                    type="checkbox"
                    checked = {mustBeLeashed}
                    onChange = {e => setMustBeLeashed(e.target.value)}
                />
                    Animal must be leashed at all times
            </label>
        </div>
        <input
            type="text"
            placeholder="Enter photo URL here"
            value={photo}
            onChange={e => setPhoto(e.target.value)} 
        />
        <select value={availability} onChange={e => setAvailabilty(e.target.value)} >
            <option value={"Not Available"}>Not Available</option>
            <option value={"Available"}>Available</option>
            <option value={"Pending"}>Pending</option>
            <option value={"Adopted"}>Adopted</option>
            </select>
        <input
            type="text"
            placeholder="Enter weight in lbs"
            value={weight}
            onChange={e => setWeight(e.target.value)} />
        <input
            type="text"
            placeholder="Enter height in feet"
            value={height}
            onChange={e => setHeight(e.target.value)} />
        <input
            type="text"
            placeholder="Enter animal description"
            value={description}
            onChange={e => setDescription(e.target.value)} />
        <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={e => setAge(e.target.value)} />
        <input
            type="number"
            placeholder="Enter Days Since Available to Adopt"
            value={daysSinceAvailable}
            onChange={e => setDaysSinceAvailable(e.target.value)} />
        <button
        >Add</button>
    </div>
    ); 
}

export default AnimalProfileForm;


