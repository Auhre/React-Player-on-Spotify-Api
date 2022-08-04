import SpotifyPlayer from 'react-spotify-web-playback'
import { useEffect, useState } from 'react'
function SongPlayer({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (!accessToken)
        return
    return <SpotifyPlayer 
            token={accessToken}
            play={play}
            callback={state=> {
                if (!state.isPlaying) 
                    setPlay(false)
            }}
            uri={trackUri ? [trackUri] : []}
            showSaveIcon/>
}

export default SongPlayer