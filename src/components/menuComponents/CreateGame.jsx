import NewGame from "../newGameComponents/NewGame";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { RiMenuFold3Line } from "react-icons/ri";
import Modal from "../UI/Modal";
import ConfirmExit from "../UI/ConfirmExit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { newGameDataActions } from "../../store/newGameStore/newGameData";
export default function CreateGame() {
  const exitConfrimModalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newGameQuestions = useSelector(
    (state) => state.newGame.newGameQuestions
  );
  function openConfrimModal() {
    exitConfrimModalRef.current.open();
  }
  function closeConfrimModal() {
    exitConfrimModalRef.current.close();
  }
  function handleExit() {
    if (newGameQuestions.length > 0) {
      openConfrimModal();
    } else {
      navigate("/"); // Programmatically navigate to the main screen
    }
  }
  function confirmExit() {
    dispatch(newGameDataActions.resetNewGameQuestions());
    exitConfrimModalRef.current.close();
    navigate("/");
  }

  return (
    <>
      <Modal ref={exitConfrimModalRef}>
        <ConfirmExit
          closeExtiModal={closeConfrimModal}
          exitHandler={confirmExit}
          text="You want to exit a game creator?"
        />
      </Modal>

      <button
        className="absolute top-0 left-0 m-4 transition-transform duration-200 hover:scale-110 "
        onClick={handleExit}
      >
        <RiMenuFold3Line className="text-5xl text-primary" />
      </button>

      <NewGame />
    </>
  );
}
