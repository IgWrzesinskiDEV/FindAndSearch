/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Button from "../UI/Button";
import { gameDataActions } from "../../store/currentGameStore/gameData";
import { checkUserAnswer } from "../../hashing";
export default function QuestionForm({ label, name, placeholder }) {
  const dispatch = useDispatch();
  const correctAnswer = useSelector(
    (state) =>
      state.game.questionsDispleyed[state.game.currentQuestionIndex]
        .correctAnswer
  );
  const currentQuestionAnswer = useSelector(
    (state) =>
      state.game.questionsDispleyed[state.game.currentQuestionIndex].question
        .answer
  );

  const inputRef = useRef();
  let isDisabled = correctAnswer;
  async function submitHandler(e) {
    e.preventDefault();
    const userAnswer = inputRef.current.value;
    console.log(userAnswer, "userAnswer");
    console.log(currentQuestionAnswer, "currentQuestionAnswer");
    const isCorectAnswer = await checkUserAnswer(
      userAnswer.toLowerCase(),
      currentQuestionAnswer
    );
    if (isCorectAnswer) {
      isDisabled = true;
      dispatch(gameDataActions.setAnswerState(true));
    } else {
      dispatch(gameDataActions.setAnswerState(false));
    }
    e.target.reset();
  }

  return (
    <form
      className="flex flex-col items-center justify-center w-4/5 gap-3 p-8 mx-auto border-2 rounded-md border-sky-500"
      onSubmit={submitHandler}
    >
      <label
        htmlFor={name}
        className="w-full p-2 text-3xl text-center break-words text-pretty"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        disabled={isDisabled}
        ref={inputRef}
        placeholder={isDisabled ? "" : placeholder}
        className="p-2 placeholder:p-2"
      />
      <Button disabled={isDisabled}>Check Answer</Button>
    </form>
  );
}
