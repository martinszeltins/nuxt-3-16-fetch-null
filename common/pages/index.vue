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
            fragment: 'FRAGMENT_USER_USERS_TABLE',
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
