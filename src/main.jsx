import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import NewsInterface from './NewsInterface.jsx';
import LandingPage from './LandingPage.jsx';
import DiscoveryPage from './DiscoveryPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analysis" element={<DiscoveryPage />} />
      <Route path = '/analysis/:id' element = {<NewsInterface/>}/>
      <Route path="/discovery" element={<DiscoveryPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path = '/home/analysis/:id' element = {<NewsInterface/>}/>
      <Route path="/home/analysis" element={<DiscoveryPage />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
