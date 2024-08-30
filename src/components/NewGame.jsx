import AddNewQuestion from "./AddNewQuestion";
import Input from "./Input";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { useRef } from "react";
export default function NewGame() {
    const modalRef = useRef();
    function addNewQuestion() {
        modalRef.current.open();
    }
    return (
        <>
            <Modal ref={modalRef}>
                <AddNewQuestion />
            </Modal>
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-center">Add new Game here!</h1>
                <form className="flex flex-col gap-y-4">
                    <Input label="Game Id" name="gameId" />
                    <Button className="border-">Add game</Button>
                </form>
                <button className="border-sky-500 border-2 p-3 rounded-sm" onClick={addNewQuestion}>Add question</button>
            </div>
        </>
    );
}