import axios from 'axios'
import config from '../../config'

const api = axios.create({
    baseURL: config.backend,
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
