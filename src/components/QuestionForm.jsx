/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { gameDataActions } from "../store/gameData";
export default function QuestionForm({ label, name, placeholder }) {
  const dispatch = useDispatch();
  const correctAnswer = useSelector(
    (state) => state.game.currentQuestion.correctAnswer
  );
  const questionAnswer = useSelector(
    (state) => state.game.currentQuestion.question.answer
  );
  const inputRef = useRef();
  let isDisabled = correctAnswer;
  function submitHandler(e) {
    e.preventDefault();
    const userAnswer = inputRef.current.value;

    if (userAnswer.toLowerCase() === questionAnswer) {
      isDisabled = true;
      dispatch(gameDataActions.setCorrectAnswer(true));
      //dispatch(gameDataActions.);
    } else {
      dispatch(gameDataActions.setCorrectAnswer(false));
    }
    e.target.reset();
  }

  return (
    <form
      className="flex flex-col w-4/5 mx-auto gap-3 justify-center items-center h-[30vh] border-2 border-sky-500 rounded-md"
      onSubmit={submitHandler}
    >
      <label htmlFor={name} className="my-5 text-xl text-center">
        {label}
      </label>
      <input
        type="text"
        name={name}
        ref={inputRef}
        placeholder={placeholder}
        className="p-2 placeholder:p-2"
      />
      <button
        className="w-1/3 p-2 mt-2 border-2 rounded-md border-sky-500 disabled:opacity-50"
        disabled={isDisabled}
      >
        Click!
      </button>
    </form>
  );
}
