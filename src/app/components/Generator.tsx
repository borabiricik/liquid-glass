"use client";
import { Card, CardBody } from "@heroui/card";
import { Slider } from "@heroui/slider";
import React, { useCallback, useState } from "react";
import LiquidGlass from "./LiquidGlass";

const Generator = () => {
	const [settings, setSettings] = useState({
		borderRadius: 150,
		blur: 0.25,
		contrast: 1.2,
		brightness: 1.05,
		saturation: 1.1,
		shadowIntensity: 0.25,
		displacementScale: 1,
		elasticity: 0.6,
	});

	const updateSetting = useCallback((key: string, value: number | number[]) => {
		const numValue = Array.isArray(value) ? value[0] : value;
		console.log(`Updating ${key}:`, numValue); // Debug log
		setSettings((prev) => {
			const newSettings = { ...prev, [key]: numValue };
			console.log("New settings:", newSettings); // Debug log
			return newSettings;
		});
	}, []);

	return (
		<div className="flex items-center justify-center h-screen fixed inset-0">
			{/* Settings Panel - Sol taraf (sabit) */}
			<div className="w-1/2 flex-shrink-0 overflow-y-auto p-6">
				<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-fit">
					<h2 className="text-white text-2xl font-bold mb-6">
						Liquid Glass Controls
					</h2>

					{/* Settings Grid - 2 kolon */}
					<div className="grid grid-cols-2 gap-6">
						{/* Sol kolon */}
						<div className="space-y-4">
							<div>
								<label className="text-white/80 text-sm mb-2 block">
									Border Radius
								</label>
								<Slider
									value={settings.borderRadius}
									onChange={(value) => updateSetting("borderRadius", value)}
									minValue={0}
									maxValue={200}
									step={5}
									className="w-full"
								/>
								<span className="text-white/60 text-xs">
									{settings.borderRadius}px
								</span>
							</div>

							<div>
								<label className="text-white/80 text-sm mb-2 block">
									Blur
								</label>
								<Slider
									value={settings.blur}
									onChange={(value) => updateSetting("blur", value)}
									minValue={0}
									maxValue={2}
									step={0.05}
									className="w-full"
								/>
								<span className="text-white/60 text-xs">
									{settings.blur.toFixed(2)}px
								</span>
							</div>

							<div>
								<label className="text-white/80 text-sm mb-2 block">
									Contrast
								</label>
								<Slider
									value={settings.contrast}
									onChange={(value) => updateSetting("contrast", value)}
									minValue={0.5}
									maxValue={2}
									step={0.05}
									className="w-full"
								/>
								<span className="text-white/60 text-xs">
									{settings.contrast.toFixed(2)}
								</span>
							</div>
						</div>

						{/* Sağ kolon */}
						<div className="space-y-4">
							<div>
								<label className="text-white/80 text-sm mb-2 block">
									Brightness
								</label>
								<Slider
									value={settings.brightness}
									onChange={(value) => updateSetting("brightness", value)}
									minValue={0.5}
									maxValue={2}
									step={0.05}
									className="w-full"
								/>
								<span className="text-white/60 text-xs">
									{settings.brightness.toFixed(2)}
								</span>
							</div>

							<div>
								<label className="text-white/80 text-sm mb-2 block">
									Saturation
								</label>
								<Slider
									value={settings.saturation}
									onChange={(value) => updateSetting("saturation", value)}
									minValue={0.5}
									maxValue={2}
									step={0.05}
									className="w-full"
								/>
								<span className="text-white/60 text-xs">
									{settings.saturation.toFixed(2)}
								</span>
							</div>

							<div>
								<label className="text-white/80 text-sm mb-2 block">
									Shadow Intensity
								</label>
								<Slider
									value={settings.shadowIntensity}
									onChange={(value) => updateSetting("shadowIntensity", value)}
									minValue={0}
									maxValue={1}
									step={0.05}
									className="w-full"
								/>
								<span className="text-white/60 text-xs">
									{settings.shadowIntensity.toFixed(2)}
								</span>
							</div>

							<div>
								<label className="text-white/80 text-sm mb-2 block">
									Displacement Scale
								</label>
								<Slider
									value={settings.displacementScale}
									onChange={(value) =>
										updateSetting("displacementScale", value)
									}
									minValue={0.1}
									maxValue={3}
									step={0.1}
									className="w-full"
								/>
								<span className="text-white/60 text-xs">
									{settings.displacementScale.toFixed(1)}
								</span>
							</div>

							<div>
								<label className="text-white/80 text-sm mb-2 block">
									Elasticity
								</label>
								<Slider
									value={settings.elasticity}
									onChange={(value) => updateSetting("elasticity", value)}
									minValue={0.1}
									maxValue={1}
									step={0.05}
									className="w-full"
								/>
								<span className="text-white/60 text-xs">
									{settings.elasticity.toFixed(2)}
								</span>
							</div>
						</div>
					</div>

					<div className="mt-6 text-white/60 text-xs text-center">
						💡 Use the sliders to customize your liquid glass effect!
					</div>
				</div>
			</div>

			{/* Preview Area - Sağ taraf (scroll edilebilir) */}
			<div className="w-1/2 flex-shrink-0 p-6">
				<div className="min-h-full flex flex-col items-stretch justify-start space-y-8 ">
					{/* Ana Liquid Glass */}
					<div className="flex items-stretch justify-center w-full">
						<LiquidGlass
							className="min-h-[200px]"
							borderRadius={settings.borderRadius}
							blur={settings.blur}
							contrast={settings.contrast}
							brightness={settings.brightness}
							saturation={settings.saturation}
							shadowIntensity={settings.shadowIntensity}
							displacementScale={settings.displacementScale || 1}
							elasticity={settings.elasticity}
						>
							<div className="text-white/80 text-sm font-medium h-full">
								Liquid Glass
							</div>
						</LiquidGlass>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Generator;
