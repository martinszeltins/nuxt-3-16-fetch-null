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
    const users = ref<any>([])
    const userError = ref<any>(null)

    const { data, error } = await useFetch('/api/user/list', {
        method: 'POST',
        watch: false,
        body: {
            args: {
                limit: 10,
                offset: 0,
            },
            fragment: 'FRAGMENT_USER_USERS_TABLE',
        },
        headers: {
            'Content-Type': 'application/json',
        }
    })

    console.log('---- API Finished ----')
    console.log('data value', toRaw(data.value))
    console.log('error value', toRaw(error.value))

    users.value = structuredClone(toRaw(data.value))
    userError.value = structuredClone(toRaw(error.value))

    if (import.meta.client) {
        setTimeout(() => {
            console.log({ users: toRaw(users.value) })
        }, 2000)
    }
</script>
