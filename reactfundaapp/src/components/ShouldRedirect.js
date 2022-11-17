import React from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect, Navigate, useNavigate } from 'react-router-dom';
import Data from '../pages/Data';

export default function ShouldRedirect() 
{
  if (!localStorage.getItem('auth_token')) 
  {
    return <Navigate replace to="/login" />;
  }
  else return <Data />;
}