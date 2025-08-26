import { Controller } from "react-hook-form";

export const QuestionField = ({ control, name, label }: any) => (
	<div className="field w-full">
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className="flex flex-col w-full gap-1">
					<label
						htmlFor={name}
						className="text-sm font-medium text-gray-700 transition-colors duration-300 peer-focus:text-blue-500"
					>
						{label}
					</label>
					<input
						id={name}
						{...field}
						placeholder="Ваш ответ"
						className="
                          peer
                          px-3 py-2
                          border border-gray-300
                          rounded-md
                          bg-white
                          text-gray-900
                          placeholder-gray-400
                          shadow-sm
                          focus:border-blue-500
                          focus:ring-2 focus:ring-blue-300
                          focus:outline-none
                          transition-all duration-300
                          hover:border-blue-400
                        "
					/>
				</div>
			)}
		/>
	</div>
);
