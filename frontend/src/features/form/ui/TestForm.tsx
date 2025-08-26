import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { QuestionField } from "@/entities/question/ui";
import { selectUserStatus } from "@/entities/user";
import { useCreateTestMutation } from "@/features/form/api";
import { QUESTIONS } from "@/shared/constants";
import { ProgressBar } from "@/shared/ui";
import { ThankYouCard } from "@/widgets";
import { StepNavigation } from "./StepNavigation";

const QUESTIONS_PER_PAGE = 4;

export const TestForm = () => {
	const { control, handleSubmit } = useForm();
	const [params] = useSearchParams("userId");
	const userId = params.get("userId") as string;
	const [step, setStep] = useState(0);
	const [createTest] = useCreateTestMutation();
	const start = step * QUESTIONS_PER_PAGE;
	const end = start + QUESTIONS_PER_PAGE;
	const stepQuestions = QUESTIONS.slice(start, end);
	const totalSteps = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);
	const status = useSelector(selectUserStatus);
	const [isSubmitted, setIsSubmitted] = useState<string | null>();

	const onSubmit = (data: any) => {
		createTest({ userId, answers: { ...data } });
	};

	useEffect(() => {
		if (status === "pending") {
			setIsSubmitted(status);
		}
	}, [status]);

	return (
		<div className="flex justify-center items-center min-h-screen min-w-screen p-4">
			<div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-8 animate-fadeIn">
				{isSubmitted ? (
					<ThankYouCard />
				) : (
					<>
						<ProgressBar
							step={step}
							setStep={setStep}
							totalSteps={totalSteps}
						/>
						<form className="flex w-full flex-col gap-6">
							{stepQuestions.map((q, index) => (
								<div
									key={q.id}
									className="opacity-0 animate-slideUp"
									style={{ animationDelay: `${index * 0.15}s` }}
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
								handleSubmit={handleSubmit}
								onSubmit={onSubmit}
							/>
						</form>
					</>
				)}
			</div>
		</div>
	);
};
