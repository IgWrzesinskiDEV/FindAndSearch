import Button from "../UI/Button";
import Input from "../UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import isEmpty from "../../validate";
import { newGameDataActions } from "../../store/newGameStore/newGameData";

import DrawingMap from "./DrawingMap";
import { newMapDataActions } from "../../store/newMapStore/newMapData";
import QuestionCreateSteper from "../UI/Stepper";

export default function AddNewQuestion({
  onCloseModal,
  title,
  editedQuestion,
}) {
  console.log(editedQuestion, "editedQuestion");

  const polygonsCords = useSelector((state) => state.newMapData.polygonsCords);
  const activeStep = useSelector((state) => state.newGame.activeStep);
  const dispatch = useDispatch();
  const mapRef = useRef();
  const errors = useSelector((state) => state.newGame.subbmitedQuestionErors);

  useEffect(() => {
    if (editedQuestion) {
      dispatch(
        newMapDataActions.overWritePolygons(
          editedQuestion.mapData.polygonsCords
        )
      );
    }
  }, [dispatch, editedQuestion]);

  function onBlure(e) {
    if (isEmpty(e.target.value)) {
      dispatch(
        newGameDataActions.setSubbmitedQuestionErors({
          ...errors,
          [e.target.name]: true,
        })
      );
      //setError((prev) => ({ ...prev, [e.target.name]: true }));
    } else {
      dispatch(
        newGameDataActions.setSubbmitedQuestionErors({
          ...errors,
          [e.target.name]: false,
        })
      );
      //setError((prev) => ({ ...prev, [e.target.name]: false }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const qAndA = Object.fromEntries(formData.entries());
    console.log(qAndA);

    for (const key in qAndA) {
      if (isEmpty(qAndA[key])) {
        dispatch(
          newGameDataActions.setSubbmitedQuestionErors({
            ...errors,
            [key]: true,
          })
        );
        //setError((prev) => ({ ...prev, [key]: true }));
      }
    }
    if (polygonsCords.length === 0) {
      dispatch(
        newGameDataActions.setSubbmitedQuestionErors({
          ...errors,
          polygonsCords: true,
        })
      );
      //setError((prev) => ({ ...prev, polygonsCords: true }));
    }
    console.log(errors);
    console.log(polygonsCords);

    if (
      isEmpty(qAndA.questionText) ||
      isEmpty(qAndA.answer) ||
      polygonsCords.length === 0
    ) {
      return;
    }

    e.target.reset();

    const question = {
      questionData: { questionText: qAndA.questionText, answer: qAndA.answer },
      mapData: {
        mapInfo: mapRef.current.getMapInfo(),
        polygonsCords: polygonsCords,
      },
    };
    if (editedQuestion) {
      question.id = editedQuestion.id;
      dispatch(newGameDataActions.editNewGameQuestion(question));
    } else {
      question.id = Math.random();
      dispatch(newGameDataActions.pushNewGameQuestion(question));
    }

    dispatch(newMapDataActions.resetPolygons());
    dispatch(newGameDataActions.setActiveStep(0));
    onCloseModal();
  }

  useEffect(() => {
    if (polygonsCords.length > 0) {
      //setError((prev) => ({ ...prev, polygonsCords: false }));
      dispatch(
        newGameDataActions.setSubbmitedQuestionErors({
          ...errors,
          polygonsCords: false,
        })
      );
    }
  }, [polygonsCords, dispatch]);

  return (
    <div className="flex flex-col items-center ">
      <h1 className="w-3/4 mb-5 text-xl font-bold text-center uppercase lg:text-2xl md:w-full text-primaryLighter">
        {title}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col items-center justify-center w-full gap-4"
      >
        <Input
          placeholder="Question text..."
          label="Question"
          name="questionText"
          error={errors.questionText}
          visable={activeStep === 0}
          editedValue={
            editedQuestion ? editedQuestion.questionData.questionText : ""
          }
          onBlur={onBlure}
        />
        <Input
          placeholder="Correct question answer..."
          label="Answer"
          name="answer"
          error={errors.answer}
          visable={activeStep === 0}
          editedValue={editedQuestion ? editedQuestion.questionData.answer : ""}
          onBlur={onBlure}
        />

        <DrawingMap
          ref={mapRef}
          visable={activeStep === 1}
          mapDataFromEdit={
            editedQuestion ? editedQuestion.mapData : editedQuestion
          }
        />
        {errors.polygonsCords && (
          <p className="text-red-500">Required at least one area selected</p>
        )}

        {/* <Button className="my-2">{editedQuestion ? "Edit " : "Create "}</Button> */}
        <QuestionCreateSteper createQuestionHandler={handleSubmit} />
      </form>
    </div>
  );
}
