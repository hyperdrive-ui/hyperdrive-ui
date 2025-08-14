# Hyperdrive UI

A modern component library and design system inspired by [Park UI](https://github.com/cschroeter/park-ui), built with the latest Panda CSS and Ark UI. Hyperdrive UI extends Park UI's foundation with additional components, enhanced functionality, and updated tooling.

## 🏗️ Architecture

This monorepo follows Park UI's proven architecture with automatic Panda CSS generation:

**Internal**

- **`packages/styled-system`** - Owns the Panda CSS configuration and runs codegen
- **`components/react`** - React component library (`@hyperdrive-ui/react`)
- **`apps/website`** - Documentation and demo site

**Published Packages**

- **`packages/preset`** - Shared Panda CSS preset as `@hyperdrive-ui/panda-preset`
- **`packages/cli`** - CLI tooling to install (React) components into specified directory as `@hyperdrive-ui/cli` (TODO)

**The website automatically generates styles via PostCSS plugin - no manual prepare commands needed!**

## 📋 Prerequisites

- **Node.js** (latest LTS recommended)
- **pnpm** (this project uses pnpm workspaces)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install all workspace dependencies
pnpm install

# Install to specific workspace (example)
pnpm install <package-name> --filter @hyperdrive-ui/react
```

### 2. Initial Setup

Before running the development server, ensure all required directories and builds are ready:

```bash
# Generate Velite directory (required for the website MDX/content)
# (Must run again after updating documentation)
pnpm --filter @hyperdrive-ui/website exec velite
```

### 3. Development

**Recommended approach with Turborepo:**

```bash
# From root - starts everything automatically!
pnpm dev
```

That's it! No manual `prepare` commands needed. Turborepo orchestrates the build order and Panda CSS runs automatically via PostCSS during development.

**What happens when you run `pnpm dev`:**

- `styled-system` starts in watch mode (generates base component styles)
- `website` starts with Next.js dev server
- Panda CSS runs automatically via PostCSS plugin (no manual codegen needed)
- All CSS layers are populated in real-time

## 🏗️ Building for Production

```bash
# Builds styled-system (Panda codegen) first, then Next.js website
pnpm build
```

## 🎨 CSS Architecture

We use **automatic Panda CSS generation** via PostCSS - no manual `prepare` commands needed!

**In `apps/website/src/app/globals.css`:**

```css
@layer reset, base, tokens, recipes, utilities;
```

**PostCSS configuration in `apps/website/postcss.config.cjs`:**

```js
module.exports = {
  plugins: {
    "@pandacss/dev/postcss": {}, // This runs Panda automatically!
    autoprefixer: {},
  },
};
```

**Website's `panda.config.ts` extends your component styles:**

```ts
import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";

export default defineConfig({
  presets: [
    createPreset({
      /* your config */
    }),
  ],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  outdir: "../packages/styled-system/dist", // Outputs to shared location
  // Website-specific customizations
});
```

The CSS layers are automatically populated by the PostCSS plugin during development and build - no manual intervention required!

## Apps/Website (Hyperdrive-ui documentation)

The doc relies on the panda.config.ts to build the styles specific to the documentation.

## 🎨 CSS Architecture

We use CSS layers for proper cascade management:

**In `apps/website/src/app/globals.css`:**

```css
@layer reset, base, tokens, recipes, utilities;
```

**PostCSS configuration in `apps/website/postcss.config.js`:**

```js
module.exports = {
  plugins: {
    "@pandacss/dev/postcss": {},
    autoprefixer: {},
  },
};
```

These layers are populated by the Panda PostCSS plugin at build time.

📦 Package Management

### Dependency Placement Strategy

- **Root `devDependencies`**: `postcss` + `autoprefixer` + `turbo` (hoisted for all workspaces)
- **Website `devDependencies`**: `@pandacss/dev` (website-specific Panda CSS processing)
- **Packages**: Component-specific dependencies

### Common Commands

```bash
# Start development (recommended)
pnpm dev

# Build everything
pnpm build

# Install to specific workspace
pnpm install <package> --filter @hyperdrive-ui/react

# Run commands in specific workspace
pnpm --filter @hyperdrive-ui/website <command>

# Create new Next.js app under apps/*
pnpm dlx create-next-app@latest apps/new-app --ts --eslint --app --no-tailwind
```

## 🧩 Storybook Setup

Initialize Storybook with Vite builder from the components package:

```bash
# From the components package
pnpm --filter @hyperdrive-ui/react dlx storybook@latest init --builder @storybook/react-vite

# Start development with proper build order
pnpm dev
```

## 🔧 Workspace Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `pnpm dev`        | Start development with Turborepo (recommended) |
| `pnpm build`      | Build all packages for production              |
| `pnpm lint`       | Lint all packages                              |
| `pnpm type-check` | Type check all packages                        |
| `pnpm clean`      | Clean all build artifacts                      |

## 🗂️ Project Structure

## 🗂️ Project Structure

```
hyperdrive-ui/
├── apps/
│   └── website/               # Documentation site
│       ├── panda.config.ts    # Website-specific Panda config
│       ├── postcss.config.cjs # PostCSS with Panda plugin
├── components/
│   ├── react/                 # React components
├── packages/
│   ├── styled-system/         # Base styles and shared config
│   ├── preset/                # Shared Panda preset
│   └── cli/                   # CLI tools (excluded from builds)
├── pnpm-workspace.yaml        # Workspace configuration
└── turbo.json                 # Turborepo configuration
```

## 🚨 Troubleshooting

### Styles Not Loading

If your styles aren't generating automatically:

1. **Check PostCSS config** - Ensure `apps/website/postcss.config.cjs` has the Panda plugin:

   ```js
   module.exports = {
     plugins: {
       "@pandacss/dev/postcss": {}, // This must be present!
       autoprefixer: {},
     },
   };
   ```

2. **Verify dependencies** - Check that `@pandacss/dev` is in website's `devDependencies`
3. **CSS layers** - Ensure `globals.css` has `@layer reset, base, tokens, recipes, utilities;`
4. **Turborepo order** - Let Turborepo handle build orchestration with `pnpm dev`

### Missing Dependencies

If you get PostCSS or Autoprefixer errors:

- `postcss` and `autoprefixer` should be in **root** `devDependencies` (hoisted)
- `@pandacss/dev` should be in **website** `devDependencies`

### Development Server Issues

Always use the root command to ensure proper build order:

```bash
# ✅ Correct - from project root
pnpm dev

# ❌ Avoid - manual commands usually not needed
pnpm --filter website prepare && pnpm --filter website dev
```

### Excluding Work-in-Progress Packages

To exclude incomplete packages from builds, update `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "!packages/cli" # Exclude CLI package temporarily
```

## 🎯 Differences from Park UI

Hyperdrive UI extends Park UI with:

- ✨ Latest Panda CSS features and syntax
- 🔧 Enhanced build tooling with Turborepo
- 📚 Additional component variants and functionality
- 🎨 Extended theming capabilities
- 📖 Comprehensive documentation and examples

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the existing patterns
4. Ensure all packages build successfully with `pnpm build`
5. Test with `pnpm dev` to verify everything works
6. Submit a pull request

## 📄 License

[Add your license here]

## 🙏 Acknowledgments

This project is inspired by and builds upon [Park UI](https://github.com/cschroeter/park-ui) by Christian Schröter. We're grateful for the solid foundation and architectural patterns it provides.

## Known bug:

Noticed that component anatomy imported from @ark-ui/react/checkbox for instance, will fail when passing keys checkboxAnatomy.keys() but if ark-ui export directly the anatomy from zag-js, then it works fine...
