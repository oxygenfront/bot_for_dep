export const StepNavigation = ({
	step,
	setStep,
	totalSteps,
	handleSubmit,
	onSubmit,
}: any) => {
	const isLastStep = step >= totalSteps - 1;

	const baseBtn =
		"px-5 py-2 rounded-md font-medium transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

	return (
		<div className="flex gap-3 mt-4">
			{step > 0 && (
				<button
					type="button"
					onClick={() => setStep((s: number) => s - 1)}
					className={`${baseBtn} bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400`}
				>
					Назад
				</button>
			)}

			{!isLastStep ? (
				<button
					type="button"
					onClick={() => setStep((s: number) => s + 1)}
					className={`${baseBtn} bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400`}
				>
					Далее
				</button>
			) : (
				<button
					type="button"
					onClick={handleSubmit(onSubmit)}
					className={`${baseBtn} bg-green-500 text-white hover:bg-green-600 focus:ring-green-400`}
				>
					Отправить
				</button>
			)}
		</div>
	);
};
