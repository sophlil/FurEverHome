import React from 'react';
import AnimalDisplay from './pets';



function PetList({pets}){

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
                    <th>Days Since Available to Adopt</th>
                </tr>
            </thead>
            <tbody>
                {pets.map(pet=><AnimalDisplay pet ={pet}

                key = {pet.id}/>)}
            </tbody>
        </table>
    );
}

export default PetList;
