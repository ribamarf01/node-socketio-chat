const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
    console.log('Usuário Conectado')
    socket.on('disconnect', () => {
        console.log('Usuário desconectado')
    })
    socket.on('chat message', msg => {
        console.log(msg)
        io.emit('chat message', msg)
    })
})

http.listen(8000, () => {
    console.log(`Hospedado na porta 8000`)
})