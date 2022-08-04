require("dotenv").config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()
app.use(cors())
app.use(bodyParser.json())


const credentials = {
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}

app.post('/login', (req, res) => {

    const code = req.body.code
    const spotifyWebApi = new SpotifyWebApi(credentials)

    spotifyWebApi.authorizationCodeGrant(code)
    .then((data) => {
        res.json({
            accessToken : data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch(() => {
        res.sendStatus(400)
    })
})

app.post('/refresh', (req, res) => {

    const refreshToken = req.body.refreshToken
    console.log(refreshToken)
    let refreshCredentials = credentials
    refreshCredentials = {...refreshCredentials, refreshToken, }
    const spotifyWebApi = new SpotifyWebApi(refreshCredentials)

    spotifyWebApi.refreshAccessToken()
    .then(data => {
      //console.log(data.body)
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })

})



app.listen(5000)
console.log("Local Server Operating...")
