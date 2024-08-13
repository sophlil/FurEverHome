import React from 'react';
import AnimalDisplay from './pets';
import { Link } from 'react-router-dom';



function PetList({pets,toggleFavorite,favorites = [],onEdit,onDelete,showFavorites=true,isEditable=true}){

    console.log(toggleFavorite)

    return (
        <table id = "Pets">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Species</th>
                    <th>Breed</th>
                    <th>Disposition</th>
                    <th>Photo</th>
                    <th>Availability</th>
                    <th>Weight</th>
                    <th>Height</th>
                    <th>Description</th>
                    <th>Age</th>
                    <th>Date Created</th>
                    {showFavorites&& <th><Link to="/favorites">Favorites</Link></th>}
                </tr>
            </thead>
            <tbody>
                {pets.map(pet=><AnimalDisplay
                 pet ={pet}
                key = {pet.id}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(pet._id)}
                onDelete={onDelete}
                onEdit = {onEdit}
                showFavorites={showFavorites}
                isEditable={isEditable}
                />)}
            </tbody>
        </table>
    );
}

export default PetList;
