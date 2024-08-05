import React, {useState} from 'react';
import PetList from '../components/petList';
import '../App.css';
import animals from '../data/data';


function Browse({pets, toggleFavorite,favorites}){

    const[filters,setFilter] = useState({
        species:'',
        breed:'',
        goodWithChildren:false,
        goodWithOtherAnimals:false,
        mustBeLeashed:false,

    });



    const FilterChange = (e) =>{
        const {name, value, type,checked} = e.target;
        setFilter(prevFilter => ({
            ...prevFilter, [name]: type === 'checkbox' ? checked : value

        }));
    };

    const petFilter = animals.filter(pet => {
        return (
            (filters.species === '' || pet.species === filters.species)&&
            (filters.breed === '' || pet.breed ===filters.breed)&&
            (!filters.goodWithChildren|| pet.disposition.goodWithChildren)&&
            (!filters.goodWithOtherAnimals|| pet.disposition.goodWithOtherAnimals)&&
            (!filters.mustBeLeashed || pet.disposition.mustBeLeashed)

        );
    });

    return(
        <>
        <h2>List of Pets</h2>
        <div className ="filter-box">
            <h3>Filter Pets</h3>
            <label>
                Species:
                <input type = "text" name = "species" value = {filters.species} onChange={FilterChange}/>
            </label>
            <label>
                Breed:
                <input type = "text" name = "breed" value = {filters.breed} onChange={FilterChange}/>
            </label>
            <label>
                Good With Children:
                <input type = "checkbox" name = "goodWithChildren" checked= {filters.goodWithChildren} onChange={FilterChange}/>
            </label>
            <label>
                Good With Other Animals:
                <input type = "checkbox" name = "goodWithOtherAnimals" checked = {filters.goodWithOtherAnimals} onChange={FilterChange}/>
            </label>
            <label>
                Animal Must Be Leashed At All Times:
                <input type= "checkbox" name = "mustBeLeashed" checked = {filters.mustBeLeashed} onChange={FilterChange}/>
            </label>
        </div>
        <PetList pets={petFilter} toggleFavorite={toggleFavorite} favorites={favorites}/>
        </>
);

}
export default Browse;