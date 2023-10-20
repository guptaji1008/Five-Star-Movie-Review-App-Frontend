import client from "./client"

export const uploadTrailer = async (formData, onUploadProgress) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.post("/movie/uploadtrailer", formData, {
            headers: {
                Authorization: "Bearer " + token,
                "content-type": "multipart/form-data"
            },
            onUploadProgress: ({loaded, total}) => {
                if (onUploadProgress) {
                    onUploadProgress(Math.floor((loaded / total) * 100));
                }
            }
        })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const uploadMovie = async (formData) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.post("/movie/createmovie", formData, {
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

export const getMovie = async (pageNo, limit) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client(`/movie/movies?pageNo=${pageNo}&limit=${limit}`, {
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

export const getForUpdateMovie = async (id) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client(`/movie/forupdate/${id}`, {
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

export const updateMovie = async (id, formData) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.patch(`/movie/update/${id}`, formData, {
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

export const deleteMovie = async (id) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.delete(`/movie/${id}`, {
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

export const searchMovieForAdmin = async (title) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client(`/movie/search?title=${title}`, {
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

export const getTopRatedMovies = async (type, signal) => {
    try {
        let endPoint = "/movie/toprated";
        if (type) endPoint = endPoint + "?type=" + type
        
        const { data } = await client(endPoint, { signal })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const getLatestUploads = async (signal) => {
    try {
        const { data } = await client('/movie/latestuploads', {signal})
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const getSingleMovie = async (id) => {
    try {
        const { data } = await client('/movie/single/' + id)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const getRelatedMovie = async (id) => {
    try {
        const { data } = await client('/movie/related/' + id)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const searchPublicMovie = async (title) => {
    try {
        const { data } = await client('/movie/searchpublicmovie?title=' + title)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}