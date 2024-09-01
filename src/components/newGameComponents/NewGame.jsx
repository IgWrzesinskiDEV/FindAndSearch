import AddNewQuestion from "./AddNewQuestion";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import NewQuestion from "./NewQuestion";
export default function NewGame() {
    const newGameQuestions = useSelector((state) => state.newGame.newGameQuestions);
    const modalRef = useRef();
    function openModalHandler() {
        modalRef.current.open();
    }
    function closeModalHandler() {
        modalRef.current.close();
    }
    const thClass = "border-2 p-4 border-primary";
    return (
        <>
            <Modal ref={modalRef}>
                <button className="absolute top-5 right-5" onClick={closeModalHandler}><FaRegCircleXmark className="text-red-500 text-3xl" /></button>
                <AddNewQuestion onCloseModal={closeModalHandler} />
            </Modal>
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-center">Add new Game here!</h1>
                <form className="flex flex-col gap-y-4 items-center">
                    <Input label="Choose a id for your game!" placeholder="game ID" name="gameId" className="w-1/2" />
                    {newGameQuestions.length > 0 && <table className="table-auto border-2 border-primary ">
                        <thead>
                            <tr >
                                <th className={thClass}>Question</th>
                                <th className={thClass}>Answer</th>
                                <th className={thClass}>Latitude</th>
                                <th className={thClass}>Longitude</th>
                                <th className={thClass}>Radius</th>

                            </tr>
                        </thead>
                        <tbody>
                            {newGameQuestions.map((question, index) => (
                                <NewQuestion question={question} key={question.id} />))}
                        </tbody>
                    </table>}
                    <div id="popOver"></div>

                    <Button onClick={openModalHandler} type="button">Add question <FaPlus /></Button>
                    <Button className="">Add game</Button>
                </form>

            </div>
        </>
    );
}