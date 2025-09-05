import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const ThankYouCard = () => {
	return (
		<div
			className="
        w-full
        flex flex-col items-center justify-center gap-4
        p-6
        backdrop-blur-md
        rounded-2xl
        animate-fadeIn
      "
		>
			<CheckCircleIcon className="w-16 h-16 text-green-500 animate-bounce" />
			<p className="text-green-200 font-medium text-sm leading-relaxed text-center">
				Спасибо за ответы.
				<br />
				После их проверки,
				<br />
				вам придет уведомление
				<br />в бота.
			</p>
		</div>
	);
};
