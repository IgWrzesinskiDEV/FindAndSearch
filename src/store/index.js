import { configureStore } from "@reduxjs/toolkit";
import gameData from "./gameData";

const store = configureStore({
  reducer: { game: gameData },
});

export default store;
