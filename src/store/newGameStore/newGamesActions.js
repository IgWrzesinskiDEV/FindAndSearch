//import { newGameDataActions } from "./newGameData";
import { db } from "../../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Add a new document in collection "cities"

export const postNewGame = (game) => {
  return async (dispatch) => {
    try {
      const gameRef = doc(db, "games", game.id);
      const gameDoc = await getDoc(gameRef);

      if (!gameDoc.exists()) {
        await setDoc(gameRef, { questions: game.questions });
        console.log("Document written with ID: ", game.id);
      } else {
        throw new Error(`Game with ID ${game.id} already exists.`);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
// TODO:
//1. dodac powiadomienie że dana gra już istnieje
//2.dodac tostowanie że gra została dodana
//3. po dodaniu gry usunać pytania z newGameQuestions i zresetowac input gameId
//4. wuszukać daną grę po id a nastepnie  odczytac dane z bazy danych gry by móc w nia grać
