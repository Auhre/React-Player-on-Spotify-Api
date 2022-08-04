import { Container } from 'react-bootstrap'

var AUTH_URL = 'https://accounts.spotify.com/authorize'
AUTH_URL += '?client_id=4eaf0ae4563e4c0381427de56680d964'
AUTH_URL += '&response_type=code'
AUTH_URL += '&redirect_uri=http://localhost:3000/callback/'
AUTH_URL += '&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'


function Login () {
   const style = {
    dimension: {
        minHeight: '100vh',
        minWidth: '100%'
    }
   }
    return (
        <Container className='bg-dark justify-content-center align-items-center d-flex' style={style.dimension}>
            <a className='btn btn-success btn-md' href={AUTH_URL} > Log In with Spotify </a>
        </Container>
    )
}
export default Login