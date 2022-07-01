import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), checker({ typescript: true })],
    build: {
        outDir: 'build',
        lib: {
            name: '@ecoside/ui',
            entry: './src/index.ts',
        },
        rollupOptions: {
            external: [
                '@emotion/react',
                '@emotion/styled',
                '@mui/icons-material',
                '@mui/material',
                'react',
                'react-dom',
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
