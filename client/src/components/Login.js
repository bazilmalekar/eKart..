import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import { loginUser } from '../services/authSlice';
import { RegisterButton, RegisterDiv, RegisterFrom } from '../StyledComponents/register';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const cartData = useSelector((state) => state.cartSlice);
    const [userInput, setUserInput] = useState({
      email: "",
      password: ""
    });

    const handleChange = (e) => {
      const {name, value} = e.target;
      setUserInput({
        ...userInput,
        [name]: value
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser(userInput)); 
    }

    useEffect(() => {
      if(auth._id){
        if(cartData.cartItems.length === 0){
          navigate("/home");
        }else{
          navigate("/cart");
        }        
      }
    }, [auth._id, navigate]);
  return (
    <RegisterDiv>
      <RegisterFrom onSubmit={handleSubmit}>
        <h1>Loign</h1>
        <input onChange={handleChange} type="text" name="email" value={userInput.email} placeholder="Email" />
        <input onChange={handleChange} type="password" name="password" value={userInput.password} placeholder="Password" />
        {auth.loginState === "rejected" && <p style={{color: "red"}} >{auth.loginError}</p>} 
        <div className="redirect_btn">
          <NavLink className="register_redirect_btn" to="/register">Don't have an account, Register </NavLink>
        </div>        
        <RegisterButton>
          <button type="submit">{auth.loginState === "pending" ? "...Loading" : "Submit"}</button>
        </RegisterButton>        
      </RegisterFrom>                  
    </RegisterDiv>
  )
}

export default Register;
