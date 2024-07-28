import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const toggleProductInCart = createAsyncThunk(
  "cart/toggleProductInCart",
  async (product, { getState, dispatch }) => {
    const { cartProducts } = getState().cart;
    const isProductAdded = cartProducts.find((p) => p.id === product.id);

    if (isProductAdded) {
      dispatch(setCartVisibility(true));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(addProduct(product));
    }

    dispatch(setCartVisibility(true));
  }
);

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (product, { dispatch }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(removeProduct(product));
    return product.id;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    isCartVisible: false,
    totalPrice: 0,
    isCheckoutComplete: false,
    isProcessingCart: false,
    processingCartProductId: null,
  },
  reducers: {
    setCartVisibility: (state, action) => {
      state.isCartVisible = action.payload;
    },
    addProduct: (state, action) => {
      const product = {...action.payload, unitPrice: action.payload.price}
      state.cartProducts.push(product);
    },
    updateProductPrice: (state, action) => {
      const { productId, productPrice, productQuantity } = action.payload;

      const productIndex = state.cartProducts.findIndex(
        (cartProduct) => cartProduct.id === productId
      );

      if (productIndex !== -1) {
        const updatedProduct = {
          ...state.cartProducts[productIndex],
          price: productPrice * productQuantity,
        };

        const newCartProducts = [...state.cartProducts];
        newCartProducts.splice(productIndex, 1, updatedProduct);
        state.cartProducts = newCartProducts;
      }
    },
    removeProduct: (state, action) => {
      const productIndex = state.cartProducts.findIndex(
        (cartProduct) => cartProduct.id === action.payload.id
      );
      if (productIndex !== -1) {
        state.cartProducts.splice(productIndex, 1);
      }
      state.totalPrice -= action.payload.price;
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
    setCheckoutStatus: (state, action) => {
      state.isCheckoutComplete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleProductInCart.pending, (state) => {
        state.isProcessingCart = true;
      })
      .addCase(toggleProductInCart.fulfilled, (state) => {
        state.isProcessingCart = false;
      })
      .addCase(toggleProductInCart.rejected, (state) => {
        state.isProcessingCart = false;
      })

      .addCase(removeProductFromCart.pending, (state, action) => {
        state.processingCartProductId = action.meta.arg.id;
      })
      .addCase(removeProductFromCart.fulfilled, (state) => {
        state.processingCartProductId = null;
      });
  },
});

export const {
  setCartVisibility,
  addProduct,
  updateProductPrice,
  removeProduct,
  clearCart,
  setCheckoutStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
