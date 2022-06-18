import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {url} from "./baseUrl";
import jwtDecode from "jwt-decode";

const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    email: "",
    _id: "",
    registerState: "",
    registerError: "",
    loginState: "",
    loginError: "",
    userLoaded: false
}

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async(value, {rejectWithValue}) => {
        try{
            const token = await axios.post(`${url}/register`, {
                name: value.name,
                email: value.email,
                password: value.password
            });
            localStorage.setItem("token", token.data);
            return token.data;
        }catch(err){
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(value, {rejectWithValue}) => {
        try{    
            const token = await axios.post(`${url}/login`, {
                email: value.email,
                password: value.password
            });
            localStorage.setItem("token", token.data);
            return token.data;
        }catch(err){
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser: (state, action) => {
            const token = state.token;
            if(token){
                const user = jwtDecode(token);
                return{
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    userLoaded: true
                }
            }
        },
        logoutUser: (state, action) => {
            localStorage.removeItem("token");
            return{
                ...state,
                token: "",
                name: "",
                email: "",
                _id: "",
                registerState: "",
                registerError: "",
                loginState: "",
                loginError: "",
                userLoaded: false
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            return{...state, registerState: "pending"}
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if(action.payload){
                const user = jwtDecode(action.payload);
                return{
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    registerState: "success"
                }
            }else return state;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            return{
                ...state,
                registerState: "rejected",
                registerError: action.payload
            }
        });


        builder.addCase(loginUser.pending, (state, action) => {
            return{...state, loginState: "pending"}
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if(action.payload){
                const user = jwtDecode(action.payload);
                return{
                    ...state,
                    token: action.payload,  
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    loginState: "success"
                }
            }else return state;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            return{
                ...state,
                loginState: "rejected",
                loginError: action.payload
            }
        });
    }
});

export const {loadUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;

