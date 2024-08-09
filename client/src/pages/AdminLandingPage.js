import React from 'react';
import { Link } from 'react-router-dom';
// import PetList from '../components/petList';
// import {useState,useEffect} from 'react';
//import {useHistory} from "react-router-dom";
import '../App.css';
// import animals from '../data/data';

function AdminPage(){

//    const [pets, setPet] = useState([]);
//    const history = useHistory();

    return (
        <> <div className='adminLandingPage'/>

            <Link to ="/Create-Pet">Create a Pet</Link>
            <Link to ="/browse">Browse Existing Pets</Link>

        </>
    );
}

export default AdminPage;