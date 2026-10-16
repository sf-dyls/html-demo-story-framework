import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// @ts-ignore JavaScript plugin runs only in the local development server.
import {localCms} from './scripts/local-cms.mjs';
export default defineConfig({build:{outDir:'dist/client'},plugins:[react(),tailwindcss(),localCms()]});
