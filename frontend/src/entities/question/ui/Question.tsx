import { type Control, Controller } from "react-hook-form";

interface QuestionFieldProps {
	control: Control<any>;
	name: string;
	label: string;
	hint?: string;
}

export const QuestionField = ({
	control,
	name,
	label,
	hint,
}: QuestionFieldProps) => (
	<Controller
		name={name}
		control={control}
		render={({ field }) => (
			<div className="flex flex-col gap-1">
				<label
					htmlFor={name}
					className="text-sm font-medium text-gray-200 transition-colors peer-focus:text-indigo-500"
				>
					{label}
				</label>
				<input
					id={name}
					{...field}
					placeholder={hint || "Ваш ответ"}
					className="
            peer
            w-full
            px-4 py-2
            border border-gray-700
            rounded-lg
          bg-gray-800
          text-gray-100
          placeholder-gray-500
            shadow-sm
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300
            outline-none
            transition-all duration-300
            hover:border-indigo-400
          "
				/>
			</div>
		)}
	/>
);
