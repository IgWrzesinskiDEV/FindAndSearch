/* eslint-disable react/prop-types */
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import isEmpty from "../../validate";
import { newGameDataActions } from "../../store/newGameStore/newGameData";
import DrawingMap from "./DrawingMap";
export default function AddNewQuestion({
  onCloseModal,
  title,
  editedQuestion = null,
}) {
  const dispatch = useDispatch();
  const mapRef = useRef();
  const [error, setError] = useState({
    questionText: false,
    answer: false,
  });

  function onBlure(e) {
    if (isEmpty(e.target.value)) {
      setError((prev) => ({ ...prev, [e.target.name]: true }));
    } else {
      setError((prev) => ({ ...prev, [e.target.name]: false }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const question = Object.fromEntries(formData.entries());

    for (const key in question) {
      if (isEmpty(question[key])) {
        setError((prev) => ({ ...prev, [key]: true }));
      }
    }
    if (isEmpty(question.questionText) || isEmpty(question.answer)) {
      return;
    }
    console.log(mapRef.current.getMapInfo());

    e.target.reset();
    if (editedQuestion) {
      question.id = editedQuestion.id;
      dispatch(newGameDataActions.editNewGameQuestion(question));
    } else {
      question.id = Math.random();
      dispatch(newGameDataActions.pushNewGameQuestion(question));
    }

    onCloseModal();
  }

  //const { questionText, answer, latitude, longitude, radius } = editedQuestion;

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-5 text-2xl font-bold uppercase text-primaryLighter">
        {title}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col items-center justify-center w-full gap-4"
      >
        <Input
          placeholder="Enter the question"
          label="Question"
          name="questionText"
          error={error.questionText}
          editedValue={editedQuestion ? editedQuestion.questionText : ""}
          onBlur={onBlure}
        />
        <Input
          placeholder="Correct answer to the question"
          label="Answer"
          name="answer"
          error={error.answer}
          editedValue={editedQuestion ? editedQuestion.answer : ""}
          onBlur={onBlure}
        />
        <DrawingMap ref={mapRef} />

        <Button>{editedQuestion ? "Edit " : "Submit "}</Button>
      </form>
    </div>
  );
}
