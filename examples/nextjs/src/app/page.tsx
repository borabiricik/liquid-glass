"use client";
import Image from "next/image";
import Generator from "./components/Generator";

const HomePage = () => {
	return (
		<div className="min-h-dvh">
			<Image
				src="/wallpapers/1.jpg"
				alt="wallpaper"
				quality={100}
				width={4096}
				height={2160}
				className="object-cover"
			/>
			<Image
				src="/wallpapers/2.jpg"
				alt="wallpaper"
				quality={100}
				width={4096}
				height={2160}
				className="object-cover"
			/>
			<Image
				src="/wallpapers/3.jpg"
				alt="wallpaper"
				quality={100}
				width={4096}
				height={2160}
				className="object-cover"
			/>
			<Image
				src="/wallpapers/4.jpg"
				alt="wallpaper"
				quality={100}
				width={4096}
				height={2160}
				className="object-cover"
			/>
			<div className="px-4">
				<Generator />
			</div>
		</div>
	);
};

export default HomePage;
