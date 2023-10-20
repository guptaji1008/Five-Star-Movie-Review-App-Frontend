import client from "./client"

export const addReview = async (id, reviewData) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.post(`/review/add/${id}`, reviewData, {
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

export const getReviewsByMovie = async (id) => {
    try {
        const { data } = await client(`/review/getreviewbymovie/${id}`)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const updateReview = async (id, updatedData) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.patch(`/review/${id}`, updatedData, {
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

export const deleteReview = async (id) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.delete(`/review/${id}`, {
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