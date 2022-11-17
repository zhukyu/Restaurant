import React from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect, Navigate, useNavigate } from 'react-router-dom';

import Restaurant from './pages/Restaurant';
import AddRestaurant from './pages/AddRestaurant';
import EditRestaurant from './pages/EditRestaurant';
import Login from './pages/Login';
import Register from './pages/Register';
import Data from './pages/Data';
import RestaurantInfo from './pages/RestaurantInfo';
import ShouldRedirect from './components/ShouldRedirect';
import axios from 'axios';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {

  // const shouldRedirect = () => {
  //   if(!localStorage.getItem('auth_token'))
  //   {  
  //     return true;
  //   }
  //   else return false;
  // }

  // {localStorage.getItem('auth_token')} ?  '/': <Login />  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Restaurant />} />
        <Route path="/data/add-restaurant" element={<AddRestaurant />} />
        <Route path="/data/edit-restaurant/:id" element={<EditRestaurant />} />
        <Route path="/data/restaurant-info/:id" element={<RestaurantInfo />} />
        <Route path="/restaurant-info/:id" element={<RestaurantInfo />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route
          path="/data"
          element={
            <ShouldRedirect/>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
