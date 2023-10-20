import client from "./client"

export const getAppInfo = async () => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client('/admin/appinfo', {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}