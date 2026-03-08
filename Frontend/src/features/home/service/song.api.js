import axios from "axios";

const api = axios.create({
    baseURL: "/",
    withCredentials: true
})

export async function getSong({mood}){
const response = await api.get("/api/songs?mood=" + mood)
return response.data
}



// import axios from "axios";

// const api = axios.create({
//     baseURL: "/",
//     withCredentials: true
// })

// export async function getSong({ mood }) {
//     const response = await api.get("/api/songs?mood=" + mood)
//     return response.data
// }

// export async function getAllSongs() {
//     const response = await api.get("/api/songs/all")
//     return response.data
// }

// export async function getFavorites() {
//     const response = await api.get("/api/songs/favorites")
//     return response.data
// }

// export async function toggleFavorite(id) {
//     const response = await api.patch(`/api/songs/${id}/favorite`)
//     return response.data
// }