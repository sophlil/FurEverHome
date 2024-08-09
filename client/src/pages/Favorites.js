import React from 'react';
import PetList from '../components/petList';
import '../App.css';

function Favorites({pets, toggleFavorite, favorites}){
    const favoritedPets = pets.filter(pet => favorites.includes(pet._id));


return (
    <>
    <div className='favorites'/>
    <h2>Your Favorited Pets</h2>
    <PetList pets ={favoritedPets} toggleFavorite={toggleFavorite} favorites={favorites}/>

    </>
);
}

export default Favorites;
