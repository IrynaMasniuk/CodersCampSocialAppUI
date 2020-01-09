import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertPost = payload => api.post(`/posts`, payload)
export const getAllPosts = () => api.get(`/posts`)
export const updatePostById = (id, payload) => api.put(`/posts/${id}`, payload)
export const deletePostById = id => api.delete(`/posts/${id}`)
export const getPostById = id => api.get(`/posts/${id}`)

const apis = {
    insertPost,
    getAllPosts,
    updatePostById,
    deletePostById,
    getPostById,
}

export default apis
