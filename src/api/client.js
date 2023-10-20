import axios from 'axios'

const client = axios.create({baseURL: "https://five-star-movie-review-app-backend.onrender.com/api"})

export default client