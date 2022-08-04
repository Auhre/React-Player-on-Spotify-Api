import useAuth from "./useAuth"
import { Container, Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-node"
import SongTrackSearchResult from "./SongTrackSearchResult"
import SongPlayer from "./SongPlayer"

const spotifyWebApi = new SpotifyWebApi({
    clientId: '4eaf0ae4563e4c0381427de56680d964'  // go to https://developer.spotify.com/dashboard/applications to get your clientID
})

function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [playTrack, setPlayTrack] = useState()
    const style = {
        search: {
            minHeight: '100vh'
        },
        page: {
            height: '100vh',
        },
        icon: {
            height: '4rem',
            width: '4rem',
            marginLeft: '4px'
        },
        songs: {
            overflowY: 'auto',
            paddingTop: '4px'
        },
        logo: {
            userSelect: "none"
        }
    }

    function chooseTrack(track) {
        setPlayTrack(track)
        setSearch('')
    }
    
    useEffect(() => {
        if (!accessToken) return
        spotifyWebApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) 
            return setSearchResult([])
        if (!accessToken) 
            return
        let cancel = false
        spotifyWebApi.searchTracks(search).then(res => {
            if (cancel) 
                return
            setSearchResult(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) =>{
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUri: smallestAlbumImage
                }
            }))
        })
        return () => cancel = true
    }, [search, accessToken])
   

    return(
        <Container className="d-flex flex-column py-2" style={style.page}>    
            <div className="d-flex flex-row align-items-center justify-content-center" style={style.logo}>
                <h2 draggable="false">Spotify Clone</h2>
                <img 
                    src="https://i.pinimg.com/564x/d8/8b/9b/d88b9bd55850bceb880e03c72527a239.jpg" 
                    alt="spotify"
                    style={style.icon}
                    draggable="false"
                />
            </div>
            <Form.Control 
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
            />
            <div className="flex-grow-1 my-2" style={style.songs}>
                {searchResult.map(track => {
                    return <SongTrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
                })}
            </div>
            <div>
                <SongPlayer accessToken={accessToken} trackUri={playTrack?.uri}/>
            </div>
        </Container>
    )
}

export default Dashboard