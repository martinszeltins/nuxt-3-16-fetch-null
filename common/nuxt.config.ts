export default defineNuxtConfig({
    experimental: {
        asyncContext: true,
        typedPages: true,
        scanPageMeta: true
    },

    compatibilityDate: '2025-03-12',

    vite: {
        server: {
            hmr: {
                clientPort: 17365
            },
        },  
    },
})
