import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // настройки для плагинов
    },
    supportFile: false, // если support file не требуется
  },
});