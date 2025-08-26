import react from '@vitejs/plugin-react'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [ react(), tailwindcss() ],
    server: {
        port: 5678,
        allowedHosts: [ '60caf7d9b050.ngrok-free.app', 'localhost', 'e80864644d93.ngrok-free.app' ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@app': path.resolve(__dirname, './src/app'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@widgets': path.resolve(__dirname, './src/widgets'),
            '@features': path.resolve(__dirname, './src/features'),
            '@entities': path.resolve(__dirname, './src/entities'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@global': path.resolve(__dirname, './src/global'),
            '@types': path.resolve(__dirname, './src/types'),
        },
    },
})
