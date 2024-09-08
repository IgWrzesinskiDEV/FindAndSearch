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
        const mapsData = {};
        game.questions.map((question) => {
          mapsData[question.id] = {
            mapData: {
              ...question.mapData,
              polygonsCords: { ...question.mapData.polygonsCords },
            },
          };
        });

        const questionsData = {
          questionsData: await Promise.all(
            game.questions.map(async (question) => {
              return {
                questionText: question.questionData.questionText,
                answer: await hashCorrectAnswer(
                  question.questionData.answer.toLowerCase()
                ),
                id: question.id,
              };
            })
          ),
        };

        const setMapPromise = () => {
          return Promise.all(
            game.questions.map(async (question) => {
              const mapsColectionRef = doc(
                gameRef,
                "mapsData",
                question.id.toString()
              );
              return await setDoc(mapsColectionRef, {
                ...mapsData[question.id],
              });
            })
          );
        };

        await toast.promise(
          Promise.all([setDoc(gameRef, { ...questionsData }), setMapPromise()]),
          {
            pending: "Sending game... 🚀",
            success: "Game has been added successfully 👌",
            error: "Failed to upload a game 🤯",
          }
        );

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
