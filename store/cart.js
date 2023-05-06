import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items = action.payload
        },
        emptyAllCart: (state) => {
            state.items = initialState.items
        },
    },
})

export const { addToCart, emptyAllCart } = cartSlice.actions

export default cartSlice.reducer