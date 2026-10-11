import { defineConfig, devices } from '@playwright/test';

// Sem SEO_BASE_URL: testa o build local num servidor que imita o GitHub Pages.
// Com SEO_BASE_URL=https://vipdesk.com.br: os mesmos testes (somente leitura) contra produção.
const PORT = 4174;
const REMOTE = process.env.SEO_BASE_URL?.replace(/\/$/, '');

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  workers: REMOTE ? 2 : undefined,
  retries: REMOTE ? 1 : 0,
  reporter: [['list']],
  use: { baseURL: REMOTE || `http://localhost:${PORT}` },
  webServer: REMOTE
    ? undefined
    : {
      command: `node scripts/serve.mjs --port ${PORT}`,
      url: `http://localhost:${PORT}/`,
      reuseExistingServer: false,
    },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
