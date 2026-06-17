// Import the standard Vite configuration helper from the 'vite' package
import { defineConfig } from 'vite'
// Import the official React plugin for Vite to support JSX and Fast Refresh
import react from '@vitejs/plugin-react'
// Import the official Tailwind CSS v4 compiler plugin for Vite integration
import tailwindcss from '@tailwindcss/vite'

// Export the Vite configuration object using the defineConfig helper
export default defineConfig({
  // Register plugins: react() handles JSX parsing, tailwindcss() processes Tailwind v4 directives in styles
  plugins: [react(), tailwindcss()],
})
