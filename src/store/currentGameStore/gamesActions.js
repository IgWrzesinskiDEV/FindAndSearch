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

      const gameDoc = await getDoc(gameRef);

      if (gameDoc.exists()) {
        dispatch(gameDataActions.setCurrentGame(gameDoc.data()));
        toast.success("Game found!");

        localStorage.setItem("currentGame", JSON.stringify(gameDoc.data()));

      } else {
        toast.error("Game not found!");
      }
    } catch (err) {
      toast.error("Enter a valid game id");
      console.log(err);
    } finally {
      dispatch(appDataActions.setLoading(false));
    }
  };
};

export const fetchMapData = (questionId, gameId) => {
  return async (dispatch) => {
    try {
      const mapRef = doc(
        db,
        "games",
        gameId,
        "mapsData",
        questionId.toString()
      );

      const mapDoc = await getDoc(mapRef);

      if (mapDoc.exists()) {
        dispatch(gameDataActions.setCurrentMap(mapDoc.data().mapData));
      } else {
        dispatch(gameDataActions.setCurrentMap(-1));
      }
    } catch (err) {
      toast.error("Failed to find new map");
      console.log(err);
    }
  };
};
