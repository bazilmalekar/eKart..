import React, { useEffect } from "react";
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { addToCart, removeFromCart, decreaseQuantity, clearCart, subtotal } from "../services/cartSlice";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Cart = () => {
  const cartData = useSelector((state) => state.cartSlice);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subtotal());
  }, [cartData, dispatch]);

  return (
    <div className="cart">
      <h1>Cart</h1>
        {
          cartData.cartItems.length === 0 ? (
            <div className="empty_cart">              
            <p>cart is empty</p>
            <NavLink to="/"><button className="custom_button"><h5><KeyboardBackspaceIcon /> Start Shopping</h5></button></NavLink>
            </div>
          ) : (            
            <div className="cartTitles">
              <div className="cart_headings">
                <div className="cart_description">
                  <p className="cart_titles_storng">Description</p>
                </div>
                <div className="cart_price">
                  <p className="cart_titles_storng">Price</p>
                </div>
                <div className="cart_qty">
                  <p className="cart_titles_storng">Qty</p>
                </div>
                <div className="cart_total">
                  <p className="cart_titles_storng">Total</p>
                </div>
              </div>
              <div className="cart_map_content">
                {
                  cartData.cartItems.map((elem) => {
                    return(
                      <div className="cart_body" key={elem._id}>  
                        <div className="cart_body_description">
                          <img src={elem.img} alt="Product Image" />
                          <div className="cart_body_description_items">
                            <p className="cart_body_description_content">{elem.description}</p>
                            <button onClick={() => dispatch(removeFromCart(elem))}>Remove</button>
                          </div>
                        </div>
                        <div className="cart_body_price">                          
                          <p>₹ {elem.price}</p>                                                    
                        </div>
                        <div className="cart_body_qty">
                          <div className="cart_body_qty_content">
                            <button onClick={() => dispatch(decreaseQuantity(elem))}>-</button>
                            <p>{elem.cartQuantity}</p>                            
                            <button onClick={() => dispatch(addToCart(elem))}>+</button>
                          </div>                          
                        </div>
                        <div className="cart_body_total">
                          <p>₹ { elem.cartQuantity * elem.price}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            <div className="cart_subtotal_div">              
              <button className="custom_subtotal_btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
              <div className="cart_subtotal_div_content">
                <h4>Subtotal: ₹{cartData.totalCartAmount}</h4>
                <p>Inclusive of all taxes</p>
                {
                  auth._id ? (
                    <>
                      <button className="custom_login_btn">Checkout</button>
                    </>
                  ) : (
                    <>
                      <button className="custom_login_navigate_btn" onClick={() => navigate("/login")}>Login to check out</button>                      
                    </>
                  )
                }
                <NavLink to="/"><button className="custom_button"><h5><KeyboardBackspaceIcon />Continue Shopping</h5></button></NavLink> 
              </div>                           
            </div>                
            </div>
          )
        }
    </div>
  )
}

export default Cart;
