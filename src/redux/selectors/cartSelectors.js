import { createSelector } from "@reduxjs/toolkit";

export const selectCartState = (state) => state.cart;

export const selectTotalCartValue = createSelector([selectCartState], (state) =>
  state.cartProducts.reduce((total, cartProduct) => {
    return total + cartProduct.price;
  }, 0)
);

export const selectTotalCartProducts = createSelector(
  [selectCartState],
  (state) => state.cartProducts.length
);
