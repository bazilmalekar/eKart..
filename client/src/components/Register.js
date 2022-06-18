import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { registerUser } from '../services/authSlice';
import { RegisterButton, RegisterDiv, RegisterFrom } from '../StyledComponents/register';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const cartData = useSelector((state) => state.cartSlice);
    const [userInput, setUserInput] = useState({
      name: "",
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
      dispatch(registerUser(userInput));                
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
        <h1>Register</h1>
        <input onChange={handleChange} type="text" name="name" value={userInput.name} placeholder="Name" />
        <input onChange={handleChange} type="text" name="email" value={userInput.email} placeholder="Email" />
        <input onChange={handleChange} type="password" name="password" value={userInput.password} placeholder="Password" />
        <p style={{color: "red"}} >{auth.registerError}</p>
        <RegisterButton>
          <button type="submit">{auth.registerState === "pending" ? "...Loading" : "Submit"}</button>
        </RegisterButton>                        
      </RegisterFrom>             
    </RegisterDiv>
  )
}

export default Register;
