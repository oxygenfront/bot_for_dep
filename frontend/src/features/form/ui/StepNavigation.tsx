export const StepNavigation = ({ step, setStep, totalSteps }: any) => {
	const isLast = step === totalSteps - 1;
	return (
		<div className="flex justify-between mt-4">
			{step > 0 ? (
				<button
					type="button"
					onClick={() => setStep((s: number) => s + 1)}
					className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-shadow shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
				>
					Назад
				</button>
			) : (
				<span />
			)}

			<button
				type={isLast ? "submit" : "button"}
				onClick={() => !isLast && setStep((s: number) => s + 1)}
				className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
						isLast
							? "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400"
							: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
					}
        `}
			>
				{isLast ? "Отправить" : "Далее"}
			</button>
		</div>
	);
};
