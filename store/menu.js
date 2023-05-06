import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        addToMenu: (state, action) => {
            state.items = action.payload
        },
        emptyAllMenu: (state) => {
            state.items = initialState.items
        },
    },
})

export const { addToMenu, emptyAllMenu } = menuSlice.actions

export default menuSlice.reducer