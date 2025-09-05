import {
	ArrowPathIcon,
	CheckCircleIcon,
	ClockIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "@/entities/user/api";
import { QUESTIONS } from "@/shared/constants";

export const UserManagementPage = () => {
	const { userId } = useParams();

	const {
		data: user,
		isLoading,
		isError,
	} = useGetUserQuery(userId as string, { skip: !userId });

	const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

	const [comment, setComment] = useState("");
	const [feedback, setFeedback] = useState<string | null>(null);

	// Автоподстановка комментария из API
	useEffect(() => {
		setComment(user?.comment ?? "");
	}, [user?.comment]);

	// Автосайзинг textarea
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <>
	useEffect(() => {
		const el = textAreaRef.current;
		if (!el) return;
		el.style.height = "0px";
		el.style.height = el.scrollHeight + "px";
	}, [comment]);

	const answersArray = useMemo(() => {
		const entries = Object.entries(user?.answers ?? {});
		entries.sort(([a], [b]) => Number(a.slice(1)) - Number(b.slice(1)));
		return entries.map(([key, value]) => ({
			question: QUESTIONS.find((q) => q.id === key)?.label || key,
			answer: String(value ?? ""),
		}));
	}, [user?.answers]);

	const statusMap = {
		approved: {
			text: "Одобрен",
			cls: "ring-1 bg-emerald-500/10 text-emerald-300 ring-emerald-600/30",
			Icon: CheckCircleIcon,
		},
		rejected: {
			text: "Отклонён",
			cls: "ring-1 bg-rose-500/10 text-rose-300 ring-rose-600/30",
			Icon: XCircleIcon,
		},
		pending: {
			text: "На рассмотрении",
			cls: "ring-1 bg-amber-500/10 text-amber-300 ring-amber-600/30",
			Icon: ClockIcon,
		},
	} as const;

	const statusKey = (user?.approveUser as keyof typeof statusMap) ?? "pending";
	const StatusIcon = statusMap[statusKey].Icon;

	const initials =
		user?.username?.slice(0, 2)?.toUpperCase() ||
		(user?.id ? String(user.id).slice(-2) : "U");

	const handleDecision = async (approveUser: "approved" | "rejected") => {
		setFeedback(null);
		try {
			await updateUser({ id: user!.id, approveUser, comment }).unwrap();
			setFeedback(
				approveUser === "approved"
					? "Пользователь одобрен"
					: "Пользователь отклонён",
			);
			setTimeout(() => setFeedback(null), 2400);
		} catch {
			setFeedback("Ошибка при сохранении. Попробуйте ещё раз.");
		}
	};

	// Скелетон загрузки
	if (isLoading) {
		return <span>Loading...</span>;
	}

	// Ошибка / пусто
	if (isError || !user) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 via-zinc-900 to-black px-4">
				<div className="max-w-md w-full text-center p-8 rounded-3xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
					<div className="mx-auto mb-3 h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center ring-1 ring-rose-500/20">
						<XCircleIcon className="h-6 w-6 text-rose-500" />
					</div>
					<h2 className="text-lg font-semibold text-zinc-100">
						Пользователь не найден
					</h2>
					<p className="mt-2 text-sm text-zinc-400">
						Проверьте ID или попробуйте позже.
					</p>
					<div className="mt-6 flex gap-2 justify-center">
						<button
							type="button"
							onClick={() => window.history.back()}
							className="px-4 py-2 rounded-lg border border-white/10 text-zinc-200 hover:bg-white/5 transition"
						>
							Назад
						</button>
						<button
							type="button"
							onClick={() => window.location.reload()}
							className="px-4 py-2 rounded-lg bg-zinc-900 bg-white text-zinc-900 hover:opacity-90 transition"
						>
							Обновить
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="min-h-screen mx-auto max-w-3xl px-4 pb-[calc(env(safe-area-inset-bottom)+6rem)]">
				{/* Карточка с градиентной рамкой */}
				<div className="p-[1px] rounded-3xl bg-gradient-to-br from-indigo-500/50 via-fuchsia-500/50 to-sky-500/50 shadow-[0_24px_80px_-24px_rgba(79,70,229,0.35)]">
					<div className="rounded-3xl bg-zinc-900/60 backdrop-blur-xl">
						{/* Профиль */}
						<div className="p-5 sm:p-6">
							<div className="flex items-start gap-4">
								<div className="relative">
									<div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-[2px]">
										<div className="h-full w-full rounded-[14px] bg-zinc-900 flex items-center justify-center text-lg font-semibold text-white">
											{initials}
										</div>
									</div>
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex flex-wrap items-center gap-2">
										<p className="text-lg font-semibold text-zinc-100 truncate">
											{user.username || "Без имени"}
										</p>
										<span
											className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${statusMap[statusKey].cls}`}
										>
											<StatusIcon className="h-4 w-4" />
											{statusMap[statusKey].text}
										</span>
									</div>
									<p className="mt-0.5 text-sm text-zinc-400">ID: {user.id}</p>
								</div>
							</div>
						</div>

						{/* Вопросы и ответы */}
						<section className="px-5 sm:px-6 pb-4">
							<h2 className="text-sm font-semibold text-zinc-200 mb-2">
								Вопросы и ответы
							</h2>
							<ul className="space-y-3 max-h-[52vh] overflow-y-auto pr-1">
								{answersArray.map((qa, i) => (
									<li
										// biome-ignore lint/suspicious/noArrayIndexKey: <>
										key={i}
										className="group relative rounded-xl border border-white/10 bg-white/5 p-3"
									>
										<div className="flex items-start gap-3">
											<div className="mt-0.5 h-6 w-6 shrink-0 rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/20 flex items-center justify-center text-xs font-medium">
												{i + 1}
											</div>
											<div className="min-w-0">
												<p className="text-xs font-medium text-zinc-400">
													{qa.question}
												</p>
												<p className="mt-1 text-sm text-zinc-100 whitespace-pre-wrap">
													{qa.answer}
												</p>
											</div>
										</div>
										<div className="absolute inset-x-3 bottom-0 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
											<div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
										</div>
									</li>
								))}
								{answersArray.length === 0 && (
									<li className="p-4 text-sm text-zinc-400 rounded-xl border border-dashed border-white/10">
										Ответов пока нет.
									</li>
								)}
							</ul>
						</section>

						<section className="px-5 sm:px-6 pb-5">
							<label
								htmlFor="comment"
								className="block text-sm font-medium text-zinc-100 mb-1"
							>
								Комментарий администратора
							</label>
							<div className="relative">
								<textarea
									id="comment"
									ref={textAreaRef}
									rows={1}
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									placeholder="Введите комментарий к пользователю"
									className="w-full resize-none leading-relaxed rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition"
								/>
								<div className="pointer-events-none absolute right-2 bottom-2 text-[11px] text-zinc-500">
									{comment.length}/500
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>

			{/* Нижняя панель действий */}
			<div className="fixed bottom-2 left-0 right-0">
				<div className="mx-auto max-w-3xl px-4">
					<div className="flex gap-3 rounded-2xl backdrop-blur bg-black/30 border border-white/10 p-2 shadow-[0_12px_50px_-12px_rgba(0,0,0,0.25)]">
						<button
							type="button"
							onClick={() => handleDecision("rejected")}
							disabled={isUpdating}
							className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium text-white bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-500/95 hover:to-rose-600/95 active:translate-y-[1px] transition disabled:opacity-60"
						>
							<XCircleIcon className="h-5 w-5" />
							Отклонить
						</button>
						<button
							type="button"
							onClick={() => handleDecision("approved")}
							disabled={isUpdating}
							className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium text-white bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-500/95 hover:to-emerald-600/95 active:translate-y-[1px] transition disabled:opacity-60"
						>
							{isUpdating ? (
								<>
									<ArrowPathIcon className="h-5 w-5 animate-spin" />
									Сохранение…
								</>
							) : (
								<>
									<CheckCircleIcon className="h-5 w-5" />
									Одобрить
								</>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Тоаст-обратная связь */}
			{feedback && (
				<div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30">
					<div className="rounded-xl bg-whitetext-zinc-900 px-4 py-2 shadow-2xl border border-white/10">
						<div className="flex items-center gap-2 text-sm">
							<span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
							{feedback}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
