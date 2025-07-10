import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export async function loginUser({ username, password }) {
    const response = await axios.post(
        `${API_BASE}/api/login`,
        { username, password },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
}

export function registerUser(newUser) {
    return axios.post(
        `${API_BASE}/api/register`,
        newUser,
        { headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.data);
}

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

export function updateProfile(formData) {
    const token = localStorage.getItem('jwtToken');
    return axios.put(
        `${API_BASE}/api/profile/PostUserDetails`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(res => res.data);
}

export function getLikedNotes() {
    const token = localStorage.getItem('jwtToken');
    return axios
        .get(`${API_BASE}/LikedNotes/FetchLikedNotes`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => res.data);
}

export function postLike(noteId) {
    const token = localStorage.getItem('jwtToken');
    return axios.post(
        `${API_BASE}/LikedNotes/PostLike`,
        null,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { note_id: noteId },
        }
    );
}

export function deleteLike(noteId) {
    const token = localStorage.getItem('jwtToken');
    return axios.delete(
        `${API_BASE}/LikedNotes/DeleteLike`,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { note_id: noteId },
        }
    );
}

export function searchNotes(query, page = 0, size = 10) {
    const token = localStorage.getItem('jwtToken');
    return axios.get(
        `${API_BASE}/api/notes/searchNotes`,
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { query, page, size },
        }
    ).then(res => res.data);
}

export function getRecommendedNotes(page = 0, size = 10) {
    const token = localStorage.getItem('jwtToken');
    return axios
        .get(`${API_BASE}/api/notes/recommendedNotes`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { page, size },
        })
        .then(res => res.data);
}