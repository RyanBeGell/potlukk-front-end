import React from 'react';
import ReactDOM from 'react-dom/client';
import SplashPage from './components/SplashPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PotlukkViewer from './components/potlukk-viewer';
import CreatePotlukk from './components/create-potlukk';
import AddItems from './components/add-items';
import RegisterUser from './components/registration';
import SignIn from './components/sign-in';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SplashPage/>}/>
        <Route path='/potlukkviewer' element={<PotlukkViewer/>}/>
        <Route path='/potlukkviewer/:id' element={<PotlukkViewer/>}/>
        <Route path='/createpotlukk' element={<CreatePotlukk/>}/>
        <Route path='/additems' element={<AddItems/>}/>
        <Route path='/register' element={<RegisterUser/>}/>
        <Route path='/signin' element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
