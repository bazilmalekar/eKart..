import React, { useEffect } from "react";
import {Container, } from "react-bootstrap";
import {NavLink} from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllProductsQuery } from "../services/productsApi";
import { useDispatch } from "react-redux";
import {addToCart} from "../services/cartSlice";
import Button from '@mui/material/Button';
import Loader from "./Loader";

const Home = () => {
    const {data, error, isLoading} = useGetAllProductsQuery();
    const dispatch = useDispatch();
    useEffect(() => {
        if(error){
            toast.error("Something went wrong", {
                position: "top-center"
            });
        }        
    }, [error]);

  return (
    <div className="home">
      <Container>
          <div className="heading">
            <h1>New Arrivals !</h1>
          </div>
        {
            isLoading ? (
                <Loader />
            ) :  (
                <div className="products">
                    {
                        data?.map((elem) => {
                            const {title, description, price, img} = elem;
                            return(                                
                                <div className="products_container" key={elem._id}>
                                    <NavLink to={`/view/${elem._id}`}>
                                    <div className="img_div">
                                        <img src={img} alt="Product pic" />
                                    </div>
                                    <div className="product_description">
                                        <h5>{title}</h5>
                                        <p>{description}</p>
                                        <p><strong>Price: ₹{price}</strong></p>                                                                                        
                                    </div>
                                    </NavLink>
                                    <div className="add_to_cart_btn">                        
                                        <Button onClick={() => dispatch(addToCart(elem))} variant="contained">Add To Cart</Button>
                                    </div>                                        
                                </div>  
                            )
                        })
                    }                    
                </div>
            )
        }
          

      </Container>
    </div>
  )
}

export default Home;
