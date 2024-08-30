import { configureStore } from "@reduxjs/toolkit";
import gameData from "./gameData";
import newGameData from "./newGameData";
const store = configureStore({
  reducer: { game: gameData, newGame: newGameData },
});

export default store;
