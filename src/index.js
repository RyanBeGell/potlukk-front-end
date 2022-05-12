import React from 'react';
import ReactDOM from 'react-dom/client';
import SplashPage from './components/SplashPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<SplashPage/>}/>
        <Route path='/potlukkselector' element={<PotlukkSelector/>}/>
        <Route path='/potlukkviewer' element={<PotlukkViewer/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
