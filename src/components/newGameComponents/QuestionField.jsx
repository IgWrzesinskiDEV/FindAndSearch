import { twMerge } from "tailwind-merge"

export default function QuestionField({ textLabel, text, className }) {
    return <div className={twMerge("flex flex-col text-center", className)}>
        <p className="text-primary text-xl">{textLabel}</p>
        <p className="text-wrap">{text}</p>
    </div>
}