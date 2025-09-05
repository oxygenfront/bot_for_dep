import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const faqData = [
	{
		question: "Чем мы занимаемся?",
		answer:
			"Мы занимаемся торговлей цифровыми активами. Я — владелец и куратор данного чата.",
	},
	{
		question: "Как всё работает?",
		answer:
			"Ваша задача: пополнить баланс на бирже, сообщить о готовности, получить инструкции и работать под моим руководством.",
	},
	{
		question: "Я не разбираюсь в инвестициях, что мне делать?",
		answer:
			"Опыт не требуется. Нужно просто повторять мои сделки в своём кабинете на бирже.",
	},
	{
		question: "Каков шанс потерять вложенные средства?",
		answer:
			"При строгом следовании инструкциям — в минус уйти невозможно. Даю личную гарантию на каждый депозит.",
	},
	{
		question: "Как начать?",
		answer:
			"1. Написать мне и записаться.\n2. Авторизоваться на бирже.\n3. Пополнить баланс.\n4. Сообщить о готовности.\n5. Повторить мои сигналы.\n6. Вывести средства.",
	},
	{
		question: "Какая занятость и график работы?",
		answer:
			"От 1 до 2 часов в день, зависит от депозита. Вывод с биржи — до 60 минут.",
	},
	{
		question: "Какие гарантии?",
		answer:
			"Открытая деятельность, честные отзывы в чате, отсутствие предоплат, договоры на крупные суммы.",
	},
	{
		question: "Для чего вам средства клиентов?",
		answer:
			"Использую их как дополнительные инвестиции, заключая те же сделки, что и по своему счёту.",
	},
];

export const HomeInfo = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const toggle = (i: number) => setActiveIndex(activeIndex === i ? null : i);

	return (
		<div className="relative w-full max-w-3xl mx-auto px-4">
			<div className="p-[1px] rounded-3xl bg-gradient-to-br from-indigo-500/50 via-fuchsia-500/50 to-sky-500/50 shadow-[0_10px_50px_-10px_rgba(79,70,229,0.3)]">
				<div className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-5 space-y-6">
					<h2 className="text-2xl font-semibold text-zinc-100 text-center">
						Часто задаваемые вопросы
					</h2>

					<div className="space-y-4">
						{faqData.map((item, idx) => {
							const isOpen = idx === activeIndex;
							return (
								<div
									key={item.question}
									className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm transition-all"
								>
									<button
										type="button"
										onClick={() => toggle(idx)}
										className="w-full flex items-center justify-between px-6 py-2"
									>
										<span className="text-start text-base font-medium text-zinc-100">
											{item.question}
										</span>
										{isOpen ? (
											<ChevronUpIcon className="h-5 w-5 text-zinc-400" />
										) : (
											<ChevronDownIcon className="h-5 w-5 text-zinc-400" />
										)}
									</button>
									<div
										className="px-6 transition-all duration-300 ease-in-out"
										style={{
											maxHeight: isOpen ? "500px" : "0px",
											paddingBottom: isOpen ? "16px" : "0px",
										}}
									>
										<p className="text-zinc-300 whitespace-pre-line">
											{item.answer}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
