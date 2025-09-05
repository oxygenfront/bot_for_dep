import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { QuestionField } from "@/entities/question/ui";
import { selectUserId, selectUserStatus } from "@/entities/user";
import { useCreateTestMutation } from "@/features/form/api";
import { StepNavigation } from "@/features/form/ui/StepNavigation";
import { QUESTIONS } from "@/shared/constants";
import { ProgressBar } from "@/shared/ui";
import { ThankYouCard } from "@/widgets";

const QUESTIONS_PER_PAGE = 4;

export const TestForm = () => {
	const { control, handleSubmit } = useForm();
	const userId = useSelector(selectUserId) as string;
	const status = useSelector(selectUserStatus);
	const [step, setStep] = useState(0);
	const [createTest] = useCreateTestMutation();
	const [isSubmitted, setIsSubmitted] = useState(false);

	const start = step * QUESTIONS_PER_PAGE;
	const end = start + QUESTIONS_PER_PAGE;
	const stepQuestions = QUESTIONS.slice(start, end);
	const totalSteps = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);

	const onSubmit = (data: any) => {
		createTest({ userId, answers: data });
	};

	useEffect(() => {
		if (status === "pending") {
			setIsSubmitted(true);
		}
	}, [status]);

	return (
		<div className="h-fit w-full flex justify-center p-6">
			<div className="w-full p-[1px] rounded-3xl bg-gradient-to-br from-indigo-500/50 via-fuchsia-500/50 to-sky-500/50 shadow-lg">
				<div className="bg-gray-900/70 backdrop-blur-lg rounded-3xl p-4 space-y-6 animate-fadeIn">
					{isSubmitted ? (
						<ThankYouCard />
					) : (
						<>
							<ProgressBar
								step={step}
								totalSteps={totalSteps}
								setStep={setStep}
							/>

							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col gap-6"
							>
								{stepQuestions.map((q, idx) => (
									<div
										key={q.id}
										className="opacity-0 animate-slideUp"
										style={{ animationDelay: `${idx * 0.12}s` }}
									>
										<QuestionField
											control={control}
											name={q.id}
											label={q.label}
											hint={q.hint}
										/>
									</div>
								))}

								<StepNavigation
									step={step}
									setStep={setStep}
									totalSteps={totalSteps}
								/>
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
