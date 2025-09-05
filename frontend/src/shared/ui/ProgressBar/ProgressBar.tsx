interface ProgressBarProps {
	step: number;
	totalSteps: number;
	setStep: (step: number) => void;
}

export const ProgressBar = ({
	step,
	totalSteps,
	setStep,
}: ProgressBarProps) => {
	return (
		<div className="w-full flex gap-2">
			{Array.from({ length: totalSteps }).map((_, idx) => (
				<button
					// biome-ignore lint/suspicious/noArrayIndexKey: <>
					key={idx}
					type="button"
					onClick={() => setStep(idx)}
					className={`flex-1 h-2 rounded-full transition-colors duration-300 cursor-pointer
            ${idx <= step ? "bg-indigo-500" : "bg-gray-700"}
          `}
				/>
			))}
		</div>
	);
};
