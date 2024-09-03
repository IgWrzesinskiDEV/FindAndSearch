import { configureStore } from "@reduxjs/toolkit";
import gameData from "./currentGameStore/gameData";

import newGameData from "./newGameStore/newGameData";

const store = configureStore({
  reducer: { game: gameData, newGame: newGameData },
});

export default store;
