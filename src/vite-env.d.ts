/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_X_RAPIDAPI_KEY: string
    readonly VITE_X_RAPIDAPI_HOST: string

}

interface ImportMeta {
    readonly env: ImportMetaEnv
}