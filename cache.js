import express from 'express';

const app = express()
const port = 3000
var cache = {}
var midWare = (req, res, next) => {
    const key = req.url
    if (cache[key]) {
        res.send('from cache')
    } else {
        res.sendResponse = res.send
        res.send = (body) => {
            cache[key] = body
            res.sendResponse(body)
        }
        next()
    }
}
app.get('/', midWare, (req, res) => {
    res.send('message from route /')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
