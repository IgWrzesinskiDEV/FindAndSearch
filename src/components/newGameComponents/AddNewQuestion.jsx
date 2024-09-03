/* eslint-disable react/prop-types */
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useDispatch } from "react-redux";
import { useState } from "react";
import isEmpty from "../../validate";
import { newGameDataActions } from "../../store/newGameData";
export default function AddNewQuestion({
  onCloseModal,
  title,
  editedQuestion = null,
}) {
  const dispatch = useDispatch();
  const [error, setError] = useState({
    questionText: false,
    answer: false,
    latitude: false,
    longitude: false,
    radius: false,
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
    if (
      isEmpty(question.questionText) ||
      isEmpty(question.answer) ||
      isEmpty(question.latitude) ||
      isEmpty(question.longitude) ||
      isEmpty(question.radius)
    ) {
      return;
    }

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
        <div className="flex">
          <Input
            placeholder="e.g: 23.6978 "
            step="0.00001"
            label="Latitude"
            type="number"
            min={0}
            name="latitude"
            error={error.latitude}
            editedValue={editedQuestion ? editedQuestion.latitude : ""}
            onBlur={onBlure}
          />
          <Input
            placeholder="e.g: 120.9605"
            step="0.00001"
            label="Longitude"
            type="number"
            min={0}
            name="longitude"
            error={error.longitude}
            editedValue={editedQuestion ? editedQuestion.longitude : ""}
            onBlur={onBlure}
          />
        </div>
        <Input
          placeholder="e.g: 50"
          type="number"
          label="Radius (meter)"
          min={0}
          className="w-1/4"
          name="radius"
          error={error.radius}
          editedValue={editedQuestion ? editedQuestion.radius : ""}
          onBlur={onBlure}
        />

        <Button>{editedQuestion ? "Edit " : "Submit "}</Button>
      </form>
    </div>
  );
}
