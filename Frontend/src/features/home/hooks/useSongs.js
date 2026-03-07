
import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext)
    const { loading, setLoading, song, setSong } = context

    async function handleGetSong({ mood }) {
        setLoading(true)
        // Strip emoji + lowercase to match DB enum values
        const cleanMood = mood.replace(/[^\w\s]/gi, '').trim().toLowerCase()
        const data = await getSong({ mood: cleanMood })
        setSong(data.song)
        setLoading(false)
    }

    return ({ loading, song, handleGetSong })
}
