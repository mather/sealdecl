/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Vite
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly MODE: string;
  readonly BASE_URL: string;

  // Firebase Config
  readonly VITE_API_KEY: string;
  readonly VITE_APP_ID: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
