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
  const onDelete = async (petId) => {
    console.log("Deleting pet", petId)
    try {
      await axios.delete(`/animal/${petId}`)
      setAnimals(prevAnimals => prevAnimals.filter(pet=>pet._id !== petId));
    }catch(error){
      console.error("Error deleting pet: ", error);
    }
  };
  const onEdit = async (petID,newAvailability) => {
    console.log("Updating Pet:" )
    try {
      await axios.post(`/animal/${petID}`,{availability: newAvailability});
      setAnimals(prevAnimals => prevAnimals.map(pet=>(pet._id===petID ?{...pet,availability:newAvailability}: pet)));
    }catch(error){
      console.error("Error updating pet: ", error);
    }
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
    axios.post("/logout");
    window.location.href = '/login';
  };



  const SecureRoute = ({ component: Component, pets,toggleFavorite,favorites,onDelete,onEdit, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
        <div>
          <button className="logout-button" onClick={logOut}>Log Out</button>
          <Component
          {...props}
          pets = {pets}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
          onDelete = {onDelete}
          onEdit = {onEdit}
          />
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
          <SecureRoute path = "/admin-browse" component={AdminBrowse} pets={getAnimals} onDelete ={onDelete} onEdit={onEdit} logOut={logOut} />
          <SecureRoute path="/user-landing-page" component={UserPage} logOut={logOut} />
        </Switch>
      </Router>
    </div>
);
}

export default App;
