import client from "./client"

export const createUser = async (userInfo) => {
    try {
        const { data } = await client.post("/user/signup", userInfo)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const verifyUserEmail = async (userInfo) => {
    try {
        const { data } = await client.post("/user/verifyemail", userInfo)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const signInUser = async (userInfo) => {
    try {
        const { data } = await client.post("/user/signin", userInfo)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const getIsAuth = async (token) => {
    try {
        const { data } = await client.get("/user/isauth", {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            }
        })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const forgotPassword = async (email) => {
    try {
        const { data } = await client.post("/user/forgotpassword", { email })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const verifyPasswordResetToken = async (token, userId) => {
    try {
        const { data } = await client.post("/user/verifyresetpasswordtoken", { token, userId })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const resetPassword = async (passwordInfo) => {
    try {
        const { data } = await client.post("/user/resetpassword", passwordInfo)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}

export const resendEmailVerificationToken = async (userId) => {
    try {
        const { data } = await client.post("/user/resendverifyemail", { userId })
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) return response.data
        return { error: error.message || error }
    }
}