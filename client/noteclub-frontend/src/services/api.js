import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export function getProfileDetails() {
    const token = localStorage.getItem('jwtToken');
    return axios.get(`${API_BASE}/profile/details`, {
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data);
}
