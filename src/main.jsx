import { StrictMode } from 'react'
import { createRoot, ReactDOM} from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import NewsInterface from './NewsInterface.jsx';
import LandingPage from './LandingPage.jsx';
export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LandingPage />} />
        <Route path = '/news' element = {<NewsInterface/>}/>    
      </Routes>
    
    </BrowserRouter>
  );
}
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);