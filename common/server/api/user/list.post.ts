export default defineEventHandler(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
    ]
})
