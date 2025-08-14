
## Usage

Once built and published:

```bash
# Initialize in a project
npx @hyperdrive-ui/cli init

# Add specific components
npx @hyperdrive-ui/cli add button card
npx @hyperdrive-ui/cli components add button card

# Add all components
npx @hyperdrive-ui/cli add --all

# Force overwrite
npx @hyperdrive-ui/cli add button --force
```

This implementation:
- ✅ Fetches real source code from your GitHub repo
- ✅ Supports all frameworks (React/Solid/Vue)
- ✅ Transforms imports based on user's configuration
- ✅ Has proper error handling and user feedback
- ✅ Works offline after initial fetch (files are cached)
- ✅ Is simple to understand and maintain