const express = require("express");
const app = express();
const socket = require("socket.io");
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, function () {
  console.log("listening to requests on port 4000.");
});

// static files

app.use(express.static("public"));

// sockets setup

const io = socket(server);

let user = 1;

io.on("connection", function (socket) {
  socket.on("nickname", (data) => {
    socket.id = data.nick;
  });
  console.log("made a socket connection", socket.id);

  socket.on("chat", function (data) {
    io.sockets.emit("chat", { data: data, nick: socket.id });
  });
  //   socket.on("typing", function (data) {
  //     socket.broadcast.emit("typing", data);
  //   });
});
