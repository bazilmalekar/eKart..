import React, { useEffect } from "react";
import {Container, Navbar, Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { subtotal } from "../services/cartSlice";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useNavigate} from "react-router-dom";
import { loadUser, logoutUser } from "../services/authSlice";

const Header = () => {
  const cartDate = useSelector((state) => state.cartSlice);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
   dispatch(subtotal());
  }, [cartDate, dispatch]);

  return (
    <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/"><h5>eKart..</h5></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                    {
                      auth._id ? <>
                        <div className="my-auto mx-2 custom_logout" onClick={() => dispatch(logoutUser())}>Logout</div>
                      </> : <>
                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                      </>
                    }                                      
                    <Nav.Link as={NavLink} to="/cart/">
                      <Badge badgeContent={cartDate.totalCartQuantity} color="primary">
                        <ShoppingCartOutlinedIcon color="action" />
                      </Badge>  
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>    
    </>
  )
}

export default Header;
