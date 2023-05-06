import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart'
import menuReducer from './menu'
import shopReducer from './shop'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer,
        shop: shopReducer
    },
})