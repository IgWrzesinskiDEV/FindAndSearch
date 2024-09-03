import { gameDataActions } from "./gameData";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchGameId = (gameId) => {
  return async (dispatch) => {
    try {
      const gameRef = doc(db, "games", gameId);
      const gameDoc = await getDoc(gameRef);

      if (gameDoc.exists()) {
        console.log(gameDoc.data());
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
