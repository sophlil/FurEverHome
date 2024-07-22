import React from 'react'

function AnimalDisplay({pet}){


        return(
        <tr>
            <td>{pet.name}</td>
            <td>{pet.species}</td>
            <td>{pet.breed}</td>
            <td>
                <ul>
                    <li>
                        <label>
                            <input type = "checkbox" checked = {pet.disposition.goodWithOtherAnimals} readOnly />Good with other animals
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type = "checkbox" checked = {pet.disposition.goodWithChildren} readOnly />Good with children
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type = "checkbox" checked = {pet.disposition.mustBeLeashed} readOnly />Must be leashed
                        </label>
                    </li>
                </ul>
            </td>
            <td>
                <img
                    src={pet.photo} 
                alt={pet.name}                        
                style={{ width: '300px', height: '300px' }}
                />
            </td>
            <td>{pet.availability}</td>
            <td>{pet.weight}</td>
            <td>{pet.height}</td>
            <td>{pet.description}</td>
            <td>{pet.age}</td>
            <td>{pet.daysSinceAvailable}</td>
        </tr>
        );


}
export default AnimalDisplay;