import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8000/api/' });
export const queryArea = (q, years) => API.get('query/', { params: { q, years }});
