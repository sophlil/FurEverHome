import React, {useState, useEffect} from 'react';
import PetList from '../components/petList';
import '../App.css';
import axios from 'axios';
// import animals from '../data/data';


function Browse({pets, toggleFavorite,favorites}){

    const[filters,setFilter] = useState({
        species:'',
        breed:'',
        goodWithChildren:false,
        goodWithOtherAnimals:false,
        mustBeLeashed:false,

    });


    const [getAnimals, setAnimals] = useState([]);

    const fetchAniamls = async () => {
        const result = axios.get("/animal")
        
        result.then((response) => {
            setAnimals(response.data)
            console.log(response.data)
            return response.data;
        })
    };
   

    const FilterChange = (e) =>{
        const {name, value, type,checked} = e.target;
        setFilter(prevFilter => ({
            ...prevFilter, [name]: type === 'checkbox' ? checked : value

        }));
    };
    

    const petFilter = getAnimals.filter(pet => {
        return (
            (filters.species === '' || pet.species === filters.species)&&
            (filters.breed === '' || pet.breed ===filters.breed)&&
            (!filters.goodWithChildren|| pet.disposition.goodWithChildren)&&
            (!filters.goodWithOtherAnimals|| pet.disposition.goodWithOtherAnimals)&&
            (!filters.mustBeLeashed || pet.disposition.mustBeLeashed)

        );
    });

    useEffect(() => {
        fetchAniamls();
    }, [])

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