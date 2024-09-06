/* eslint-disable react/prop-types */

import TablePopOver from "../UI/TablePopOver";
import { useRef, useState } from "react";
import { MdEditNote } from "react-icons/md";
// import { FaRegCircleXmark } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { newGameDataActions } from "../../store/newGameStore/newGameData";
import { newMapDataActions } from "../../store/newMapStore/newMapData";
import { twMerge } from "tailwind-merge";
import Modal from "../UI/Modal";
import AddNewQuestion from "./AddNewQuestion";
export default function NewQuestion({ question }) {
  const popRef = useRef();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);

  function openPopOver(event) {
    popRef.current.openPop(event);
    setIsSelected(true);
  }
  function deleteQuestionHandler(id) {
    dispatch(newGameDataActions.deleteNewGameQuestion(id));
  }
  function editQuestionHandler() {
    console.log(question);
    dispatch(
      newMapDataActions.overWritePolygons(question.mapData.polygonsCords)
    );
    openModalHandler();
    popRef.current.closePop();
  }

  function openModalHandler() {
    modalRef.current.open();
  }
  function closeModalHandler() {
    modalRef.current.close();
  }
  const tdClass = "border-2 border-primary p-3";
  const trBgClass = isSelected
    ? " bg-primaryDarker"
    : " bg-stone-700 odd:bg-stone-800";

  return (
    <>
      <Modal ref={modalRef}>
        <button className="absolute top-5 right-5" onClick={closeModalHandler}>
          <FaRegCircleXmark className="text-3xl text-red-500" />
        </button>
        <AddNewQuestion
          onCloseModal={closeModalHandler}
          title="Edit Question"
          editedQuestion={question}
        />
      </Modal>
      <tr
        className={twMerge(
          "relative border-2 cursor-pointer border-primary  hover:bg-primaryDarker  ",
          trBgClass
        )}
        onClick={openPopOver}
      >
        <td className={tdClass}>{question.questionData.questionText}</td>
        <td className={tdClass}>{question.questionData.answer}</td>
      </tr>
      <TablePopOver ref={popRef} setIsSelected={setIsSelected}>
        <div className="flex flex-col justify-center h-full border-2 border-t-0 w-fit border-primaryDarker bg-bgcColor text-stone-200 p-y-2 ">
          <button
            className="flex items-center justify-start p-2 group"
            onClick={editQuestionHandler}
          >
            <MdEditNote className="mr-2 text-3xl text-yellow-100 duration-300 ease-out group-hover:scale-110 transiton" />
            Edit
          </button>
          <hr className=" border-primary" />
          <button
            className="flex items-center justify-start p-2 group"
            onClick={() => deleteQuestionHandler(question.id)}
          >
            <FaTrashAlt className="mr-2 text-2xl text-red-500 duration-300 ease-out group-hover:scale-110 transiton" />
            Delete
          </button>
        </div>
      </TablePopOver>
    </>
  );
}
