import QuestionForm from "./QuestionForm";
import Map from "./Map";
import { useSelector, useDispatch } from "react-redux";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { gameDataActions } from "../store/gameData";
export default function QuestionScreen() {
  const questionsDispleyed = useSelector(
    (state) => state.game.questionsDispleyed
  );
  const currentGameQuestions = useSelector(
    (state) => state.game.currentGameQuestions
  );
  const currentQuestionIndex = useSelector(
    (state) => state.game.currentQuestionIndex
  );
  const dispatch = useDispatch();
  //const crrQuestion = questionsDispleyed[currentQuestionIndex];

  const currentQuestion = questionsDispleyed[currentQuestionIndex].question;
  const iscorrectAnswer =
    questionsDispleyed[currentQuestionIndex].correctAnswer;

  function nextQuestionHandler() {
    if (currentQuestionIndex === questionsDispleyed.length - 1) {
      dispatch(
        gameDataActions.pushQuestionsDispleyed({
          question: currentGameQuestions[currentQuestionIndex + 1],
          correctAnswer: null,
          questionIndex: currentQuestionIndex + 1,
        })
      );
      dispatch(gameDataActions.incrementCurrentQuestionIndex());
    } else {
      dispatch(gameDataActions.incrementCurrentQuestionIndex());
    }
  }
  function previousQuestionHandler() {
    dispatch(
      gameDataActions.setCurrentQuestion({
        question: currentGameQuestions[currentQuestionIndex - 1],
        correctAnswer: true,
      })
    );

    dispatch(gameDataActions.decrementCurrentQuestionIndex());
  }

  return (
    <header className="flex flex-col items-center">
      {currentQuestionIndex === currentGameQuestions.length - 1 && (
        <h1 className="my-5 text-2xl font-bold text-red-600 uppercase">
          This is the last question!
        </h1>
      )}
      <h2 className="my-5 text-2xl font-bold uppercase text-cyan-500">
        Question number {currentQuestionIndex + 1}
      </h2>
      <QuestionForm
        placeholder="Type correct answer"
        label={currentQuestion.question}
        name="gameQuestion"
      />
      {iscorrectAnswer && (
        <>
          <p className="mt-6 text-2xl font-bold">Correct Answer!</p>
          <p className="mt-6 text-xl font-bold">Go to next location!</p>
          <Map
            coordinates={currentQuestion.coordinates}
            radius={currentQuestion.radius}
          />
        </>
      )}
      {!iscorrectAnswer && iscorrectAnswer !== null && (
        <p className="mt-6 text-2xl font-bold">Incorrect Answer!</p>
      )}
      <p className="flex justify-around w-full my-6">
        {currentQuestionIndex !== 0 && (
          <button
            className="flex items-center justify-center w-1/3 p-2 mt-2 border-2 rounded-md border-sky-500"
            onClick={previousQuestionHandler}
          >
            <GrFormPrevious className="text-6xl " />
            Previous question
          </button>
        )}
        {iscorrectAnswer &&
          currentGameQuestions.length - 1 !== currentQuestionIndex && (
            <button
              onClick={nextQuestionHandler}
              className="flex items-center justify-center w-1/3 p-2 mt-2 border-2 rounded-md border-sky-500"
            >
              Next question
              <GrFormNext className="text-6xl " />
            </button>
          )}
      </p>
    </header>
  );
}
