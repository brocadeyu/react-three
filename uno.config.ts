// uno.config.ts
import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
export default defineConfig({
  rules: [
    [
      'drag-none',
      {
        '-webkit-user-drag': 'none',
        '-khtml-user-drag': 'none',
        '-moz-user-drag': 'none',
        '-o-user-drag': 'none',
        'user-drag': 'none'
      }
    ]
  ],
  presets: [presetUno()]
})
