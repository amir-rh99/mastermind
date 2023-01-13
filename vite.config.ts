import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    outDir: "docs"
  },
  resolve: {
    alias: [
      { find: "@svg", replacement: path.resolve(__dirname, "src/assets/svg") },
      { find: "@app", replacement: path.resolve(__dirname, "src/app") }
    ]
  }
})
