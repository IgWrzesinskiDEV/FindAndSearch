import { createSlice } from "@reduxjs/toolkit";
const initialAppState = {
  isLoading: false,
  isShaking: false,
};

const appData = createSlice({
  name: "appData",
  initialState: initialAppState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsShaking: (state, action) => {
      state.isShaking = action.payload;
    },
  },
});

export const appDataActions = appData.actions;
export default appData.reducer;
