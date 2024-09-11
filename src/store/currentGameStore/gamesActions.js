import { gameDataActions } from "./gameData";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

import { appDataActions } from "../appStore/appData";
export const fetchGameId = (gameId) => {
  return async (dispatch) => {
    try {
      dispatch(appDataActions.setLoading(true));
      const gameRef = doc(db, "games", gameId);
      console.log(gameRef);

      const gameDoc = await getDoc(gameRef);

      if (gameDoc.exists()) {
        //console.log(gameDoc.data());
        dispatch(gameDataActions.setCurrentGame(gameDoc.data()));
        dispatch(gameDataActions.setCurrentGameQuestions());
        toast.success("Game found!");
      } else {
        dispatch(gameDataActions.setCurrentGame(-1));
      }
    } catch (err) {
      toast.error("Failed to find new game");
      console.log(err);
    } finally {
      dispatch(appDataActions.setLoading(false));
    }
  };
};

export const fetchMapData = (questionId, gameId) => {
  return async (dispatch) => {
    try {
      console.log(gameId, "gameId");

      const mapRef = doc(
        db,
        "games",
        gameId,
        "mapsData",
        questionId.toString()
      );

      const mapDoc = await getDoc(mapRef);

      if (mapDoc.exists()) {
        console.log(mapDoc.data(), "exists");
        dispatch(gameDataActions.setCurrentMap(mapDoc.data().mapData));
      } else {
        console.log("not exists");

        dispatch(gameDataActions.setCurrentMap(-1));
      }
    } catch (err) {
      toast.error("Failed to find new map");
      console.log(err);
    }
  };
};
