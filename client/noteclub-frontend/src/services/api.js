import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export function getProfileDetails() {
    const token = localStorage.getItem('jwtToken');
    return axios.get(`${API_BASE}/api/profile/details`, {
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data);
}

export function getUploadedNotes() {
    const token = localStorage.getItem('jwtToken');
    return axios.get(
        `${API_BASE}/api/notes/getUploadedNotes`,
        { headers: { Authorization: `Bearer ${token}` } }
    )
        .then(res => res.data);
}


export function uploadNotes(formData) {
    const token = localStorage.getItem('jwtToken');
    return axios
        .post(
            `${API_BASE}/api/notes/uploadNotes`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(res => res.data);
}