import React from 'react';
import PetList from '../components/petList';
import '../App.css';
import animals from '../data/data';

function Browse(){

    return(
        <>
        <h2>List of Pets</h2>
        <PetList pets={animals}/>
        </>
);

}
export default Browse;