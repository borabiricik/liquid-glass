# @liquidglass/react

A beautiful React component that creates stunning liquid glass effects using advanced backdrop filters and SVG displacement mapping.

## Installation

```bash
npm install @liquidglass/react
# or
yarn add @liquidglass/react
# or
pnpm add @liquidglass/react
```

## Usage

```tsx
import { LiquidGlass } from '@liquidglass/react';

function App() {
  return (
    <div style={{ width: '400px', height: '300px' }}>
      <LiquidGlass
        borderRadius={20}
        blur={0.5}
        contrast={1.2}
        brightness={1.1}
        saturation={1.2}
      >
        <h2>Beautiful Glass Effect</h2>
        <p>Your content here...</p>
      </LiquidGlass>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderRadius` | `number` | `20` | Border radius in pixels |
| `blur` | `number` | `0.25` | Blur intensity |
| `contrast` | `number` | `1.2` | Contrast level |
| `brightness` | `number` | `1.05` | Brightness level |
| `saturation` | `number` | `1.1` | Saturation level |
| `shadowIntensity` | `number` | `0.25` | Shadow intensity |
| `displacementScale` | `number` | `1` | Displacement effect scale |
| `elasticity` | `number` | `0.6` | Elasticity of the liquid effect |
| `zIndex` | `number` | `9999` | Z-index of the component |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Child components to render inside |

## Features

- 🌊 **Dynamic liquid glass effect** with real-time displacement mapping
- 📱 **Responsive design** that adapts to container size
- 🎨 **Customizable appearance** with extensive props
- ⚡ **Performance optimized** with efficient canvas rendering
- 🔧 **TypeScript support** with full type definitions
- 🎯 **Framework agnostic** core with React bindings

## Examples

### Basic Usage
```tsx
<LiquidGlass>
  <h1>Hello World</h1>
</LiquidGlass>
```

### Customized Effect
```tsx
<LiquidGlass
  borderRadius={50}
  blur={1.0}
  contrast={1.5}
  brightness={1.2}
  saturation={1.3}
  shadowIntensity={0.4}
  elasticity={0.8}
  className="my-glass-container"
>
  <div className="content">
    <h2>Custom Glass</h2>
    <p>With enhanced effects</p>
  </div>
</LiquidGlass>
```

## Browser Support

- ✅ Chrome 76+
- ✅ Firefox 70+
- ✅ Safari 13+
- ✅ Edge 79+

Note: This component uses advanced CSS features like `backdrop-filter` and SVG filters. Older browsers may not support all effects.

## License

MIT © Liquid Glass Team 