const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const routes = require("./routes/routes");

const app = express();
app.use(routes);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
    console.log("new client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("client disconnected");
        clearInterval(interval);
    });
});
  
const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI", response);

    console.log('put room names and player names here');
};

server.listen(port, () => console.log(`Listening on port ${port}`));