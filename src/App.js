import React from 'react';
import { Routes , BrowserRouter , Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import About from './pages/About';
import View from './pages/View';
import Header from './component/Header';

//import Header from './component/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer position="top-center"/>
          <Routes>
            <Route  path="/" element={<Home/>} />
            <Route  path="/add" element={<AddEdit/>} />
            <Route  path="/update/:id" element={<AddEdit/>} />
            <Route  path="/View/:id" element={<View/>} />
            <Route  path="/About" element={<About/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
