import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart'
import menuReducer from './menu'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer
    },
})