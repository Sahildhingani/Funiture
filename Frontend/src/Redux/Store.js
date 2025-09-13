import { configureStore } from "@reduxjs/toolkit";
import User from '../Redux/Slices';
const Store=configureStore({
    reducer:{
        User:User
    }
})
export default Store;