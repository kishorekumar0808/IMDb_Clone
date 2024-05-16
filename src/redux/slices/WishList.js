import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const WishList = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeCartItem(state, action) {
      return state.filter((item) => item.id !== action.payload?.id);
    },
  },
});

export const { addToCart, removeCartItem } = WishList.actions;
export default WishList.reducer;
