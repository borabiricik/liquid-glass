# Liquid Glass

A collection of liquid glass effect components for different frameworks.

## 🌊 What is Liquid Glass?

Liquid Glass creates stunning visual effects that simulate liquid glass surfaces using advanced backdrop filters and SVG displacement mapping. The effect provides a dynamic, responsive glass-like appearance that adapts beautifully to any content.

## 📦 Packages

### Framework Packages
- [`@liquidglass/react`](./packages/react/) - React component for liquid glass effects

### Coming Soon
- `@liquid-glass/vue` - Vue.js component (planned)
- `@liquid-glass/svelte` - Svelte component (planned)
- `@liquid-glass/angular` - Angular component (planned)

## 🚀 Quick Start

### React
```bash
npm install @liquidglass/react
```

```tsx
import { LiquidGlass } from '@liquidglass/react';

function App() {
  return (
    <div style={{ width: '400px', height: '300px' }}>
      <LiquidGlass>
        <h2>Beautiful Glass Effect</h2>
      </LiquidGlass>
    </div>
  );
}
```

## 📋 Examples

- [NextJS Example](./examples/nextjs/) - Complete interactive demo with controls

## 🏗️ Development

This is a monorepo managed with Yarn workspaces.

### Setup
```bash
# Install dependencies
yarn install

# Start development server for NextJS example
yarn dev

# Build all packages
yarn build
```

### Package Commands
```bash
# Build React package
yarn workspace @liquidglass/react build

# Run NextJS example
yarn workspace @liquid-glass/example-nextjs dev
```

## ✨ Features

- 🌊 **Dynamic liquid glass effect** with real-time displacement mapping
- 📱 **Responsive design** that adapts to container size
- 🎨 **Customizable appearance** with extensive props
- ⚡ **Performance optimized** with efficient canvas rendering
- 🔧 **TypeScript support** with full type definitions
- 🎯 **Framework agnostic** core with framework-specific bindings

## 🌐 Browser Support

- ✅ Chrome 76+
- ✅ Firefox 70+
- ✅ Safari 13+
- ✅ Edge 79+

Note: This component uses advanced CSS features like `backdrop-filter` and SVG filters. Older browsers may not support all effects.

## 📄 License

MIT © Liquid Glass Team

## 🤝 Contributing

We welcome contributions! Please check out our [contributing guidelines](./CONTRIBUTING.md) for details.

## 📍 Roadmap

- [x] React package
- [ ] Vue.js package
- [ ] Svelte package
- [ ] Angular package
- [ ] Performance optimizations
- [ ] More effect variations
- [ ] Interactive playground
