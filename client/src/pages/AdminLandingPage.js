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

            <Link to="/create-pet" className="link-spacing">Create a Pet</Link>
            <Link to ="/browse" className="link-no-style">Browse Existing Pets</Link>

        </>
    );
}

export default AdminPage;