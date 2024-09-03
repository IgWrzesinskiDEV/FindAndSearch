import { configureStore } from "@reduxjs/toolkit";
import gameData from "./gameData";
import newGameData from "./newGameData";
import newGameUi from "./newGameUi";
const store = configureStore({
  reducer: { game: gameData, newGame: newGameData, newGameUi: newGameUi },
});

export default store;
