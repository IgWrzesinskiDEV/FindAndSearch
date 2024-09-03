import { toast } from "react-toastify";
import { db } from "../../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { newGameDataActions } from "./newGameData";
// Add a new document in collection "cities"
import { hashCorrectAnswer } from "../../hashing";
export const postNewGame = (game) => {
  return async (dispatch) => {
    try {
      const gameRef = doc(db, "games", game.id);
      const gameDoc = await getDoc(gameRef);

      if (!gameDoc.exists()) {
        const questions = await Promise.all(
          game.questions.map(async (question) => {
            return {
              ...question,
              answer: await hashCorrectAnswer(question.answer.toLowerCase()),
            };
          })
        );
        console.log(questions);

        await toast.promise(setDoc(gameRef, { questions: questions }), {
          pending: "Sending game... 🚀",
          success: "Game has been added successfully 👌",
          error: "Failed to upload a game 🤯",
        });
        dispatch(newGameDataActions.resetNewGameQuestions());
      } else {
        toast.warn(`Game with ID:${game.id} already exists. 
          Please choose another ID.`);
      }
    } catch (err) {
      toast.error("Failed to post new game");
      console.log(err);
    }
  };
};
