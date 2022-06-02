import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ?
        JSON.parse(localStorage.getItem("cartItems")) : [],
    totalCartQuantity: 0,
    totalCartAmount: 0
}

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((index) => {
                return index._id === action.payload._id;
            });
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${state.cartItems[itemIndex].title} quantity in the cart`, {
                    position: "bottom-left"
                })
            } else {
                const tempItem = {
                    ...action.payload, cartQuantity: 1
                }
                state.cartItems.push(tempItem);
                toast.success(`Added ${action.payload.title} to the cart`, {
                    position: "bottom-left"
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const updatedList = state.cartItems.filter((items) => {
                return items._id !== action.payload._id
            });
            toast.error(`${action.payload.title} removed from the cart`, {
                position: "bottom-left"
            })
            state.cartItems = updatedList;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.cartItems.findIndex((index) => {
                return index._id === action.payload._id
            });
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.error(`Decreased ${action.payload.title} quantity in the cart`, {
                    position: "bottom-left"
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const updatedList = state.cartItems.filter((items) => {
                    return items._id !== action.payload._id
                })
                state.cartItems = updatedList;
                toast.error(`Removed ${action.payload.title} from the cart`, {
                    position: "bottom-left"
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        clearCart: (state, action) => {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error("All items removed from the cart", {
                position: "bottom-left"
            });
        },
        subtotal: (state, action) => {
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem) => {
                const {price, cartQuantity} = cartItem;
                const itemTotal = price * cartQuantity;
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;
                return cartTotal;
            }, {
                total: 0,
                quantity: 0
            });
            state.totalCartAmount = total;
            state.totalCartQuantity = quantity;
        }
    }
});

export const { addToCart, removeFromCart, decreaseQuantity, totalCartAmount, clearCart, subtotal } = cartSlice.actions;
export default cartSlice.reducer;