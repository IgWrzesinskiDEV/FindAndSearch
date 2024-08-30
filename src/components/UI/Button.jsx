export default function Button({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className=" border-2 border-sky-500  text-white font-bold py-2 px-4 rounded"
        >
            {children}
        </button>
    );
}