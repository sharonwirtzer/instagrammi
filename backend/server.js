const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')

const app = express()
const http = require('http').createServer(app)

const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})


// Express App Config
/* app.use(express.static('public')); */
/* app.use(express.json({ limit: '100mb' })) */
app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


const {connectSockets} = require('./services/socket.service')


// routes
/* const postRouter = require('./api/posts/post.routes') */

//routes config


const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

// TODO: check with app.use
app.use('/api/posts', require('./api/posts/post.routes'))
app.use('/api/users', require('./api/users/user.routes'))
connectSockets(http, session)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.send("<h1>unknown endpoint</h1>")
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})

console.log('I am Here!, am I?')



