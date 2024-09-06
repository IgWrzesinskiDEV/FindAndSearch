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
      console.log(state.polygonsCords, "in reset");
    },
    pushPolygon(state, action) {
      state.polygonsCords.push(action.payload);
      console.log(state.polygonsCords, "in push");
    },
    toogleModal(state) {
      state.isModalOpen = !state.isModalOpen;
      console.log(state.polygonsCords, "in modal");
    },
    overWritePolygons(state, action) {
      state.polygonsCords = action.payload;
      console.log(state.polygonsCords, "in overwrite");
    },
  },
});

export const newMapDataActions = newMapData.actions;
export default newMapData.reducer;
