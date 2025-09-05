import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface Certificate {
	src: string;
	caption: string;
}

interface CertificatesBlockProps {
	images: Certificate[];
}

export const CertificatesBlock = ({ images }: CertificatesBlockProps) => {
	const [activeImage, setActiveImage] = useState<Certificate | null>(null);
	const [zoom, setZoom] = useState(1);
	const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

	useEffect(() => {
		setVisibleCards(new Array(images.length).fill(false));

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = Number(entry.target.getAttribute("data-index"));
						setVisibleCards((prev) => {
							const copy = [...prev];
							copy[index] = true;
							return copy;
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2 },
		);

		cardRefs.current.forEach((el) => el && observer.observe(el));
		return () => observer.disconnect();
	}, [images.length]);

	const handleImageClick = (img: Certificate) => {
		setActiveImage(img);
		setZoom(1);
	};

	return (
		<>
			<div className="relative w-full max-w-3xl mx-auto py-12 px-4">
				<div className="p-[1px] rounded-3xl bg-gradient-to-br from-indigo-500/50 via-fuchsia-500/50 to-sky-500/50 shadow-[0_10px_50px_-10px_rgba(79,70,229,0.3)]">
					<div className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-5 space-y-6">
						<h3 className="text-xl font-semibold text-zinc-100 text-center">
							Сертификаты трейдера
						</h3>
						<div className="flex flex-col gap-6">
							{images.map((item, idx) => {
								const isVisible = visibleCards[idx];
								return (
									<button
										type="button"
										key={idx}
										data-index={idx}
										ref={(el) => {
											cardRefs.current[idx] = el;
										}}
										onClick={() => handleImageClick(item)}
										className={`flex flex-col items-center text-center cursor-pointer transform transition-all duration-700 ease-out
                      ${
												isVisible
													? "opacity-100 translate-y-0"
													: "opacity-0 translate-y-6"
											}`}
										style={{
											transitionDelay: isVisible ? `${idx * 0.05}s` : "0s",
										}}
									>
										<img
											src={item.src}
											alt={item.caption}
											className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
										/>
										<span className="mt-2 text-sm text-zinc-400">
											{item.caption}
										</span>
									</button>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			{activeImage && (
				<button
					type="button"
					className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-center gap-3 animate-fadeIn"
					onClick={(e) => {
						if (e.target === e.currentTarget) setActiveImage(null);
					}}
				>
					<div className="relative overflow-auto max-h-[90vh] max-w-[90vw] ">
						<img
							src={activeImage.src}
							alt={activeImage.caption}
							className="transition-transform duration-200"
							style={{
								transform: `scale(${zoom})`,
								transformOrigin: "center center",
							}}
							onWheel={(e) => {
								e.preventDefault();
								setZoom((z) =>
									e.deltaY < 0 ? Math.min(z + 0.2, 3) : Math.max(z - 0.2, 1),
								);
							}}
						/>
						<button
							type="button"
							onClick={() => setActiveImage(null)}
							className="absolute top-4 right-4 p-2 bg-white/30 hover:bg-white/50 rounded-full transition"
						>
							<XMarkIcon className="h-6 w-6 text-white" />
						</button>
					</div>
					<span className="mt-4 text-white text-sm">{activeImage.caption}</span>
				</button>
			)}
		</>
	);
};
