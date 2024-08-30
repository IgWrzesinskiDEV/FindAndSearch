export default function AddNewQuestion() {
    // const dispatch = useDispatch();
    // const addQuestion = () => {
    //     dispatch(
    //         addNewQuestion({
    //             question,
    //             correctAnswer,
    //             locationCords,
    //             radius
    //         })
    //     );
    // };
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-5">Add New Question</h1>
            <input
                type="text"
                placeholder="Enter the question"
                className="border-2 border-sky-500 p-2 rounded-md mb-5"
            />

            <select
                className="border-2 border-sky-500 p-2 rounded-md mb-5"

            >

            </select>
            <button

                className="border-2 border-sky-500 p-2 rounded-md bg-sky-500 text-white"
            >
                Add Question
            </button>
        </div>
    );
}