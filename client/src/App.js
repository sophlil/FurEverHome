import './App.css';
import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Browse from './pages/BrowsePets'
//import { Link } from 'react-router-dom';
import AnimalProfileForm from './pages/CreatePet';
import AdminPage from './pages/AdminLandingPage';
import CreateAccount from './pages/CreateAccount';
import Favorites from './pages/Favorites';
import UserPage from './pages/UserLandingPage';
import MainLanding from './pages/MainPage';
import AdminBrowse from './pages/AdminBrowse';
import axios from 'axios';
// import animals from './data/data';


require('dotenv').config();

function App() {

  const [getAnimals, setAnimals] = useState([]);

  const fetchAnimals = async () => {
      const result = axios.get("/animal")
      
      result.then((response) => {
          setAnimals(response.data)
          console.log(response.data)
          return response.data;
      })
  };

  useEffect(() => {
      fetchAnimals();
  }, [])

  const [favorites,setFavorites]=useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites):[];
  });

  const toggleFavorite = (petId)=>{
    setFavorites(prevFavorites =>
        prevFavorites.includes(petId)
        ?prevFavorites.filter(_id => _id!==petId)
        :[...prevFavorites,petId]
    );
  };

  useEffect(() => {
    localStorage.setItem('favorites',JSON.stringify(favorites));
  },
  [favorites]);

  const logOut = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const SecureRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
        <div>
          <button className="logout-button" onClick={logOut}>Log Out</button>
          <Component {...props} />
        </div>
      )}
    />
  );

return (
    <div className = "App">
      <h1>FurEver Home</h1>
      <Router>
        <Switch>
        <Route path = "/" exact>
        <MainLanding />
        </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create-account">
            <CreateAccount />
          </Route>
          <SecureRoute path="/browse" component={Browse} pets={getAnimals} toggleFavorite={toggleFavorite} favorites={favorites} logOut={logOut} />
          <SecureRoute path="/create-pet" component={AnimalProfileForm} logOut={logOut} />
          <SecureRoute path="/admin-landing-page" component={AdminPage} logOut={logOut} />
          <SecureRoute path="/favorites" component={Favorites} pets={getAnimals} toggleFavorite={toggleFavorite} favorites={favorites} logOut={logOut} />
          <SecureRoute path = "/admin-browse" component={AdminBrowse} pets={getAnimals} toggleFavorite={toggleFavorite} favorites={favorites} logOut={logOut} />
          <SecureRoute path="/user-landing-page" component={UserPage} logOut={logOut} />
        </Switch>
      </Router>
    </div>
);
}

export default App;
