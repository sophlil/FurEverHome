import './App.css';
import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Browse from './pages/BrowsePets'
import { Link } from 'react-router-dom';
import CreatePet from './pages/CreatePet';
import AdminPage from './pages/AdminLandingPage';
import CreateAccount from './pages/CreateAccount';
import Favorites from './pages/Favorites';
import animals from './data/data'

require('dotenv').config();

function App() {

  const [favorites,setFavorites]=useState(() => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites):[];
  });

  const toggleFavorite = (petId)=>{
    setFavorites(prevFavorites =>
        prevFavorites.includes(petId)
        ?prevFavorites.filter(id => id!==petId)
        :[...prevFavorites,petId]
    );
};

useEffect(() => {
  localStorage.setItem('favorites',JSON.stringify(favorites));
},
[favorites]);



return (
    <div className = "App">
      <Router>
        <h1>FurEver Home</h1>
        <p>FurEver Home is about matching animals from a shelter to their ideal “FurEver” homes by
            creating dating profiles for each animal. This unique concept provides users with an engaging
            way to find their dream furry pet to bring home. With a user-friendly interface and a fun process,
            users can easily research all the pets available for adoption at a shelter by filtering for type of
            animal, breed, and disposition to help tailor the best results.</p>
            <nav>
                <Link to ="/login">Login</Link>
            </nav>
            <nav>
              <Link to ="/browse">Browse Pets</Link>
            </nav>
            <div className="App-header">
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/browse">
            <Browse pets={animals} toggleFavorite={toggleFavorite} favorites={favorites} />
          </Route>
          <Route path="/Create-Pet">
            <CreatePet />
          </Route>
          <Route path="/Admin-Landing-Page">
            <AdminPage />
          </Route>
          <Route path="/Create-Account">
            <CreateAccount />
          </Route>
          <Route path="/favorites">
            <Favorites pets={animals} toggleFavorite={toggleFavorite} favorites={favorites}/>
          </Route>




            </div>
      </Router>

        </div>
);
}
export default App;
