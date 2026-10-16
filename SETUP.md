# Setup & Troubleshooting

## Tailwind CSS v4

Tailwind CSS v4 needs its separate PostCSS plugin. Keep `postcss.config.mjs` configured with
`@tailwindcss/postcss`, and import Tailwind from `app/globals.css`. Theme colors are declared
there with the `@theme` directive.

### File Structure
```
frontend/
├── app/
│   └── globals.css       # @import "tailwindcss" + @theme config
└── postcss.config.mjs    # @tailwindcss/postcss plugin
```

## Running the Project

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Server will run at http://localhost:3000
```

## Common Issues

### Port Already in Use
```bash
# Find process using port 3000
tasklist | findstr node

# Kill specific process
taskkill /PID <process_id> /F
```

### Eslint Peer Dependency Conflicts
Always use `--legacy-peer-deps` flag:
```bash
npm install <package> --legacy-peer-deps
```

### Clear Cache
```bash
# Delete .next folder and restart
rm -rf .next
npm run dev
```

## Environment
- Windows PowerShell
- Node.js (installed)
- npm (package manager)
- Next.js 16.4.0
- React 19.3.0
- Tailwind CSS v4 (@tailwindcss/postcss)
