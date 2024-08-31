import Button from "../UI/Button";
import Input from "../UI/Input";
import { useDispatch } from "react-redux";
import { useState } from "react";
import isEmpty from "../../validate";
import { newGameDataActions } from "../../store/newGameData";
export default function AddNewQuestion({ onCloseModal }) {
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
        if (isEmpty(question.questionText) || isEmpty(question.answer) || isEmpty(question.latitude) || isEmpty(question.longitude) || isEmpty(question.radius)) {
            return;
        }


        question.id = Math.random();
        e.target.reset();
        dispatch(newGameDataActions.pushNewGameQuestion(question));
        onCloseModal();
        console.log(question);


    }
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-5 text-primaryLighter uppercase">Add New Question</h1>
            <form onSubmit={handleSubmit} className="flex relative flex-col gap-4 w-full items-center justify-center">

                <Input placeholder="Enter the question" label="Question" name="questionText" error={error.questionText} onBlur={onBlure} />
                <Input placeholder="Correct answer to the question" label="Answer" name="answer" error={error.answer} onBlur={onBlure} />
                <div className="flex">
                    <Input placeholder="e.g: 23.6978 " step="0.00001" label="Latitude" type="number" min={0} name="latitude" error={error.latitude} onBlur={onBlure} />
                    <Input placeholder="e.g: 120.9605" step="0.00001" label="Longitude" type="number" min={0} name="longitude" error={error.longitude} onBlur={onBlure} />
                </div>
                <Input placeholder="e.g: 50" type="number" label="Radius (meter)" min={0} className="w-1/4" name="radius" error={error.radius} onBlur={onBlure} />

                <Button>
                    Submit question
                </Button>
            </form>
        </div>
    );
}