
import QuestionField from "./QuestionField";
import TablePopOver from "../UI/TablePopOver";
import { useRef } from "react";
import { MdEditNote } from "react-icons/md";
import { FaRegCircleXmark } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
export default function NewQuestion({ question }) {
    const popRef = useRef();
    const tdClass = "border-2 border-primary p-3";
    function openPopOver(event) {
        popRef.current.openPop(event);
    }
    return (
        <>

            <tr className=" border-2 border-primary bg-stone-700 hover:bg-primaryDarker  odd:bg-stone-800 relative" variant="contained" onClick={openPopOver}>
                <td className={tdClass} >{question.questionText}</td>
                <td className={tdClass} >{question.answer}</td>
                <td className={tdClass} >{question.latitude}</td>
                <td className={tdClass} >{question.longitude}</td>
                <td className={tdClass} >{question.radius}</td>

            </tr >
            <TablePopOver ref={popRef} >
                <div className="flex flex-col w-fit h-full justify-center border-2 border-primaryDarker bg-bgcColor text-stone-200 p-y-2 ">
                    <button className="flex  items-center p-2 justify-start">
                        <MdEditNote className="text-3xl text-yellow-100 mr-2" />Edit
                    </button>
                    <hr className="h-[3px] border-primary" />
                    <button className="flex p-2 items-center justify-start">
                        <FaRegCircleXmark className="text-2xl text-red-500 mr-2" />Delete
                    </button>
                </div>
            </TablePopOver>

        </>
        // <li className="flex flex-wrap items-center gap-y-3 border-primary border-2 w-full p-4 justify-between">

        //     <QuestionField textLabel="Question:" text={question.questionText} className="basis-1/2" />
        //     <QuestionField textLabel="Answer:" text={question.answer} className="basis-1/2" />
        //     <QuestionField textLabel="Latitude:" text={question.latitude} />
        //     <QuestionField textLabel="Longitude:" text={question.longitude} />
        //     <QuestionField textLabel="Radius:" text={question.radius} />

        // </li>
    );
}