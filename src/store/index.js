import { configureStore } from "@reduxjs/toolkit";
import gameData from "./currentGameStore/gameData";
import newMapData from "./newMapStore/newMapData";
import newGameData from "./newGameStore/newGameData";
import appData from "./appStore/appData";

const store = configureStore({
  reducer: {
    app: appData,
    game: gameData,
    newGame: newGameData,
    newMapData: newMapData,
  },
});

export default store;
