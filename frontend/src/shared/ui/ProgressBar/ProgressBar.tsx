import type { FC } from "react";

interface ProgressBarProps {
	step: number; // текущий шаг (0-индексация)
	totalSteps: number; // общее количество шагов
	setStep: (step: number) => void;
}

export const ProgressBar: FC<ProgressBarProps> = ({
	step,
	totalSteps,
	setStep,
}) => {
	const stepsArray = Array.from({ length: totalSteps });

	return (
		<div className="w-full flex gap-2">
			{stepsArray.map((_, index) => (
				<button
					onClick={() => setStep(index)}
					type="button"
					// biome-ignore lint/suspicious/noArrayIndexKey: <>
					key={index}
					className={`flex-1 h-2 rounded-full transition-colors duration-300 cursor-pointer
            ${index <= step ? "bg-blue-500" : "bg-gray-200"}
          `}
				/>
			))}
		</div>
	);
};
