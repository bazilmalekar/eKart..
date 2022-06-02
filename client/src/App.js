import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route, Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Home from "./components/Home";
import Header from "./components/Header";
import Cart from "./components/Cart";
import View from "./components/View";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/cart/" element={<Cart />} />  
        <Route path="/view/:id" element={<View />} />     
      </Routes>
    </>
  );
}

export default App;
