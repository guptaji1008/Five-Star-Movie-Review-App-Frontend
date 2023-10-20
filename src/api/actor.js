import client from "./client"

export const createActor = async (formData) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.post("/actor/create", formData, {
            headers: {
                Authorization: "Bearer " + token,
                "content-type": "multipart/form-data"
            }
        })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const searchActor = async (query) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.get(`/actor/search?name=${query}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const getActors = async (pageNo, limit) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.get(`/actor/actors?pageNo=${pageNo}&limit=${limit}`, {
            headers: {
                Authorization: "Bearer " + token,
                "content-type": "multipart/form-data"
            }
        })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const updateActor = async (id, formData) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.post("/actor/update/" + id, formData, {
            headers: {
                Authorization: "Bearer " + token,
                "content-type": "multipart/form-data"
            }
        })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const deleteActor = async (id) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.delete("/actor/" + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const getSingleActorProfile = async (id) => {
    try {
        const { data } = await client("/actor/search/" + id)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}