Package Manager

This package manager uses `pnpm`

Workspaces are defined in `pnpm-workspace.yaml`

To install all packages
`pnpm install`

To install packages into an individual workspace
`pnpm install xxx --filter @hyperdrive-ui/panda-preset`

Easiest way to create a new nextjs app under apps/\* :
`pnpm dlx create-next-app@latest apps/website --ts --eslint --app --no-tailwind`

🚀 Development & Build Guide
This repo follows the Park UI monorepo style:

packages/styled-system owns the Panda CSS config and runs codegen.

apps/website just consumes the generated styles via @layer in globals.css.

The website cannot run without styled-system being generated first.

🔹 Local Development
Run from the repo root — this ensures Panda’s CSS is ready for the website.

With Turborepo (recommended)

`pnpm dev`

Runs `styled-system:dev` first (Panda in watch mode)
Runs `website:dev` (Next.js) after Panda starts

🔹 Building for Production
`pnpm build`
Builds styled-system (Panda codegen) first
Then builds the Next.js website

🔹 CSS Layers
We use the @layer method in globals.css:

`@layer reset, base, tokens, recipes, utilities;`
These layers are populated by the Panda PostCSS plugin in apps/website/postcss.config.js:

```
module.exports = {
  plugins: {
    '@pandacss/dev/postcss': {},
    autoprefixer: {},
  },
}
```

📦 Dependency Placement
postcss + autoprefixer → in root devDependencies (hoisted for all workspaces)
@pandacss/dev + preset → in packages/styled-system (since it owns Panda config/codegen)
Website does not list these — it just imports the generated CSS at build time

1. Make sure .velite/ actually exists
   Run Velite (once) from the website app so it generates the folder:

pnpm --filter website exec velite

# or keep it watching:

pnpm --filter website exec velite dev

pnpm --filter @hyperdrive-ui/website exec velite

1. install dependencies
   pnpm --filter @hyperdrive-ui/react install

2. Initialize Storybook (Vite builder) with pnpm
   From the components package:
   pnpm --filter @hyperdrive-ui/react dlx storybook@latest init --builder @storybook/react-vite

pnpm --filter styled-system prepare && pnpm --filter @hyperdrive-ui/react dev

pnpm --filter @hyperdrive-ui/website prepare && pnpm --filter @hyperdrive-ui/website dev
