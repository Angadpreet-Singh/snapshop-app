import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shopInfo: {
        shopName: "",
        shopId: ""
    }
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        addShop: (state, action) => {
            state.shopInfo = action.payload
        },
        removeShop: (state) => {
            state.shopInfo = initialState.shopInfo
        },
    },
})

export const { addShop, removeShop } = shopSlice.actions

export default shopSlice.reducer