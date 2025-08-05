import { AppRoot } from "@telegram-apps/telegram-ui";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import '@telegram-apps/telegram-ui/dist/styles.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppRoot appearance='light'>
            <App/>
        </AppRoot>
    </StrictMode>,
)
