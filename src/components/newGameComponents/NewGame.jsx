import AddNewQuestion from "./AddNewQuestion";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { postNewGame } from "../../store/newGameStore/newGamesActions";
import { useDispatch } from "react-redux";
import NewQuestion from "./NewQuestion";
export default function NewGame() {
  const dispatch = useDispatch();
  const gameIdRef = useRef();
  const newGameQuestions = useSelector(
    (state) => state.newGame.newGameQuestions
  );
  const newQuestionsModalRef = useRef();
  const confirmModalRef = useRef();
  function openModalHandler(modalRef) {
    modalRef.current.open();
  }
  function closeModalHandler(modalRef) {
    modalRef.current.close();
  }
  console.log(newGameQuestions);

  function addGameToDbHandler() {
    const game = {
      id: gameIdRef.current.value,
      questions: newGameQuestions,
    };
    console.log(game);
    dispatch(postNewGame(game));
    closeModalHandler(confirmModalRef);
  }

  const thClass = "border-2 p-4 border-primary";
  return (
    <>
      <Modal ref={newQuestionsModalRef}>
        <button
          className="absolute top-5 right-5"
          onClick={() => closeModalHandler(newQuestionsModalRef)}
        >
          <FaRegCircleXmark className="text-3xl text-red-500" />
        </button>
        <AddNewQuestion
          onCloseModal={() => closeModalHandler(newQuestionsModalRef)}
          title="Add New Question"
        />
      </Modal>
      <Modal ref={confirmModalRef}>
        <div className="flex flex-wrap justify-center gap-6">
          <h2 className="text-2xl text-center basis-full ">
            Are you sure you want to create a new game with{" "}
            {newGameQuestions.length} questions?
          </h2>
          <Button onClick={addGameToDbHandler}>Yes</Button>
          <Button
            className="bg-red-500 border-none"
            onClick={() => closeModalHandler(confirmModalRef)}
            type="button"
          >
            No
          </Button>
        </div>
      </Modal>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center">Add new Game here!</h1>
        <form className="flex flex-col items-center gap-y-4">
          <Input
            label="Choose a id for your game!"
            placeholder="game ID"
            name="gameId"
            ref={gameIdRef}
            className="w-1/2"
          />
          {newGameQuestions.length > 0 && (
            <table className="border-2 table-auto border-primary ">
              <thead>
                <tr>
                  <th className={thClass}>Question</th>
                  <th className={thClass}>Answer</th>
                  <th className={thClass}>Latitude</th>
                  <th className={thClass}>Longitude</th>
                  <th className={thClass}>Radius</th>
                </tr>
              </thead>
              <tbody>
                {newGameQuestions.map((question) => (
                  <NewQuestion question={question} key={question.id} />
                ))}
              </tbody>
            </table>
          )}
          <div id="popOver"></div>

          <Button
            onClick={() => openModalHandler(newQuestionsModalRef)}
            type="button"
          >
            Add question <FaPlus />
          </Button>
          <Button
            onClick={() => openModalHandler(confirmModalRef)}
            type="button"
            disabled={newGameQuestions.length === 0}
          >
            Add game
          </Button>
        </form>
      </div>
    </>
  );
}
