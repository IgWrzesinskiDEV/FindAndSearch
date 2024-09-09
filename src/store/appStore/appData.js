import { createSlice } from "@reduxjs/toolkit";
const initialAppState = {
  isLoading: false,
};

const appData = createSlice({
  name: "appData",
  initialState: initialAppState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const appDataActions = appData.actions;
export default appData.reducer;
