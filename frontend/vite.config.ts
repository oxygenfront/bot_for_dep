import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [ react() ],
    server: {
        port: 5173,
        allowedHosts: [ '58fff36b46aa.ngrok-free.app', 'localhost' ],
    },
})
