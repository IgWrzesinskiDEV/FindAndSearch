import { createSlice } from "@reduxjs/toolkit";

const initialMapState = {
  polygons: [],
};

const newMapData = createSlice({
  name: "newMapData",
  initialState: initialMapState,
  reducers: {},
});

export const newMapActions = newMapData.actions;
export default newMapData.reducer;
