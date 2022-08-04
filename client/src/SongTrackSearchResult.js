function SongTrackSearchResult({ track, chooseTrack }) {
    const style = {
        songClick: {
            cursor: "pointer"
        },
        songImages: {
            height: "64px",
            width: "64px"
        },
        songInformations: {
            marginLeft: "10px"
        }
    }
    
    function handlePlay() {
        chooseTrack(track)
    }
    return(
        <div className="d-flex align-items-center" style={style.songClick} onClick={handlePlay}>
            <img src={track.albumUri.url} alt="track" style={style.songImages} draggable="false"/>
            <div style={style.songInformations}>
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    )
}

export default SongTrackSearchResult