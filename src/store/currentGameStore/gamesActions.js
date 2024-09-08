import { gameDataActions } from "./gameData";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
export const fetchGameId = (gameId) => {
  return async (dispatch) => {
    try {
      const gameRef = doc(db, "games", gameId);
      console.log(gameRef);

      const gameDoc = await getDoc(gameRef);

      if (gameDoc.exists()) {
        //console.log(gameDoc.data());
        dispatch(gameDataActions.setCurrentGame(gameDoc.data()));
        dispatch(gameDataActions.setCurrentGameQuestions());
      } else {
        dispatch(gameDataActions.setCurrentGame(-1));
      }
    } catch (err) {
      toast.error("Failed to find new game");
      console.log(err);
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
