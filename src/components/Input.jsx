export default function Input({ label, name, type = "text", value }) {
    return (
        <div className="flex flex-col items-center gap-y-2">
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} value={value} />
        </div>
    );
}