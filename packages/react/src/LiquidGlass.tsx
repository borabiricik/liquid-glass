import type React from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export interface LiquidGlassProps {
	borderRadius?: number;
	blur?: number;
	contrast?: number;
	brightness?: number;
	saturation?: number;
	shadowIntensity?: number;
	displacementScale?: number;
	elasticity?: number;
	zIndex?: number;
	className?: string;
	children?: React.ReactNode;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
	borderRadius = 20,
	blur = 0.25,
	contrast = 1.2,
	brightness = 1.05,
	saturation = 1.1,
	shadowIntensity = 0.25,
	displacementScale = 1,
	elasticity = 0.6,
	zIndex = 9999,
	className,
	children,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const feImageRef = useRef<SVGFEImageElement>(null);
	const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null);

	const reactId = useId();
	const id = `liquid-glass-${reactId.replace(/:/g, "-")}`;

	const [width, setWidth] = useState(300);
	const [height, setHeight] = useState(200);

	const canvasDPI = 1;

	// Utility functions
	const smoothStep = useCallback((a: number, b: number, t: number) => {
		t = Math.max(0, Math.min(1, (t - a) / (b - a)));
		return t * t * (3 - 2 * t);
	}, []);

	const length = useCallback((x: number, y: number) => {
		return Math.sqrt(x * x + y * y);
	}, []);

	const roundedRectSDF = useCallback(
		(x: number, y: number, w: number, h: number, radius: number) => {
			const qx = Math.abs(x) - w + radius;
			const qy = Math.abs(y) - h + radius;
			return (
				Math.min(Math.max(qx, qy), 0) +
				length(Math.max(qx, 0), Math.max(qy, 0)) -
				radius
			);
		},
		[length],
	);

	const updateShader = useCallback(() => {
		const canvas = canvasRef.current;
		const feImage = feImageRef.current;
		const feDisplacementMap = feDisplacementMapRef.current;

		if (!canvas || !feImage || !feDisplacementMap) return;

		const context = canvas.getContext("2d");
		if (!context) return;

		const w = Math.max(1, Math.floor(width * canvasDPI));
		const h = Math.max(1, Math.floor(height * canvasDPI));

		// Ensure we have valid dimensions
		if (w <= 0 || h <= 0) return;

		// Update canvas size if needed
		if (canvas.width !== w || canvas.height !== h) {
			canvas.width = w;
			canvas.height = h;
		}

		const data = new Uint8ClampedArray(w * h * 4);

		let maxScale = 0;
		const rawValues: number[] = [];

		for (let i = 0; i < data.length; i += 4) {
			const x = (i / 4) % w;
			const y = Math.floor(i / 4 / w);
			const uv = { x: x / w, y: y / h };

			// Fragment shader logic
			const ix = uv.x - 0.5;
			const iy = uv.y - 0.5;
			const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, elasticity);
			const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
			const scaled = smoothStep(0, 1, displacement);

			const pos = {
				x: ix * scaled + 0.5,
				y: iy * scaled + 0.5,
			};

			const dx = pos.x * w - x;
			const dy = pos.y * h - y;
			maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
			rawValues.push(dx, dy);
		}

		maxScale *= 0.5 * displacementScale;

		let index = 0;
		for (let i = 0; i < data.length; i += 4) {
			const r = rawValues[index++] / maxScale + 0.5;
			const g = rawValues[index++] / maxScale + 0.5;
			data[i] = r * 255;
			data[i + 1] = g * 255;
			data[i + 2] = 0;
			data[i + 3] = 255;
		}

		// Ensure data length is correct for ImageData
		const expectedLength = w * h * 4;
		if (data.length !== expectedLength) {
			console.warn(
				"Data length mismatch for ImageData:",
				data.length,
				"expected:",
				expectedLength,
			);
			return;
		}

		try {
			context.putImageData(new ImageData(data, w, h), 0, 0);
			feImage.setAttributeNS(
				"http://www.w3.org/1999/xlink",
				"href",
				canvas.toDataURL(),
			);
			feDisplacementMap.setAttribute(
				"scale",
				(maxScale / canvasDPI).toString(),
			);
		} catch (error) {
			console.error(
				"Error creating ImageData:",
				error,
				"w:",
				w,
				"h:",
				h,
				"data.length:",
				data.length,
			);
		}
	}, [
		width,
		height,
		canvasDPI,
		displacementScale,
		elasticity,
		roundedRectSDF,
		smoothStep,
	]);

	// ResizeObserver to track container size
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width: newWidth, height: newHeight } = entry.contentRect;
				setWidth(Math.max(newWidth, 100)); // Minimum width
				setHeight(Math.max(newHeight, 100)); // Minimum height
			}
		});

		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	// Update shader when component mounts or parameters change
	useEffect(() => {
		updateShader();
	}, [updateShader]);

	return (
		<>
			{/* SVG Filter */}
			<svg
				ref={svgRef}
				xmlns="http://www.w3.org/2000/svg"
				width="0"
				height="0"
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					pointerEvents: "none",
					zIndex: zIndex - 1,
				}}
			>
				<defs>
					<filter
						id={`${id}_filter`}
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
						x="0"
						y="0"
						width={width.toString()}
						height={height.toString()}
					>
						<feImage
							ref={feImageRef}
							id={`${id}_map`}
							width={width.toString()}
							height={height.toString()}
						/>
						<feDisplacementMap
							ref={feDisplacementMapRef}
							in="SourceGraphic"
							in2={`${id}_map`}
							xChannelSelector="R"
							yChannelSelector="G"
						/>
					</filter>
				</defs>
			</svg>

			{/* Hidden Canvas */}
			<canvas
				ref={canvasRef}
				width={width * canvasDPI}
				height={height * canvasDPI}
				style={{ display: "none" }}
			/>

			{/* Glass Container */}
			<div
				ref={containerRef}
				className={className}
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
					overflow: "hidden",
					borderRadius: `${borderRadius}px`,
					boxShadow: `0 4px 8px rgba(0, 0, 0, ${shadowIntensity}), 0 -10px 25px inset rgba(0, 0, 0, 0.15)`,
					backdropFilter: `url(#${id}_filter) blur(${blur}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturation})`,
					zIndex: zIndex,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{children}
			</div>
		</>
	);
};

export default LiquidGlass;
