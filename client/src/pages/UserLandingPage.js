import React from 'react';
import { Link } from 'react-router-dom';
// import PetList from '../components/petList';
// import {useState,useEffect} from 'react';
//import {useHistory} from "react-router-dom";
import '../App.css';
// import animals from '../data/data';

function UserPage(){

//    const [pets, setPet] = useState([]);
//    const history = useHistory();

    return (
        <> <div className='adminLandingPage'/>

            <Link to ="/favorites"className="link-spacing">View Your Favorited Pets</Link>
            <Link to ="/browse" className="link-no-style">Browse Existing Pets</Link>

        </>
    );
}

export default UserPage;