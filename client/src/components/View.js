import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import { useGetProductQuery } from "../services/productsApi";
import { toast } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {addToCart} from "../services/cartSlice";
import Loader from "./Loader";
import ReadMore from "./ReadMore";
import Button from '@mui/material/Button';

const View = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {data, error, isLoading} = useGetProductQuery(id);

    useEffect(() => {
    if(error){
            toast.error("Something went wrong", {
                position: "top-center"
            });
        }        
    }, [error]);
  return (
    <div className="view">
      {
          isLoading ? (
              <Loader />
          ) : (
              <div className="view_product_container">
                <Row>
                    <Col className="view_img_div_par" lg={6} md={12} sm={12} xs={12}>
                        <div className="view_img_div_chd">
                            <img src={data.img} alt="product image" />
                        </div>
                    </Col>
                    <Col className="view_desc_div_par">
                        <div className="view_title">
                            <h1>{data.title}</h1>
                        </div>
                        <div className="view_description">
                            <p>{data.description}</p>
                            <ReadMore>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Nullam tempus felis dictum fermentum placerat. Quisque sit amet quam tempor, pharetra lacus non, laoreet leo. Duis.
                            </ReadMore>
                        </div>
                        <div className="view_price">
                            <p><strong>Price: ₹{data.price}</strong></p>   
                        </div>
                        <div className="add_to_cart_btn">                        
                            <Button  onClick={() => dispatch(addToCart(data))} variant="contained">Add To Cart</Button>
                        </div> 
                    </Col>
                </Row>
              </div>
          )
      }
    </div>
  )
}

export default View;
