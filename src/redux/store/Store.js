import { configureStore } from "@reduxjs/toolkit";
import WishList from "../slices/WishList";

export const store = configureStore({
  reducer: {
    wishList: WishList,
  },
});
