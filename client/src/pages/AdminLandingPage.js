import React from 'react';
import { Link } from 'react-router-dom';
import PetList from '../components/petList';
import {useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import '../App.css';
import animals from '../data/data';

function AdminPage({setPetToEdit}){

    const [pets, setPet] = useState([]);
    const history = useHistory();

    return (
        <>
            <Link to ="/Create-Pet">Create a Pet</Link>
            <h2>List of Pets</h2>
            <PetList pets={animals}/>

        </>
    );
}

export default AdminPage;