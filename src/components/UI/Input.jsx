import { twMerge } from 'tailwind-merge'

export default function Input({ label, name, type = "text", error, ...props }) {
    return (
        <div className="flex flex-col items-center gap-y-2 w-full">
            {label && <label htmlFor={name}>{label}</label>}
            <input type={type} name={name} {...props} className={twMerge("p-2 outline w-3/4 outline-primaryDarker outline-2 focus:outline-primary", props.className)} />
            {error && <p className='text-red-500'>Required value</p>}
        </div>
    );
}