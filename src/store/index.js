import { configureStore } from "@reduxjs/toolkit";
import gameData from "./currentGameStore/gameData";
import newMapData from "./newMapStore/newMapData";
import newGameData from "./newGameStore/newGameData";

const store = configureStore({
  reducer: { game: gameData, newGame: newGameData, newMapData: newMapData },
});

export default store;
