const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const isGamePaused = require('./startGame.json')
const fs = require('fs')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    if (username === 'admin' && password === 'admin') {
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
})

app.get('/api/spin', (req, res) => {
    const result = generateSpinResult();
    res.json(result);
})

function generateSpinResult() {
    const stopPosition = [200000, 400000, 800000];
    const result = stopPosition[Math.floor(Math.random() * stopPosition.length)];
    // result = Math.floor(Math.random() * 1000000);
    // result = 800000;
    // result = 100000;
    return result;
}


app.get('/api/statusgame', (req, res) => {
    //when request come in write to json file isGameRunning = true
    // read json file if isGameRunning = true write isGameRunning = false
    // return isGameRunning

    const isGamePaused = require('./startGame.json')
    console.log(isGamePaused)
    res.json(isGamePaused)

})

app.get('/api/startgame', (req, res) => {
    const isGamePaused = require('./startGame.json')
    console.log(isGamePaused)
    isGamePaused.isGamePaused = false
    fs.writeFile('./startGame.json', JSON.stringify(isGamePaused), (err) => {
        if (err) {
            console.log(err)
        }
    })
    res.json(isGamePaused)
})

app.get('/api/pausegame', (req, res) => {
    const isGamePaused = require('./startGame.json')
    console.log(isGamePaused)
    isGamePaused.isGamePaused = true
    fs.writeFile('./startGame.json', JSON.stringify(isGamePaused), (err) => {
        if (err) {
            console.log(err)
        }
    })
    res.json(isGamePaused)
}
)

app.get('/api/calendar', (req, res) => {

    const calendar = require('./calendar.json')
    console.log(calendar)
    res.json(calendar)
})



app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    if (username === 'admin' && password === 'admin') {
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
}
)

app.listen(port, () => {
    console.log(`server is listening at ${port}`)
}
)


