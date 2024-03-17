import { setup } from '@css-render/vue3-ssr'
import type { UserModule } from '~/types'

export const install: UserModule = (ctx) => {
  if (!ctx.isClient)
    ctx.afterRender = setup(ctx.app).collect
}
