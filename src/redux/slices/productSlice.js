import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const { limit, offset } = params;
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${offset}`
      );

      if (!response.ok) {
        console.log(`${response.status} - ${response.statusText}`);
        return rejectWithValue();
      }

      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 500));
      return data.products;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );

      if (!response.ok) {
        console.log(`${response.status} - ${response.statusText}`);
        return rejectWithValue();
      }

      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 500));
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: {},
    limit: 18,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const newProducts = action.payload.filter(
          (product) =>
            !state.products.some(
              (existingProduct) => existingProduct.id === product.id
            )
        );
        state.products = [...state.products, ...newProducts];
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
