import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const ThankYouCard = () => {
	return (
		<div
			className="
        w-64 h-64
        flex flex-col items-center justify-center
        text-center
        bg-green-50
        border border-green-200
        rounded-xl
        shadow-md
        p-6
        animate-fadeIn
      "
		>
			<CheckCircleIcon className="w-16 h-16 text-green-500 animate-bounce" />
			<p className="mt-4 text-green-800 font-medium text-sm leading-relaxed">
				Спасибо за ответы. <br />
				После их проверки, <br />
				вам придет уведомление <br />в бота.
			</p>
		</div>
	);
};
