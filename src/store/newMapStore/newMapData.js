import { createSlice } from "@reduxjs/toolkit";

const initialMapState = {
  polygonsCords: [],
  isModalOpen: false,
};

const newMapData = createSlice({
  name: "newMapData",
  initialState: initialMapState,
  reducers: {
    resetPolygons(state) {
      state.polygonsCords = [];
    },
    pushPolygon(state, action) {
      state.polygonsCords.push(action.payload);
    },
    toogleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const newMapDataActions = newMapData.actions;
export default newMapData.reducer;
