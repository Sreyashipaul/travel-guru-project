
import React, { createContext,  useEffect,  useState } from 'react';

import './App.css';
import {
   
  Switch,
  Route,
  Router,
  
} from "react-router-dom";



import Booking from './Components/booking/Booking';
import Home from './Components/home/Home';
import  { getCurrentUser, handleSignOut } from './Components/firebaseAuth/firebaseAuth';
import Search from './Components/Search/Search';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/firebaseAuth/Login';
import Header from './Components/header/Header';



export const UserContext = createContext();
function App() {
  
  const [user, setUser] = useState(null);
  const [bookingInfo, setBookingInfo] = useState({});

  useEffect(() => {
    getCurrentUser().then(res => {
      setUser(res);
    });
  }, []);
  const signOUtUser = () => {
    handleSignOut().then(res => {
      setUser(res);
    });
  };



  return (
    <UserContext.Provider value={{ user, setUser, bookingInfo, setBookingInfo, signOUtUser }}>
      <div>
      
       <Header></Header>
        <firebaseAuth> </firebaseAuth>
        <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/booking/:id" component={Booking} />
          <PrivateRoute path="/search/:id">
            <Search />
          </PrivateRoute>
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;