import QuestionField from "./QuestionField";

export default function NewQuestion({ question }) {
    const tdClass = "border-2 border-primary p-3";
    return (
        <>
            <button popovertarget="myheader" type="button">click</button>
            <tr className=" border-2 border-primary bg-stone-700 hover:bg-primaryDarker  odd:bg-stone-800 "  >
                <td className={tdClass} >{question.questionText}</td>
                <td className={tdClass} >{question.answer}</td>
                <td className={tdClass} >{question.latitude}</td>
                <td className={tdClass} >{question.longitude}</td>
                <td className={tdClass} >{question.radius}</td>
            </tr >
            <div popover="auto" id="myheader" >
                popover
            </div>
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