import QuestionForm from "./QuestionForm";
import Map from "./Map";
import { useSelector, useDispatch } from "react-redux";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IoExitOutline } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa";
import { gameDataActions } from "../../store/currentGameStore/gameData";
import { fetchMapData } from "../../store/currentGameStore/gamesActions";
import { useEffect, useRef } from "react";
import Modal from "../UI/Modal";

import ConfirmExit from "../UI/ConfirmExit";
export default function QuestionScreen() {
  const confirmModalRef = useRef();
  const currentGameId = useSelector((state) => state.game.currentGame.gameId);
  const isShaking = useSelector((state) => state.app.isShaking);
  const questionsDispleyed = useSelector(
    (state) => state.game.questionsDispleyed
  );
  const currentGameQuestions = useSelector(
    (state) => state.game.currentGameQuestions
  );
  const currentQuestionIndex = useSelector(
    (state) => state.game.currentQuestionIndex
  );
  const mapData = useSelector((state) => state.game.currentMap);
  const dispatch = useDispatch();

  let isLastQuestion = false;
  if (currentQuestionIndex === currentGameQuestions.length - 1) {
    isLastQuestion = true;
  }

  const currentQuestion = questionsDispleyed[currentQuestionIndex].question;
  const isCorrectAnswer =
    questionsDispleyed[currentQuestionIndex].correctAnswer;
  console.log(isCorrectAnswer, "isCorrectAnswer");

  useEffect(() => {
    if (isCorrectAnswer) {
      dispatch(fetchMapData(currentQuestion.id, currentGameId));
    }
  }, [isCorrectAnswer, currentQuestion.id, currentGameId, dispatch]);
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

  function exitGameHandler() {
    dispatch(gameDataActions.resetGame());
    confirmModalRef.current.close();
  }
  function closeExtiModal() {
    confirmModalRef.current.close();
  }
  function openExitModal() {
    confirmModalRef.current.open();
  }

  return (
    <>
      <Modal ref={confirmModalRef}>
        <ConfirmExit
          closeExtiModal={closeExtiModal}
          exitHandler={exitGameHandler}
          text="You want to exit the game?"
        />
      </Modal>
      <section className="flex flex-col items-center">
        <button
          className="absolute top-0 left-0 m-4 text-5xl text-red-600 transition-transform duration-200 hover:scale-110"
          onClick={openExitModal}
        >
          <IoExitOutline className="rotate-180 " />
        </button>

        {isLastQuestion && (
          <h1 className="w-1/2 my-5 text-2xl font-bold text-center text-red-600 uppercase">
            This is the last question!
          </h1>
        )}
        <h2 className="my-5 text-2xl font-bold uppercase text-cyan-500">
          Question number {currentQuestionIndex + 1}
        </h2>
        <QuestionForm
          placeholder="Type correct answer"
          label={currentQuestion.questionText}
          name="gameQuestion"
        />
        {isCorrectAnswer && mapData ? (
          <>
            <p className="mt-6 text-3xl font-bold text-green-400">
              Correct Answer!
              <span role="img" aria-label="check" className="ml-1">
                ✅
              </span>
            </p>
            <p className="mt-6 text-xl font-bold">
              {isLastQuestion
                ? "Go to finnal location!"
                : "Go to next location!"}
            </p>
            <FaArrowDown className="mt-8 text-6xl text-primary animate-bounce" />
            <Map mapData={mapData} />
          </>
        ) : null}
        {!isCorrectAnswer && isCorrectAnswer !== null && (
          <p
            className={`mt-6 text-3xl font-bold text-red-500 ${
              isShaking ? "shake" : ""
            }`}
          >
            Incorrect Answer!
            <span role="img" aria-label="cross" className="ml-1">
              ❌
            </span>
          </p>
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
          {isCorrectAnswer &&
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
      </section>
    </>
  );
}
