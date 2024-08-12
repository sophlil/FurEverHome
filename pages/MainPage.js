import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';




function MainLanding(){

    return(
    <div className = "App">
        <div className = "app-description">
        <p>FurEver Home is about matching animals from a shelter to their ideal “FurEver” homes by
            creating dating profiles for each animal. This unique concept provides users with an engaging
            way to find their dream furry pet to bring home. With a user-friendly interface and a fun process,
            users can easily research all the pets available for adoption at a shelter by filtering for type of
            animal, breed, and disposition to help tailor the best results.</p></div>
    <div className = "nav-container">
        <nav>
          <Link to ="/login" className = "nav-link">Login</Link>
        </nav>

        </div>
        </div>
    );
}
export default MainLanding;