import React,{useState} from 'react';


function AnimalDisplay({pet,toggleFavorite,isFavorite,onDelete,onEdit,showFavorites, isEditable}){

        console.log(isFavorite);
        const petDateCreated = new Date(pet.dateAvailable);
        const formattedPetDateCreated = petDateCreated.toISOString().split('T')[0];
        const [availability,setAvailability] = useState(pet.availability);
        const handleEdit =(e) =>{
            setAvailability(e.target.value);
            onEdit(pet._id,e.target.value);
        };

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
            <td>
               {isEditable?( <select value ={availability} onChange={handleEdit} disabled={!showFavorites}>
                    <option value = "Not Available">Not Available</option>
                    <option value = "Available">Available</option>
                    <option value = "Pending">Pending</option>
                    <option value = "Adopted">Adopted</option>
                </select>
               ) :(<span>{availability}</span>)
}
            </td>
            <td>{pet.weight}</td>
            <td>{pet.height}</td>
            <td>{pet.description}</td>
            <td>{pet.age}</td>
            <td>{formattedPetDateCreated}</td>
            <td>
                {showFavorites&&(<button onClick ={() => toggleFavorite(pet._id)}>
                    {isFavorite ? 'Unfavorite': 'Favorite'}
                </button>)}

                {onDelete && <button onClick = {() => onDelete(pet._id)}>Delete</button>}
            </td>
        </tr>
        );


}
export default AnimalDisplay;