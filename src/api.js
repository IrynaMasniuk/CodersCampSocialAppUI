import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

//Events
export const insertEvent = payload => api.post('/events', payload);
export const getAllEvents = () => api.get('/events');
export const updateEventById = (id, payload) => api.put(`/events/${id}`, payload);
export const deleteEventById = id => api.delete(`/events/${id}`);
export const getEventById = id => api.get(`/events/${id}`);

//Comments
export const insertComment = payload => api.post(`/comment`, payload);
export const getAllComments = () => api.get(`/comments`);
export const updateCommentById = (id, payload) => api.put(`/comment/${id}`, payload);
export const deleteCommentById = id => api.delete(`/comment/${id}`);
export const getCommentById = id => api.get(`/comment/${id}`);

const apis = {
    //Events
    insertEvent,
    getAllEvents,
    updateEventById,
    deleteEventById,
    getEventById,
    //Comments
    insertComment,
    getAllComments,
    updateCommentById,
    deleteCommentById,
    getCommentById,
};

export default apis;