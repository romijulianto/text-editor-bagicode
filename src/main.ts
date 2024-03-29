// register vue composition api globally
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import type { UserModule } from './types'

const routes = setupLayouts(generatedRoutes)

// -- tailwind
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
// --

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `**/modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./**/modules/*.ts', { eager: true })).forEach(i => i.install?.(ctx))
  },
)
