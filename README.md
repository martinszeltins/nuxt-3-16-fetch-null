Nuxt `3.16` breaks the build when using `shamefully-hoist=true`, dev server works fine.

I upgraded my project from Nuxt `3.15` to `3.16` and I noticed that my project was broken in production. It is working fine in development mode. I found out that the issue is related to the `shamefully-hoist=true` option in the `.npmrc` file. When it is set to `true`, useFetch returns `null` data in production mode. When it is set to `false`, it works fine in both dev server and production mode.

It seems to happening after the hydration process. I see that on the server side the data is populated correctly, but on the client side, it is `null`. You can even see a brief flicker of the data before it becomes `null`. _(Again, only in production mode, dev works fine.)_ This worked fine in `3.15`.

**.npmrc**
```bash
shamefully-hoist=true
```

**pages/index.vue**
```vue
<template>
    <div>
        <div>userError:</div>
        <div v-if="userError">
            userError: {{ userError }}
        </div>

        <div>users:</div>
        <div v-if="users">
            Users: {{ users }}
        </div>
    </div>
</template>

<script setup lang="ts">
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const users = ref([])
    const userError = ref(null)

    const { data, error } = await useFetch('/api/user/list', {
        method: 'POST',
        watch: false,
        body: {
            args: {
                limit: 10,
                offset: 0,
            },
        },
        headers: {
            'Content-Type': 'application/json',
        }
    })

    console.log('---- API Finished ----')
    console.log('data value', toRaw(data.value)) // null (in prod)
    console.log('error value', toRaw(error.value)) // null (in prod)

    users.value = structuredClone(toRaw(data.value)) // null (in prod)
    userError.value = structuredClone(toRaw(error.value)) // null (in prod)

    if (import.meta.client) {
        setTimeout(() => {
            console.log({ users: toRaw(users.value) }) // null (in prod)
        }, 2000)
    }
</script>
```

This completely broke my app in production. No idea why this works in dev but not in prod, something has changed in `3.16` that is causing this issue.
