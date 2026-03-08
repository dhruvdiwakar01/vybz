import { createContext  } from "react";
import { useState } from "react";



export const SongContext = createContext()


export const SongContextProvider =({children}) =>{
    
    const [song, setSong] = useState({

    })

    const [loading, setLoading] = useState(false)
    return (
        <SongContext.Provider value={{loading, setLoading, song, setSong}}>
            {children}
        </SongContext.Provider>
    )
}



// import { createContext, useState, useCallback } from "react";

// export const SongContext = createContext()

// export const SongContextProvider = ({ children }) => {
//     const [song, setSong] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [recentlyPlayed, setRecentlyPlayed] = useState([])

//     const addToRecentlyPlayed = useCallback((newSong) => {
//         if (!newSong?._id) return
//         setRecentlyPlayed(prev => {
//             // Remove duplicate if exists, then prepend
//             const filtered = prev.filter(s => s._id !== newSong._id)
//             return [newSong, ...filtered].slice(0, 20) // keep last 20
//         })
//     }, [])

//     return (
//         <SongContext.Provider value={{
//             loading, setLoading,
//             song, setSong,
//             recentlyPlayed, addToRecentlyPlayed
//         }}>
//             {children}
//         </SongContext.Provider>
//     )
// }