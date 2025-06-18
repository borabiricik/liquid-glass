"use client"
import React, { useRef, useEffect, useState, useCallback } from 'react'

interface LiquidGlassProps {
  width?: number
  height?: number
  borderRadius?: number
  blur?: number
  contrast?: number
  brightness?: number
  saturation?: number
  shadowIntensity?: number
  displacementScale?: number
  elasticity?: number
  zIndex?: number
  children?: React.ReactNode
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  width = 300,
  height = 200,
  borderRadius = 150,
  blur = 0.25,
  contrast = 1.2,
  brightness = 1.05,
  saturation = 1.1,
  shadowIntensity = 0.25,
  displacementScale = 1,
  elasticity = 0.6,
  zIndex = 9999,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const feImageRef = useRef<SVGFEImageElement>(null)
  const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null)
  
  const [id] = useState(() => 'liquid-glass-' + Math.random().toString(36).substr(2, 9))
  
  const canvasDPI = 1

  // Utility functions
  const smoothStep = useCallback((a: number, b: number, t: number) => {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)))
    return t * t * (3 - 2 * t)
  }, [])

  const length = useCallback((x: number, y: number) => {
    return Math.sqrt(x * x + y * y)
  }, [])

  const roundedRectSDF = useCallback((x: number, y: number, w: number, h: number, radius: number) => {
    const qx = Math.abs(x) - w + radius
    const qy = Math.abs(y) - h + radius
    return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius
  }, [length])

  const updateShader = useCallback(() => {
    const canvas = canvasRef.current
    const feImage = feImageRef.current
    const feDisplacementMap = feDisplacementMapRef.current
    
    if (!canvas || !feImage || !feDisplacementMap) return

    const context = canvas.getContext('2d')
    if (!context) return

    const w = width * canvasDPI
    const h = height * canvasDPI
    const data = new Uint8ClampedArray(w * h * 4)

    let maxScale = 0
    const rawValues: number[] = []

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w
      const y = Math.floor(i / 4 / w)
      const uv = { x: x / w, y: y / h }
      
      // Fragment shader logic
      const ix = uv.x - 0.5
      const iy = uv.y - 0.5
      const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, elasticity)
      const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15)
      const scaled = smoothStep(0, 1, displacement)
      
      const pos = {
        x: ix * scaled + 0.5,
        y: iy * scaled + 0.5
      }
      
      const dx = pos.x * w - x
      const dy = pos.y * h - y
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
      rawValues.push(dx, dy)
    }

    maxScale *= 0.5 * displacementScale

    let index = 0
    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[index++] / maxScale + 0.5
      const g = rawValues[index++] / maxScale + 0.5
      data[i] = r * 255
      data[i + 1] = g * 255
      data[i + 2] = 0
      data[i + 3] = 255
    }

    context.putImageData(new ImageData(data, w, h), 0, 0)
    feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', canvas.toDataURL())
    feDisplacementMap.setAttribute('scale', (maxScale / canvasDPI).toString())
  }, [width, height, canvasDPI, displacementScale, elasticity, roundedRectSDF, smoothStep])

  // Update shader when component mounts or parameters change
  useEffect(() => {
    updateShader()
  }, [updateShader])

  return (
    <>
      {/* SVG Filter */}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: zIndex - 1
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
        style={{ display: 'none' }}
      />

      {/* Glass Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: `${width}px`,
          height: `${height}px`,
          overflow: 'hidden',
          borderRadius: `${borderRadius}px`,
          boxShadow: `0 4px 8px rgba(0, 0, 0, ${shadowIntensity}), 0 -10px 25px inset rgba(0, 0, 0, 0.15)`,
          backdropFilter: `url(#${id}_filter) blur(${blur}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturation})`,
          zIndex: zIndex,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {children}
      </div>
    </>
  )
}

export default LiquidGlass 