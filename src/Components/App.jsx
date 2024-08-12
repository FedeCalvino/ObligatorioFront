import React, { useState,useEffect } from 'react'
import { RegistrarLoggin } from './RegistrarLoggin';
import { Provider } from 'react-redux';
import {Store } from './Store.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Home.jsx';
import { NotFound } from './NotFound.jsx';

export const App = () => {
  return (
    <Provider store={Store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegistrarLoggin />}/>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>   
        </BrowserRouter>
    </Provider>
  )
}
