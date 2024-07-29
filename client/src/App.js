import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Browse from './pages/BrowsePets'
import { Link } from 'react-router-dom';
import CreatePet from './pages/CreatePet';
import AdminPage from './pages/AdminLandingPage';

function App() {


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
            <Browse />
          </Route>
          <Route path="/Create-Pet">
            <CreatePet />
          </Route>
          <Route path="/Admin-Landing-Page">
            <AdminPage />
          </Route>



            </div>
      </Router>

        </div>
);
}
export default App;
